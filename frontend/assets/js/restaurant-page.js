/* ==========================================================================
   FOOD VERSE — Shared Restaurant Sub-Page Controller
   Huxley-Style Split Showcase + Bottom Filmstrip + Categorized Menu
   ========================================================================== */

(function (global) {
  'use strict';

  function initRestaurantPage(restaurantId) {
    const FV = global.FoodVerse;
    const FV3D = global.FoodVerse3D;
    const rest = FV.RESTAURANTS[restaurantId];
    if (!rest) return;

    FV.renderSharedChrome(restaurantId);

    const restItems = FV.MENU_ITEMS.filter(function (i) { return i.restaurantId === restaurantId; });
    const categories = [];
    restItems.forEach(function (item) {
      if (!categories.includes(item.category)) categories.push(item.category);
    });

    // 1. Huxley-Style Split Food Selector + Bottom Filmstrip
    const showcaseMount = document.getElementById('resto-huxley-showcase');
    if (showcaseMount && restItems.length > 0) {
      showcaseMount.innerHTML = `
        <div class="huxley-showcase gs-vitrine">
          <div class="huxley-stage">
            <div class="huxley-visual" id="hx-visual-stage">
              <span class="huxley-visual__index" id="hx-item-index">01 / ${restItems.length}</span>
            </div>
            <div class="huxley-info">
              <div class="huxley-info__main">
                <div class="huxley-info__top">
                  <span class="eyebrow eyebrow--accent" id="hx-category-label"></span>
                  <span id="hx-dietary-slot"></span>
                </div>
                <h2 class="huxley-info__title" id="hx-dish-title"></h2>
                <p class="huxley-info__gist" id="hx-dish-gist"></p>
                <div class="variant-pills" id="hx-variant-pills"></div>
              </div>
              <div class="huxley-info__cells">
                <div class="huxley-cell">
                  <span class="huxley-cell__label">Price</span>
                  <span class="huxley-cell__value" id="hx-dish-price"></span>
                  <span class="huxley-cell__sub" id="hx-dish-prep"></span>
                </div>
                <div class="huxley-cell">
                  <span class="huxley-cell__label">Campus Tray</span>
                  <div>
                    <button type="button" class="add-btn" id="hx-add-btn" data-add-id="">
                      <span>Add to Tray</span><span>+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="huxley-strip-wrap">
            <div class="huxley-cat-bar" id="hx-cat-bar">
              <button type="button" class="huxley-cat-btn is-active" data-hx-cat="all">All (${restItems.length})</button>
              ${categories.map(function (c) {
                return '<button type="button" class="huxley-cat-btn" data-hx-cat="' + c.replace(/"/g, '&quot;') + '">' + c + '</button>';
              }).join('')}
            </div>
            <div class="huxley-filmstrip-row">
              <button type="button" class="huxley-scroll-btn" id="hx-scroll-left" aria-label="Scroll options left">&larr;</button>
              <div class="huxley-filmstrip" id="hx-filmstrip"></div>
              <button type="button" class="huxley-scroll-btn" id="hx-scroll-right" aria-label="Scroll options right">&rarr;</button>
            </div>
          </div>
        </div>
      `;

      const visualStage = document.getElementById('hx-visual-stage');
      const indexLabel = document.getElementById('hx-item-index');
      const catLabel = document.getElementById('hx-category-label');
      const dietSlot = document.getElementById('hx-dietary-slot');
      const titleEl = document.getElementById('hx-dish-title');
      const gistEl = document.getElementById('hx-dish-gist');
      const variantMount = document.getElementById('hx-variant-pills');
      const priceEl = document.getElementById('hx-dish-price');
      const prepEl = document.getElementById('hx-dish-prep');
      const addBtn = document.getElementById('hx-add-btn');
      const filmstrip = document.getElementById('hx-filmstrip');

      const asciiStage = FV3D.createStage(visualStage, restItems[0].name + ' ' + restItems[0].category, { compact: false });
      let activeCategory = 'all';
      let selectedItem = restItems[0];
      let selectedVariantIdx = 0;

      function getDietaryBadge(diet) {
        if (diet === 'nonveg') {
          return '<span class="nonveg-mark" title="Non-Vegetarian / Egg"></span>';
        }
        return '<span class="veg-mark" title="Vegetarian"></span>';
      }

      function renderSelectedDish(item, vIdx, animateText) {
        selectedItem = item;
        selectedVariantIdx = Number(vIdx) || 0;
        const posInAll = restItems.findIndex(function (x) { return x.id === item.id; }) + 1;
        const idxStr = posInAll < 10 ? '0' + posInAll : String(posInAll);
        indexLabel.textContent = idxStr + ' / ' + restItems.length;

        const hasVariants = Array.isArray(item.variants) && item.variants.length > 0;
        const activeVariant = hasVariants ? item.variants[Math.min(selectedVariantIdx, item.variants.length - 1)] : null;
        const price = activeVariant ? activeVariant.price : item.price;
        const diet = (activeVariant && activeVariant.dietary) || item.dietary || 'veg';

        catLabel.textContent = item.category;
        dietSlot.innerHTML = getDietaryBadge(diet);
        titleEl.textContent = item.name;
        gistEl.textContent = item.description;
        priceEl.textContent = '₹' + price;
        prepEl.textContent = 'Prep: ' + item.prepTime;

        if (hasVariants) {
          variantMount.style.display = 'flex';
          variantMount.innerHTML = item.variants.map(function (v, i) {
            return '<button type="button" class="variant-pill ' + (i === selectedVariantIdx ? 'is-active' : '') + '" data-hx-var="' + i + '">' +
              v.label + ' &middot; ₹' + v.price + '</button>';
          }).join('');
          variantMount.querySelectorAll('[data-hx-var]').forEach(function (vp) {
            vp.addEventListener('click', function () {
              renderSelectedDish(selectedItem, Number(vp.getAttribute('data-hx-var')), false);
            });
          });
        } else {
          variantMount.style.display = 'none';
          variantMount.innerHTML = '';
        }

        addBtn.setAttribute('data-add-id', item.id);
        addBtn.setAttribute('data-variant-idx', String(selectedVariantIdx));
        addBtn.dataset.bound = '';
        FV.bindAddButtons(addBtn.parentElement);
        FV.updateCartUI();

        if (animateText && asciiStage) {
          asciiStage.loadModel(item.name + ' ' + item.category);
          if (typeof global.gsap !== 'undefined') {
            global.gsap.fromTo(
              [titleEl, gistEl, priceEl],
              { y: 10, opacity: 0.25 },
              { y: 0, opacity: 1, duration: 0.35, stagger: 0.04, ease: 'power2.out', clearProps: 'transform' }
            );
          }
        }
      }

      function renderFilmstrip() {
        const visible = activeCategory === 'all'
          ? restItems
          : restItems.filter(function (i) { return i.category === activeCategory; });

        filmstrip.innerHTML = visible.map(function (item) {
          const glyph = FV3D.getGlyph(item.name + ' ' + item.category);
          const isActive = selectedItem && selectedItem.id === item.id;
          return `
            <button type="button" class="huxley-tile ${isActive ? 'is-active' : ''}" data-hx-id="${item.id}" title="${item.name}">
              <div class="huxley-tile__glyph">${glyph}</div>
              <span class="huxley-tile__name">${item.name}</span>
            </button>
          `;
        }).join('');

        filmstrip.querySelectorAll('.huxley-tile').forEach(function (tile) {
          tile.addEventListener('click', function () {
            const id = tile.getAttribute('data-hx-id');
            const target = restItems.find(function (x) { return x.id === id; });
            if (!target) return;
            filmstrip.querySelectorAll('.huxley-tile').forEach(function (t) { t.classList.remove('is-active'); });
            tile.classList.add('is-active');
            tile.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            renderSelectedDish(target, 0, true);
          });
        });
      }

      document.querySelectorAll('#hx-cat-bar .huxley-cat-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('#hx-cat-bar .huxley-cat-btn').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          activeCategory = btn.getAttribute('data-hx-cat');
          const visible = activeCategory === 'all'
            ? restItems
            : restItems.filter(function (i) { return i.category === activeCategory; });
          if (visible.length > 0 && !visible.some(function (x) { return x.id === selectedItem.id; })) {
            renderSelectedDish(visible[0], 0, true);
          }
          renderFilmstrip();
        });
      });

      document.getElementById('hx-scroll-left').addEventListener('click', function () {
        filmstrip.scrollBy({ left: -340, behavior: 'smooth' });
      });
      document.getElementById('hx-scroll-right').addEventListener('click', function () {
        filmstrip.scrollBy({ left: 340, behavior: 'smooth' });
      });

      renderSelectedDish(restItems[0], 0, false);
      renderFilmstrip();
    }

    // 2. Categorized Menu Sections Below
    const menuMount = document.getElementById('resto-menu-sections');
    const catNavMount = document.getElementById('resto-category-pills');
    if (catNavMount) {
      catNavMount.innerHTML = categories.map(function (cat, idx) {
        return '<a href="#cat-' + idx + '" class="filter-pill">' + cat + '</a>';
      }).join('');
    }

    if (menuMount) {
      menuMount.innerHTML = categories.map(function (cat, idx) {
        const items = restItems.filter(function (i) { return i.category === cat; });
        const countLabel = items.length < 10 ? '0' + items.length : String(items.length);
        return `
          <section class="menu-section-block" id="cat-${idx}">
            <div class="container">
              <div class="menu-category-head gs-reveal">
                <h2 class="menu-category-head__title">${cat}</h2>
                <span class="menu-category-head__count">${countLabel} Creations</span>
              </div>
              <div class="restaurant-menu-grid">
                ${items.map(function (item) { return FV.createDishCardHtml(item, false); }).join('')}
              </div>
            </div>
          </section>
        `;
      }).join('');

      FV.bindAddButtons(menuMount);
    }

    // 3. Cross-Navigation House Switcher
    const switcherMount = document.getElementById('resto-house-switcher');
    if (switcherMount) {
      const prefix = FV.getRootPrefix();
      switcherMount.innerHTML = Object.keys(FV.RESTAURANTS).map(function (key) {
        const r = FV.RESTAURANTS[key];
        const isCurrent = key === restaurantId;
        return `
          <a href="${prefix}${r.pagePath}" class="switcher-card ${isCurrent ? 'is-current' : ''}">
            <span class="eyebrow ${isCurrent ? 'eyebrow--accent' : ''}">${r.index} &middot; ${isCurrent ? 'Currently Viewing' : 'Visit House'}</span>
            <h3 class="serif-title" style="font-size:1.75rem;">${r.name}</h3>
            <p style="font-size:0.84rem; color:var(--ink-muted);">${r.tagline}</p>
          </a>
        `;
      }).join('');
    }

    FV.initScrollAnimations();
  }

  global.FoodVerseRestaurantPage = {
    init: initRestaurantPage
  };
})(window);
