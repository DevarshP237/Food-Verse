/**
 * Food Verse — Zero-Dependency Static & Order Persistence Server
 * Serves the Frontend Portal (/frontend) and Backend Kitchen Dispatch (/backend),
 * and persists received kitchen orders in backend/data/orders.json.
 * Usage: node backend/server.js (optional PORT env variable, defaults to 3000)
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const BACKEND_DIR = __dirname;
const ROOT = path.resolve(BACKEND_DIR, '..');
const FRONTEND_DIR = path.join(ROOT, 'frontend');
const DATA_DIR = path.join(BACKEND_DIR, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const PORT = Number(process.env.PORT) || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

function ensureOrdersStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, '[]', 'utf8');
}

function readOrdersFile() {
  ensureOrdersStore();
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function writeOrdersFile(orders) {
  ensureOrdersStore();
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders.slice(0, 200), null, 2), 'utf8');
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(data));
}

function readJsonBody(req) {
  return new Promise(function (resolve, reject) {
    let body = '';
    req.on('data', function (chunk) {
      body += chunk;
      if (body.length > 512 * 1024) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', function () {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
  });
}

function isSafeChild(baseDir, candidate) {
  return candidate.startsWith(baseDir + path.sep) || candidate === baseDir;
}

function resolveStaticFile(relPath) {
  // Friendly aliases for root & backend routes
  if (!relPath || relPath === '/') {
    const feIndex = path.join(FRONTEND_DIR, 'index.html');
    return fs.existsSync(feIndex) ? feIndex : null;
  }

  const normalized = relPath.replace(/^\/+/, '');
  const roots = [ROOT, FRONTEND_DIR, BACKEND_DIR];
  for (let i = 0; i < roots.length; i++) {
    const base = roots[i];
    const candidate = path.resolve(base, normalized);
    if (!isSafeChild(base, candidate)) continue;
    if (fs.existsSync(candidate) && !fs.statSync(candidate).isDirectory()) {
      return candidate;
    }
  }
  return null;
}

const server = http.createServer(async function (req, res) {
  const rawUrl = (req.url || '/').split('?')[0];

  // REST API for received orders (matches /api/orders from any nested folder prefix)
  if ((rawUrl === '/api/orders' || rawUrl.endsWith('/api/orders')) && req.method === 'GET') {
    return sendJson(res, 200, { orders: readOrdersFile() });
  }

  if ((rawUrl === '/api/orders' || rawUrl.endsWith('/api/orders')) && req.method === 'POST') {
    try {
      const order = await readJsonBody(req);
      if (!order || !order.token) {
        return sendJson(res, 400, { error: 'Missing order token' });
      }
      const orders = readOrdersFile().filter(function (o) { return o.token !== order.token; });
      order.status = order.status || 'Pending';
      order.createdAt = order.createdAt || new Date().toISOString();
      orders.unshift(order);
      writeOrdersFile(orders);
      return sendJson(res, 201, { ok: true, order: order });
    } catch (e) {
      return sendJson(res, 400, { error: 'Invalid JSON payload' });
    }
  }

  if ((rawUrl === '/api/orders' || rawUrl.endsWith('/api/orders')) && req.method === 'DELETE') {
    writeOrdersFile([]);
    return sendJson(res, 200, { ok: true });
  }

  const patchMatch = rawUrl.match(/\/api\/orders\/([^/]+)$/);
  if (patchMatch && req.method === 'PATCH') {
    let token = '';
    try {
      token = decodeURIComponent(patchMatch[1]);
    } catch (e) {
      return sendJson(res, 400, { error: 'Invalid order token encoding' });
    }
    try {
      const patch = await readJsonBody(req);
      const orders = readOrdersFile();
      const target = orders.find(function (o) { return o.token === token; });
      if (!target) return sendJson(res, 404, { error: 'Order not found' });
      if (patch.status) {
        target.status = patch.status;
        target.statusUpdatedAt = new Date().toISOString();
      }
      writeOrdersFile(orders);
      return sendJson(res, 200, { ok: true, order: target });
    } catch (e) {
      return sendJson(res, 400, { error: 'Invalid JSON payload' });
    }
  }

  // Decode and serve static files safely
  let decodedPath = '/';
  try {
    decodedPath = decodeURIComponent(rawUrl);
  } catch (e) {
    res.writeHead(400);
    return res.end('Bad Request');
  }

  if (decodedPath === '/backend' || decodedPath === '/backend/' || decodedPath === '/orders.html') {
    res.writeHead(302, { Location: '/backend/orders.html' });
    return res.end();
  }
  if (decodedPath === '/frontend' || decodedPath === '/frontend/') {
    res.writeHead(302, { Location: '/frontend/index.html' });
    return res.end();
  }

  // Block path traversal outside workspace root
  const checkRaw = decodedPath.replace(/^\/+/, '');
  const rootCheck = path.resolve(ROOT, checkRaw);
  if (!isSafeChild(ROOT, rootCheck)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  const resolved = resolveStaticFile(decodedPath);
  if (!resolved) {
    res.writeHead(404);
    return res.end('Not Found');
  }

  const ext = path.extname(resolved).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
  fs.createReadStream(resolved).pipe(res);
});

server.listen(PORT, '127.0.0.1', function () {
  console.log('Food Verse portal & orders backend running at http://127.0.0.1:' + PORT);
  console.log('  Frontend Portal : http://127.0.0.1:' + PORT + '/frontend/index.html');
  console.log('  Kitchen Backend : http://127.0.0.1:' + PORT + '/backend/orders.html');
});
