/* ==========================================================================
   FOOD VERSE — Core Catalog, Cross-Page Ordering & GSAP Animations
   ========================================================================== */

(function (global) {
  'use strict';

  const CART_KEY = 'foodverse_cart_v1';
  const ORDERS_KEY = 'foodverse_orders_v1';
  const THEME_KEY = 'foodverse_theme_v1';

  function isDarkMode() {
    return document.documentElement.classList.contains('dark-mode');
  }

  function applyTheme(dark, notify) {
    document.documentElement.classList.toggle('dark-mode', Boolean(dark));
    try {
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
    } catch {}
    const btn = document.getElementById('fv-theme-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      btn.setAttribute('title', dark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      const label = btn.querySelector('.theme-toggle-btn__label');
      const icon = btn.querySelector('.theme-toggle-btn__icon');
      if (label) label.textContent = dark ? 'Light' : 'Dark';
      if (icon) {
        icon.innerHTML = dark
          ? '<circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="5"></line><line x1="12" y1="19" x2="12" y2="22"></line><line x1="4.9" y1="4.9" x2="7.1" y2="7.1"></line><line x1="16.9" y1="16.9" x2="19.1" y2="19.1"></line><line x1="2" y1="12" x2="5" y2="12"></line><line x1="19" y1="12" x2="22" y2="12"></line><line x1="4.9" y1="19.1" x2="7.1" y2="16.9"></line><line x1="16.9" y1="7.1" x2="19.1" y2="4.9"></line>'
          : '<path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"></path>';
      }
    }
    if (notify) {
      window.dispatchEvent(new CustomEvent('fv:themechange', { detail: { dark: Boolean(dark) } }));
      if (typeof global.ScrollTrigger !== 'undefined') {
        global.ScrollTrigger.refresh();
      }
    }
  }

  try {
    if (localStorage.getItem(THEME_KEY) === 'dark') {
      document.documentElement.classList.add('dark-mode');
    }
  } catch {}

  const RESTAURANTS = {
    'cafe-by-the-valley': {
      id: 'cafe-by-the-valley',
      index: '01',
      name: 'Cafe by the Valley',
      shortName: 'Valley Cafe',
      tagline: 'Breakfast, Sandwiches, Wok, Pizza, Wraps, Meals & Shakes',
      location: 'Central Block, Ground Floor, Near the CPCG Office · +91 88560 80488',
      hours: '08:00 AM — 10:30 PM',
      prepAvg: '12–18 min',
      theme: 'valley',
      pagePath: 'restaurants/cafe-by-the-valley.html',
      heroDesc:
        'From morning Benne Masala Dosa and grilled sandwiches to wok noodles, wood-style pizzas, and Oreo shakes—Cafe by the Valley is campus dining all day.',
      best3DModels: [
        {
          id: 'valley-club-sandwich',
          dishId: 'v-periperi-grilled',
          title: 'Peri Peri Grilled Sandwich',
          subtitle: 'Animated ASCII Art · Paneer ₹140 / Chicken ₹160',
          price: 140,
          prepTime: '14 min',
          description:
            'Crisp golden-grilled sandwich packed with smoky peri-peri spiced paneer or tender chicken, melted cheese, and garden crunch.',
          ingredients: ['Grilled Bread', 'Peri Peri Spice', 'Paneer / Chicken', 'Melted Cheese']
        },
        {
          id: 'valley-cold-brew',
          dishId: 'v-cold-coffee',
          title: 'Classic Cold Coffee',
          subtitle: 'Animated ASCII Art · Chilled Milkshake Favorite',
          price: 100,
          prepTime: '6 min',
          description:
            'Rich roasted espresso blended smooth with chilled milk, velvety foam, and subtle sweetness—a campus staple between classes.',
          ingredients: ['Roasted Coffee', 'Chilled Milk', 'Creamy Foam', 'Light Sweetness']
        }
      ]
    },
    'atmosphere-cafe': {
      id: 'atmosphere-cafe',
      index: '02',
      name: 'Atmosphere Cafe',
      shortName: 'Atmosphere',
      tagline: 'Stuffed Parathas, Morning Magic, Dum Biryani & Drink Dispatch',
      location: 'Management Block, First Floor, Next to SIB Bank Office · +91 7709252214',
      hours: '08:00 AM — 10:30 PM',
      prepAvg: '12–18 min',
      theme: 'atmosphere',
      pagePath: 'restaurants/atmosphere-cafe.html',
      heroDesc:
        'From Morning Magic (8–10 AM) and 40+ varieties of Aloo, Gobi, Paneer, Methi, Cheese & Special Parathas to Snack Stories, Dum Biryani, and ₹15 Kulhad Tea.',
      best3DModels: [
        {
          id: 'atmosphere-paratha-platter',
          dishId: 'a-aloo-cheese',
          title: 'Aloo Cheese Paratha',
          subtitle: 'Animated ASCII · Crispy Stuffed Paratha',
          price: 129,
          prepTime: '14 min',
          description:
            'Hand-rolled golden paratha stuffed with spiced potato mash and melted cheese. Add extra butter or curd for ₹10.',
          ingredients: ['Whole Wheat', 'Spiced Aloo', 'Melted Cheese', 'Extra Butter/Curd ₹10']
        },
        {
          id: 'atmosphere-kulhad-chai',
          dishId: 'a-kulhad-tea',
          title: 'Kulhad Tea',
          subtitle: 'Animated ASCII · Campus Favorite',
          price: 15,
          prepTime: '5 min',
          description:
            'Steaming spiced chai poured hot into a classic earthy terracotta kulhad from our Drink Dispatch counter.',
          ingredients: ['Assam Tea', 'Cardamom', 'Ginger', 'Clay Kulhad']
        }
      ]
    }
  };

  const MENU_ITEMS = [
    // ---- CAFE BY THE VALLEY (Full Official Menu) ----
    // 1. BREAKFAST
    {
      id: 'v-poha',
      restaurantId: 'cafe-by-the-valley',
      category: 'Breakfast',
      name: 'Poha',
      price: 50,
      dietary: 'veg',
      prepTime: '8 min',
      tags: ['Morning Classic'],
      description: 'Light flattened rice tempered with mustard seeds, curry leaves, turmeric, onion, and fresh lemon.'
    },
    {
      id: 'v-misal-pav',
      restaurantId: 'cafe-by-the-valley',
      category: 'Breakfast',
      name: 'Misal Pav',
      price: 60,
      dietary: 'veg',
      prepTime: '10 min',
      tags: ['Spicy'],
      description: 'Sprouted matki curry topped with farsan, chopped onion, coriander, and warm buttered pav.'
    },
    {
      id: 'v-dosa',
      restaurantId: 'cafe-by-the-valley',
      category: 'Breakfast',
      name: 'Dosa (Plain / Masala)',
      price: 70,
      dietary: 'veg',
      variants: [
        { label: 'Plain', price: 70, dietary: 'veg' },
        { label: 'Masala', price: 80, dietary: 'veg' }
      ],
      prepTime: '10 min',
      tags: ['South Indian'],
      description: 'Golden crisp fermented rice crepe served with coconut chutney and steaming sambar.'
    },
    {
      id: 'v-mysore-masala-dosa',
      restaurantId: 'cafe-by-the-valley',
      category: 'Breakfast',
      name: 'Mysore Masala Dosa',
      price: 90,
      dietary: 'veg',
      prepTime: '12 min',
      tags: ['Spicy'],
      description: 'Crisp dosa smeared with fiery red garlic-chili chutney and stuffed with spiced potato masala.'
    },
    {
      id: 'v-omelette-toast',
      restaurantId: 'cafe-by-the-valley',
      category: 'Breakfast',
      name: 'Omelette / Half Fry with Toast',
      price: 90,
      dietary: 'nonveg',
      variants: [
        { label: 'Omelette', price: 90, dietary: 'nonveg' },
        { label: 'Half Fry', price: 90, dietary: 'nonveg' }
      ],
      prepTime: '8 min',
      tags: ['Protein'],
      description: 'Fluffy farm eggs cooked to order and plated with warm golden-buttered toast.'
    },
    {
      id: 'v-onion-uttapam',
      restaurantId: 'cafe-by-the-valley',
      category: 'Breakfast',
      name: 'Onion Uttapam',
      price: 95,
      dietary: 'veg',
      prepTime: '12 min',
      tags: ['South Indian'],
      description: 'Thick, soft-centered savory pancake studded with caramelized sweet onions and green chilies.'
    },
    {
      id: 'v-masala-uttapam',
      restaurantId: 'cafe-by-the-valley',
      category: 'Breakfast',
      name: 'Masala Uttapam',
      price: 100,
      dietary: 'veg',
      prepTime: '12 min',
      tags: ['Hearty'],
      description: 'Savory uttapam topped with spiced potato masala, tomato, onion, and coriander.'
    },
    {
      id: 'v-cheese-chilly-uttapam',
      restaurantId: 'cafe-by-the-valley',
      category: 'Breakfast',
      name: 'Cheese Chilly Uttapam',
      price: 120,
      dietary: 'veg',
      prepTime: '12 min',
      tags: ['Cheesy'],
      description: 'Uttapam finished with melted mozzarella-cheddar blend, green chili, and roasted cumin.'
    },
    {
      id: 'v-benne-masala',
      restaurantId: 'cafe-by-the-valley',
      category: 'Breakfast',
      name: 'CBTV Benne Masala',
      price: 150,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['House Special'],
      description: 'Rich butter-roasted Davangere-style benne masala dosa with crisp golden edges and aromatic masala.'
    },

    // 2. SANDWICHES
    {
      id: 'v-veg-sandwich',
      restaurantId: 'cafe-by-the-valley',
      category: 'Sandwiches',
      name: 'Veg Sandwich',
      price: 70,
      dietary: 'veg',
      prepTime: '8 min',
      tags: ['Light'],
      description: 'Fresh cucumber, tomato, capsicum, and spiced potato layered with house green chutney.'
    },
    {
      id: 'v-cheese-chutney-grilled',
      restaurantId: 'cafe-by-the-valley',
      category: 'Sandwiches',
      name: 'Cheese Chutney Grilled',
      price: 100,
      dietary: 'veg',
      prepTime: '10 min',
      tags: ['Classic'],
      description: 'Zesty mint-coriander chutney paired with generous melted cheese and toasted golden.'
    },
    {
      id: 'v-veg-grilled-cheese',
      restaurantId: 'cafe-by-the-valley',
      category: 'Sandwiches',
      name: 'Vegetable Grilled Cheese',
      price: 110,
      dietary: 'veg',
      prepTime: '10 min',
      tags: ['Bestseller'],
      description: 'Crisp garden vegetables folded with melted cheese and toasted in buttered sandwich bread.'
    },
    {
      id: 'v-cheese-corn-capsicum',
      restaurantId: 'cafe-by-the-valley',
      category: 'Sandwiches',
      name: 'Cheese Corn Capsicum',
      price: 120,
      dietary: 'veg',
      prepTime: '11 min',
      tags: ['Creamy'],
      description: 'Sweet American corn, crunchy bell peppers, black pepper, and gooey cheese grilled crisp.'
    },
    {
      id: 'v-grilled-nutella',
      restaurantId: 'cafe-by-the-valley',
      category: 'Sandwiches',
      name: 'Grilled Nutella',
      price: 150,
      dietary: 'veg',
      prepTime: '9 min',
      tags: ['Sweet Treat'],
      description: 'Warm toasted bread oozing with rich hazelnut Nutella chocolate spread.'
    },
    {
      id: 'v-periperi-grilled',
      restaurantId: 'cafe-by-the-valley',
      category: 'Sandwiches',
      name: 'Peri Peri Grilled (Paneer / Chicken)',
      price: 140,
      dietary: 'veg',
      variants: [
        { label: 'Paneer', price: 140, dietary: 'veg' },
        { label: 'Chicken', price: 160, dietary: 'nonveg' }
      ],
      prepTime: '14 min',
      tags: ['House Special', 'Spicy'],
      description: 'Smoky peri-peri marinated paneer or tender chicken grilled with cheese and crisp veggies.'
    },
    {
      id: 'v-pesto-grilled',
      restaurantId: 'cafe-by-the-valley',
      category: 'Sandwiches',
      name: 'Pesto Grilled (Paneer / Chicken)',
      price: 150,
      dietary: 'veg',
      variants: [
        { label: 'Paneer', price: 150, dietary: 'veg' },
        { label: 'Chicken', price: 170, dietary: 'nonveg' }
      ],
      prepTime: '14 min',
      tags: ['Chef Special'],
      description: 'Fragrant basil pesto layered with grilled paneer or chicken and melted cheese.'
    },

    // 3. FRIES & BURGERS
    {
      id: 'v-fries-salted',
      restaurantId: 'cafe-by-the-valley',
      category: 'Fries & Burgers',
      name: 'Classic Salted Fries',
      price: 100,
      dietary: 'veg',
      prepTime: '8 min',
      tags: ['Crispy'],
      description: 'Golden crisp french fries lightly tossed in fine sea salt.'
    },
    {
      id: 'v-fries-periperi-cheesy',
      restaurantId: 'cafe-by-the-valley',
      category: 'Fries & Burgers',
      name: 'Peri Peri / Cheesy Fries',
      price: 140,
      dietary: 'veg',
      variants: [
        { label: 'Peri Peri', price: 140, dietary: 'veg' },
        { label: 'Cheesy', price: 140, dietary: 'veg' }
      ],
      prepTime: '10 min',
      tags: ['Bestseller'],
      description: 'Crispy fries tossed in zesty peri-peri dust or drizzled generously with warm cheese sauce.'
    },
    {
      id: 'v-potato-wedges',
      restaurantId: 'cafe-by-the-valley',
      category: 'Fries & Burgers',
      name: 'Potato Wedges',
      price: 150,
      dietary: 'veg',
      prepTime: '10 min',
      tags: ['Shareable'],
      description: 'Thick-cut seasoned skin-on potato wedges fried golden with house herbs.'
    },
    {
      id: 'v-burger',
      restaurantId: 'cafe-by-the-valley',
      category: 'Fries & Burgers',
      name: 'Burger (Veg / Chicken)',
      price: 140,
      dietary: 'veg',
      variants: [
        { label: 'Veg', price: 140, dietary: 'veg' },
        { label: 'Chicken', price: 160, dietary: 'nonveg' }
      ],
      prepTime: '12 min',
      tags: ['Campus Favorite'],
      description: 'Toasted sesame bun stacked with crispy herb patty or juicy chicken fillet, lettuce, and tangy sauce.'
    },

    // 4. BITES
    {
      id: 'v-bun-maska',
      restaurantId: 'cafe-by-the-valley',
      category: 'Bites',
      name: 'Bun Maska',
      price: 50,
      dietary: 'veg',
      prepTime: '5 min',
      tags: ['Chai Partner'],
      description: 'Pillowy warm sweet bun slathered generously with whipped butter.'
    },
    {
      id: 'v-cheese-chakli-pav',
      restaurantId: 'cafe-by-the-valley',
      category: 'Bites',
      name: 'Cheese Chakli Pav',
      price: 70,
      dietary: 'veg',
      prepTime: '7 min',
      tags: ['Crunchy'],
      description: 'Buttered ladi pav packed with crunchy spiced chakli, tangy chutney, and grated cheese.'
    },
    {
      id: 'v-maggi',
      restaurantId: 'cafe-by-the-valley',
      category: 'Bites',
      name: 'Maggi (Plain / Cheese)',
      price: 70,
      dietary: 'veg',
      variants: [
        { label: 'Plain', price: 70, dietary: 'veg' },
        { label: 'Cheese', price: 90, dietary: 'veg' }
      ],
      prepTime: '8 min',
      tags: ['Hostel Classic'],
      description: 'Steaming masala Maggi noodles cooked to perfection, plain or loaded with melted cheese.'
    },
    {
      id: 'v-nachos-salsa',
      restaurantId: 'cafe-by-the-valley',
      category: 'Bites',
      name: 'Nachos with Salsa & Cheese',
      price: 170,
      dietary: 'veg',
      prepTime: '9 min',
      tags: ['Shareable'],
      description: 'Crisp corn tortilla chips served with chunky tomato salsa and velvety warm cheese dip.'
    },
    {
      id: 'v-periperi-paneer-salad',
      restaurantId: 'cafe-by-the-valley',
      category: 'Bites',
      name: 'Grilled Peri Peri Paneer Salad',
      price: 180,
      dietary: 'veg',
      prepTime: '12 min',
      tags: ['High Protein'],
      description: 'Char-grilled peri-peri paneer cubes tossed over crisp greens, peppers, and house dressing.'
    },
    {
      id: 'v-bbq-chicken-salad',
      restaurantId: 'cafe-by-the-valley',
      category: 'Bites',
      name: 'Grilled Barbeque Chicken Salad',
      price: 200,
      dietary: 'nonveg',
      prepTime: '12 min',
      tags: ['High Protein'],
      description: 'Smoky BBQ-glazed grilled chicken strips over fresh crunchy salad greens and tangy dressing.'
    },
    {
      id: 'v-crispy-chicken',
      restaurantId: 'cafe-by-the-valley',
      category: 'Bites',
      name: 'CBTV Crispy Chicken',
      price: 210,
      dietary: 'nonveg',
      prepTime: '14 min',
      tags: ['House Special'],
      description: 'Crunchy golden-fried spiced chicken tenders served hot with signature dipping sauce.'
    },

    // 5. WRAPS
    {
      id: 'v-veg-frankie',
      restaurantId: 'cafe-by-the-valley',
      category: 'Wraps',
      name: 'Veg Frankie',
      price: 120,
      dietary: 'veg',
      prepTime: '10 min',
      tags: ['Street Style'],
      description: 'Soft flatbread rolled with spiced potato filling, tangy frankie masala, and pickled onions.'
    },
    {
      id: 'v-double-egg-cheese-wrap',
      restaurantId: 'cafe-by-the-valley',
      category: 'Wraps',
      name: 'Double Egg Cheese Wrap',
      price: 140,
      dietary: 'nonveg',
      prepTime: '10 min',
      tags: ['Protein'],
      description: 'Twin-egg omelette folded inside a warm wrap with melted cheese and spiced onions.'
    },
    {
      id: 'v-paneer-kathi-wrap',
      restaurantId: 'cafe-by-the-valley',
      category: 'Wraps',
      name: 'Paneer Kathi / Crispy Paneer Wrap',
      price: 160,
      dietary: 'veg',
      variants: [
        { label: 'Paneer Kathi', price: 160, dietary: 'veg' },
        { label: 'Crispy Paneer', price: 160, dietary: 'veg' }
      ],
      prepTime: '12 min',
      tags: ['Filling'],
      description: 'Char-spiced paneer kathi or crispy fried paneer strips wrapped with mint mayo and crunch.'
    },
    {
      id: 'v-chicken-kathi-wrap',
      restaurantId: 'cafe-by-the-valley',
      category: 'Wraps',
      name: 'Chicken Kathi / Crispy Chicken Wrap',
      price: 170,
      dietary: 'nonveg',
      variants: [
        { label: 'Chicken Kathi', price: 170, dietary: 'nonveg' },
        { label: 'Crispy Chicken', price: 170, dietary: 'nonveg' }
      ],
      prepTime: '13 min',
      tags: ['Bestseller'],
      description: 'Juicy spiced chicken tikka or crispy tenders rolled with onions and house sauces.'
    },

    // 6. PASTA (PENNE/SPAGHETTI)
    {
      id: 'v-pasta-aglio-olio',
      restaurantId: 'cafe-by-the-valley',
      category: 'Pasta (Penne / Spaghetti)',
      name: 'Aglio Olio',
      price: 200,
      dietary: 'veg',
      variants: [
        { label: 'Penne', price: 200, dietary: 'veg' },
        { label: 'Spaghetti', price: 200, dietary: 'veg' }
      ],
      prepTime: '15 min',
      tags: ['Classic Italian'],
      description: 'Tossed in extra-virgin olive oil with golden roasted garlic, chili flakes, and fresh herbs.'
    },
    {
      id: 'v-pasta-alfredo-arrabiata',
      restaurantId: 'cafe-by-the-valley',
      category: 'Pasta (Penne / Spaghetti)',
      name: 'Alfredo / Arrabiata (Veg / Chicken)',
      price: 220,
      dietary: 'veg',
      variants: [
        { label: 'Alfredo Veg', price: 220, dietary: 'veg' },
        { label: 'Arrabiata Veg', price: 220, dietary: 'veg' },
        { label: 'Alfredo Chicken', price: 240, dietary: 'nonveg' },
        { label: 'Arrabiata Chicken', price: 240, dietary: 'nonveg' }
      ],
      prepTime: '16 min',
      tags: ['Creamy / Tangy'],
      description: 'Choice of rich creamy parmesan Alfredo or spiced tomato Arrabiata with garlic bread.'
    },
    {
      id: 'v-pasta-pesto-primavera',
      restaurantId: 'cafe-by-the-valley',
      category: 'Pasta (Penne / Spaghetti)',
      name: 'Pesto / Primavera (Veg / Chicken)',
      price: 230,
      dietary: 'veg',
      variants: [
        { label: 'Pesto Veg', price: 230, dietary: 'veg' },
        { label: 'Primavera Veg', price: 230, dietary: 'veg' },
        { label: 'Pesto Chicken', price: 250, dietary: 'nonveg' },
        { label: 'Primavera Chicken', price: 250, dietary: 'nonveg' }
      ],
      prepTime: '16 min',
      tags: ['Chef Special'],
      description: 'Aromatic basil pesto or garden-fresh primavera sauce tossed with penne or spaghetti.'
    },

    // 7. PIZZA BY THE VALLEY
    {
      id: 'v-pizza-margherita',
      restaurantId: 'cafe-by-the-valley',
      category: 'Pizza by the Valley',
      name: 'Margherita Pizza',
      price: 240,
      dietary: 'veg',
      prepTime: '16 min',
      tags: ['Classic'],
      description: 'San Marzano-style tomato base, fresh mozzarella cheese, and sweet basil leaves.'
    },
    {
      id: 'v-pizza-farmhouse',
      restaurantId: 'cafe-by-the-valley',
      category: 'Pizza by the Valley',
      name: 'Farmhouse Special Pizza',
      price: 280,
      dietary: 'veg',
      prepTime: '18 min',
      tags: ['Loaded Veg'],
      description: 'Crisp bell peppers, sweet corn, onions, mushrooms, and olives over bubbling mozzarella.'
    },
    {
      id: 'v-pizza-periperi-paneer',
      restaurantId: 'cafe-by-the-valley',
      category: 'Pizza by the Valley',
      name: 'Peri Peri Paneer Pizza',
      price: 295,
      dietary: 'veg',
      prepTime: '18 min',
      tags: ['Spicy'],
      description: 'Fiery peri-peri spiced paneer cubes, red paprika, onions, and molten cheese.'
    },
    {
      id: 'v-pizza-bbq-chicken',
      restaurantId: 'cafe-by-the-valley',
      category: 'Pizza by the Valley',
      name: 'BBQ Chicken Pizza',
      price: 330,
      dietary: 'nonveg',
      prepTime: '18 min',
      tags: ['Smoky'],
      description: 'Hickory BBQ glazed chicken chunks, caramelized onions, and golden mozzarella crust.'
    },
    {
      id: 'v-pizza-periperi-chicken',
      restaurantId: 'cafe-by-the-valley',
      category: 'Pizza by the Valley',
      name: 'Peri Peri Chicken Pizza',
      price: 330,
      dietary: 'nonveg',
      prepTime: '18 min',
      tags: ['Spicy'],
      description: 'Zesty peri-peri roast chicken, jalapenos, bell peppers, and melted mozzarella.'
    },

    // 8. MEALS
    {
      id: 'v-mini-combo',
      restaurantId: 'cafe-by-the-valley',
      category: 'Meals',
      name: 'Mini Combo (Veg / Chicken)',
      price: 80,
      dietary: 'veg',
      variants: [
        { label: 'Veg', price: 80, dietary: 'veg' },
        { label: 'Chicken', price: 95, dietary: 'nonveg' }
      ],
      prepTime: '12 min',
      tags: ['Value Meal'],
      description: 'Quick campus meal portion with curry/gravy and rice or rotis.'
    },
    {
      id: 'v-rajma-chole-chawal',
      restaurantId: 'cafe-by-the-valley',
      category: 'Meals',
      name: 'Rajma / Chole Chawal',
      price: 120,
      dietary: 'veg',
      variants: [
        { label: 'Rajma Chawal', price: 120, dietary: 'veg' },
        { label: 'Chole Chawal', price: 120, dietary: 'veg' }
      ],
      prepTime: '12 min',
      tags: ['Comfort Bowl'],
      description: 'Homestyle spiced rajma or Punjabi chole served generously over steamed basmati rice.'
    },
    {
      id: 'v-curd-rice',
      restaurantId: 'cafe-by-the-valley',
      category: 'Meals',
      name: 'Curd Rice',
      price: 150,
      dietary: 'veg',
      prepTime: '10 min',
      tags: ['Cooling'],
      description: 'Creamy tempered South Indian yogurt rice with mustard seeds, curry leaves, and pomegranate.'
    },
    {
      id: 'v-special-combo',
      restaurantId: 'cafe-by-the-valley',
      category: 'Meals',
      name: 'Special Combo (Veg / Non-Veg)',
      price: 140,
      dietary: 'veg',
      variants: [
        { label: 'Veg', price: 140, dietary: 'veg' },
        { label: 'Non-Veg', price: 160, dietary: 'nonveg' }
      ],
      prepTime: '14 min',
      tags: ['Complete Meal'],
      description: 'Signature chef combo platter balanced with main curry, sides, and accompaniments.'
    },
    {
      id: 'v-dal-khichdi',
      restaurantId: 'cafe-by-the-valley',
      category: 'Meals',
      name: 'Dal Khichdi',
      price: 170,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Wholesome'],
      description: 'Comforting slow-cooked yellow moong dal & rice tempered with ghee, cumin, and garlic.'
    },
    {
      id: 'v-paneer-makhni-combo',
      restaurantId: 'cafe-by-the-valley',
      category: 'Meals',
      name: 'Paneer Makhni Combo',
      price: 180,
      dietary: 'veg',
      prepTime: '15 min',
      tags: ['Rich Gravy'],
      description: 'Velvety tomato-butter paneer makhni served with rice or warm flatbreads.'
    },
    {
      id: 'v-chicken-makhni-combo',
      restaurantId: 'cafe-by-the-valley',
      category: 'Meals',
      name: 'Chicken Makhni Combo',
      price: 200,
      dietary: 'nonveg',
      prepTime: '16 min',
      tags: ['Bestseller'],
      description: 'Classic butter chicken simmered in rich creamy makhni gravy with rice or rotis.'
    },
    {
      id: 'v-burrito-bowl',
      restaurantId: 'cafe-by-the-valley',
      category: 'Meals',
      name: 'Burrito Bowl (Paneer / Chicken)',
      price: 210,
      dietary: 'veg',
      variants: [
        { label: 'Paneer', price: 210, dietary: 'veg' },
        { label: 'Chicken', price: 230, dietary: 'nonveg' }
      ],
      prepTime: '15 min',
      tags: ['Loaded Bowl'],
      description: 'Herb cilantro rice, spiced beans, salsa, corn, cheese, and grilled paneer or chicken.'
    },
    {
      id: 'v-biryani',
      restaurantId: 'cafe-by-the-valley',
      category: 'Meals',
      name: 'Veg / Chicken Biryani',
      price: 215,
      dietary: 'veg',
      variants: [
        { label: 'Veg Biryani', price: 215, dietary: 'veg' },
        { label: 'Chicken Biryani', price: 230, dietary: 'nonveg' }
      ],
      prepTime: '16 min',
      tags: ['Aromatic'],
      description: 'Long-grain fragrant basmati layered with caramelized onions, mint, and raita.'
    },

    // 9. STREET FOOD
    {
      id: 'v-street-paratha',
      restaurantId: 'cafe-by-the-valley',
      category: 'Street Food',
      name: 'Paratha (Aloo / Aloo Cheese)',
      price: 95,
      dietary: 'veg',
      variants: [
        { label: 'Aloo', price: 95, dietary: 'veg' },
        { label: 'Aloo Cheese', price: 110, dietary: 'veg' }
      ],
      prepTime: '12 min',
      tags: ['Stuffed'],
      description: 'Hot tawa-seared stuffed paratha served with curd and pickle.'
    },
    {
      id: 'v-street-paneer-paratha',
      restaurantId: 'cafe-by-the-valley',
      category: 'Street Food',
      name: 'Paneer Paratha',
      price: 120,
      dietary: 'veg',
      prepTime: '13 min',
      tags: ['Protein'],
      description: 'Grated spiced paneer and herbs stuffed into crisp golden whole-wheat paratha.'
    },
    {
      id: 'v-anda-bhurjee-pav',
      restaurantId: 'cafe-by-the-valley',
      category: 'Street Food',
      name: 'Anda Bhurjee Pav',
      price: 120,
      dietary: 'nonveg',
      prepTime: '10 min',
      tags: ['Street Style'],
      description: 'Mumbai-style spiced scrambled eggs with onion & tomato, served with buttered pav.'
    },
    {
      id: 'v-pav-bhaji',
      restaurantId: 'cafe-by-the-valley',
      category: 'Street Food',
      name: 'Pav Bhaji',
      price: 130,
      dietary: 'veg',
      prepTime: '12 min',
      tags: ['Bestseller'],
      description: 'Slow-mashed spiced vegetable bhaji topped with melting butter and toasted pav.'
    },
    {
      id: 'v-chole-kulche',
      restaurantId: 'cafe-by-the-valley',
      category: 'Street Food',
      name: 'Chole Kulche',
      price: 130,
      dietary: 'veg',
      prepTime: '12 min',
      tags: ['Tangy'],
      description: 'Chatpata Punjabi chole paired with soft butter-toasted kulchas and pickled onions.'
    },
    {
      id: 'v-chole-bhature',
      restaurantId: 'cafe-by-the-valley',
      category: 'Street Food',
      name: 'Chole Bhature',
      price: 150,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Campus Favorite'],
      description: 'Fluffy golden puffed bhature served with rich spiced Amritsari chole.'
    },
    {
      id: 'v-keema-pav',
      restaurantId: 'cafe-by-the-valley',
      category: 'Street Food',
      name: 'Keema Pav',
      price: 180,
      dietary: 'nonveg',
      prepTime: '14 min',
      tags: ['Rich & Spiced'],
      description: 'Slow-cooked minced spiced keema served hot with soft buttered pav and lime.'
    },

    // 10. FROM THE WOK
    {
      id: 'v-fried-rice',
      restaurantId: 'cafe-by-the-valley',
      category: 'From the Wok',
      name: 'Fried Rice (Veg / Chicken)',
      price: 160,
      dietary: 'veg',
      variants: [
        { label: 'Veg', price: 160, dietary: 'veg' },
        { label: 'Chicken', price: 180, dietary: 'nonveg' }
      ],
      prepTime: '14 min',
      tags: ['Wok Tossed'],
      description: 'High-flame wok-tossed rice with crunchy veggies, soy, and spring onions.'
    },
    {
      id: 'v-hakka-noodles',
      restaurantId: 'cafe-by-the-valley',
      category: 'From the Wok',
      name: 'Burnt Garlic Hakka Noodles (Veg / Chicken)',
      price: 160,
      dietary: 'veg',
      variants: [
        { label: 'Veg', price: 160, dietary: 'veg' },
        { label: 'Chicken', price: 180, dietary: 'nonveg' }
      ],
      prepTime: '14 min',
      tags: ['Bestseller'],
      description: 'Smoky burnt-garlic hakka noodles tossed with crisp vegetables or shredded chicken.'
    },
    {
      id: 'v-honey-chilly-potato',
      restaurantId: 'cafe-by-the-valley',
      category: 'From the Wok',
      name: 'Honey Chilly Potato',
      price: 190,
      dietary: 'veg',
      prepTime: '12 min',
      tags: ['Sweet & Spicy'],
      description: 'Crisp potato fingers glazed in sticky sesame honey-chili sauce.'
    },
    {
      id: 'v-veg-manchurian',
      restaurantId: 'cafe-by-the-valley',
      category: 'From the Wok',
      name: 'Veg Manchurian',
      price: 195,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Indo-Chinese'],
      description: 'Crispy vegetable dumplings tossed in savory ginger-garlic soy glaze.'
    },
    {
      id: 'v-paneer-chilly-dry',
      restaurantId: 'cafe-by-the-valley',
      category: 'From the Wok',
      name: 'Paneer Chilly Dry',
      price: 215,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Spicy'],
      description: 'Wok-seared cottage cheese cubes tossed with bell peppers, green chili, and soy.'
    },
    {
      id: 'v-hot-chicken-wings',
      restaurantId: 'cafe-by-the-valley',
      category: 'From the Wok',
      name: 'Hot Chicken Wings',
      price: 220,
      dietary: 'nonveg',
      prepTime: '15 min',
      tags: ['Fiery'],
      description: 'Crisp wok-glazed wings coated in bold hot chili-garlic sauce.'
    },
    {
      id: 'v-chicken-chilly-dry',
      restaurantId: 'cafe-by-the-valley',
      category: 'From the Wok',
      name: 'Chicken Chilly Dry',
      price: 230,
      dietary: 'nonveg',
      prepTime: '15 min',
      tags: ['Indo-Chinese'],
      description: 'Crispy boneless chicken tossed with capsicum, onions, and smoky chili sauce.'
    },
    {
      id: 'v-korean-bbq-chicken',
      restaurantId: 'cafe-by-the-valley',
      category: 'From the Wok',
      name: 'Korean BBQ Chicken',
      price: 240,
      dietary: 'nonveg',
      prepTime: '16 min',
      tags: ['Chef Special'],
      description: 'Tender glazed chicken tossed in sweet-savory Korean gochujang BBQ sauce & sesame.'
    },
    {
      id: 'v-thai-curry-rice',
      restaurantId: 'cafe-by-the-valley',
      category: 'From the Wok',
      name: 'Thai Curry with Rice (Veg / Chicken)',
      price: 250,
      dietary: 'veg',
      variants: [
        { label: 'Veg', price: 250, dietary: 'veg' },
        { label: 'Chicken', price: 270, dietary: 'nonveg' }
      ],
      prepTime: '18 min',
      tags: ['Aromatic'],
      description: 'Fragrant coconut milk Thai curry simmered with lemongrass and basil, served with steamed rice.'
    },

    // 11. BEVERAGES
    {
      id: 'v-tea',
      restaurantId: 'cafe-by-the-valley',
      category: 'Beverages',
      name: 'Tea',
      price: 20,
      dietary: 'veg',
      prepTime: '4 min',
      tags: ['Hot'],
      description: 'Freshly brewed hot campus chai.'
    },
    {
      id: 'v-coffee',
      restaurantId: 'cafe-by-the-valley',
      category: 'Beverages',
      name: 'Coffee',
      price: 30,
      dietary: 'veg',
      prepTime: '4 min',
      tags: ['Hot'],
      description: 'Classic steaming hot milk coffee.'
    },
    {
      id: 'v-hot-chocolate',
      restaurantId: 'cafe-by-the-valley',
      category: 'Beverages',
      name: 'Hot Chocolate',
      price: 75,
      dietary: 'veg',
      prepTime: '6 min',
      tags: ['Cozy'],
      description: 'Velvety melted cocoa whisked into steamed milk.'
    },
    {
      id: 'v-iced-tea',
      restaurantId: 'cafe-by-the-valley',
      category: 'Beverages',
      name: 'Iced Tea (Lemon / Peach)',
      price: 80,
      dietary: 'veg',
      variants: [
        { label: 'Lemon', price: 80, dietary: 'veg' },
        { label: 'Peach', price: 90, dietary: 'veg' }
      ],
      prepTime: '5 min',
      tags: ['Chilled'],
      description: 'Refreshing chilled black tea brewed over ice with zesty lemon or sweet peach.'
    },
    {
      id: 'v-sweet-lassi',
      restaurantId: 'cafe-by-the-valley',
      category: 'Beverages',
      name: 'Sweet Lassi',
      price: 90,
      dietary: 'veg',
      prepTime: '5 min',
      tags: ['Chilled'],
      description: 'Creamy whisked yogurt lassi lightly sweetened and served cold.'
    },
    {
      id: 'v-virgin-mojito',
      restaurantId: 'cafe-by-the-valley',
      category: 'Beverages',
      name: 'Virgin Mojito',
      price: 95,
      dietary: 'veg',
      prepTime: '5 min',
      tags: ['Refreshing'],
      description: 'Crushed garden mint, fresh lime, ice, and sparkling soda.'
    },

    // 12. MILKSHAKES
    {
      id: 'v-vanilla-shake',
      restaurantId: 'cafe-by-the-valley',
      category: 'Milkshakes',
      name: 'Vanilla Shake',
      price: 90,
      dietary: 'veg',
      prepTime: '6 min',
      tags: ['Classic'],
      description: 'Thick creamy Madagascar-style vanilla ice cream shake.'
    },
    {
      id: 'v-cold-coffee',
      restaurantId: 'cafe-by-the-valley',
      category: 'Milkshakes',
      name: 'Cold Coffee',
      price: 100,
      dietary: 'veg',
      prepTime: '6 min',
      tags: ['Bestseller'],
      description: 'Signature blended cold coffee—rich, frothy, and chilled.'
    },
    {
      id: 'v-cold-chocolate',
      restaurantId: 'cafe-by-the-valley',
      category: 'Milkshakes',
      name: 'Cold Chocolate',
      price: 110,
      dietary: 'veg',
      prepTime: '6 min',
      tags: ['Chocolaty'],
      description: 'Chilled chocolate milk shake topped with rich cocoa notes.'
    },
    {
      id: 'v-strawberry-shake',
      restaurantId: 'cafe-by-the-valley',
      category: 'Milkshakes',
      name: 'Strawberry Shake',
      price: 120,
      dietary: 'veg',
      prepTime: '6 min',
      tags: ['Fruity'],
      description: 'Creamy berry milkshake blended smooth with sweet strawberry swirl.'
    },
    {
      id: 'v-oreo-shake',
      restaurantId: 'cafe-by-the-valley',
      category: 'Milkshakes',
      name: 'Oreo Cookie Shake',
      price: 130,
      dietary: 'veg',
      prepTime: '7 min',
      tags: ['Crunchy'],
      description: 'Crushed Oreo chocolate cookies spun thick with vanilla cream.'
    },
    {
      id: 'v-kitkat-shake',
      restaurantId: 'cafe-by-the-valley',
      category: 'Milkshakes',
      name: 'Kit Kat Shake',
      price: 140,
      dietary: 'veg',
      prepTime: '7 min',
      tags: ['Wafer Crunch'],
      description: 'Blended chocolate wafer shake crowned with crisp Kit Kat crumble.'
    },
    {
      id: 'v-nutella-shake',
      restaurantId: 'cafe-by-the-valley',
      category: 'Milkshakes',
      name: 'Nutella Shake',
      price: 150,
      dietary: 'veg',
      prepTime: '7 min',
      tags: ['Hazelnut'],
      description: 'Decadent roasted hazelnut Nutella spun into a thick chilled shake.'
    },
    {
      id: 'v-biscoff-shake',
      restaurantId: 'cafe-by-the-valley',
      category: 'Milkshakes',
      name: 'Lotus Biscoff Shake',
      price: 160,
      dietary: 'veg',
      prepTime: '7 min',
      tags: ['Caramelized'],
      description: 'Spiced caramelized Lotus Biscoff cookie butter blended into velvety cream.'
    },

    // ---- ATMOSPHERE CAFE (Full Official Atmospherea Menu) ----
    // 1. MORNING MAGIC (8-10AM)
    {
      id: 'a-bread-omelette',
      restaurantId: 'atmosphere-cafe',
      category: 'Morning Magic (8–10 AM)',
      name: 'Bread Omelette',
      price: 59,
      dietary: 'nonveg',
      prepTime: '8 min',
      tags: ['8–10 AM'],
      description: 'Fluffy spiced omelette folded with toasted sandwich bread.'
    },
    {
      id: 'a-french-toast',
      restaurantId: 'atmosphere-cafe',
      category: 'Morning Magic (8–10 AM)',
      name: 'French Toast',
      price: 59,
      dietary: 'nonveg',
      prepTime: '8 min',
      tags: ['8–10 AM'],
      description: 'Golden griddled egg-dipped toast served warm for breakfast.'
    },
    {
      id: 'a-boiled-egg',
      restaurantId: 'atmosphere-cafe',
      category: 'Morning Magic (8–10 AM)',
      name: 'Boiled Egg (2 pc.)',
      price: 25,
      dietary: 'nonveg',
      prepTime: '6 min',
      tags: ['Protein'],
      description: 'Two farm-fresh boiled eggs seasoned with salt and pepper.'
    },
    {
      id: 'a-sprouts-salad',
      restaurantId: 'atmosphere-cafe',
      category: 'Morning Magic (8–10 AM)',
      name: 'Sprouts Salad',
      price: 49,
      dietary: 'veg',
      prepTime: '5 min',
      tags: ['Healthy'],
      description: 'Fresh sprouted moong tossed with onion, tomato, lemon, and chaat spice.'
    },

    // 2. ALOO PARATHA
    {
      id: 'a-aloo-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Aloo Paratha',
      name: 'Aloo Paratha',
      price: 79,
      dietary: 'veg',
      prepTime: '12 min',
      tags: ['Classic'],
      description: 'Traditional whole-wheat paratha stuffed with spiced mashed potatoes. Extra butter/curd ₹10.'
    },
    {
      id: 'a-aloo-gobi',
      restaurantId: 'atmosphere-cafe',
      category: 'Aloo Paratha',
      name: 'Aloo Gobi Paratha',
      price: 99,
      dietary: 'veg',
      prepTime: '13 min',
      tags: ['Hearty'],
      description: 'Spiced potato and grated cauliflower stuffed crispy paratha.'
    },
    {
      id: 'a-aloo-methi',
      restaurantId: 'atmosphere-cafe',
      category: 'Aloo Paratha',
      name: 'Aloo Methi Paratha',
      price: 99,
      dietary: 'veg',
      prepTime: '13 min',
      tags: ['Aromatic'],
      description: 'Fresh fenugreek leaves and spiced potato folded into golden paratha.'
    },
    {
      id: 'a-tandoori-aloo',
      restaurantId: 'atmosphere-cafe',
      category: 'Aloo Paratha',
      name: 'Tandoori Aloo Paratha',
      price: 109,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Smoky'],
      description: 'Tandoori-spiced aloo stuffing crisped golden on the griddle.'
    },
    {
      id: 'a-aloo-peas',
      restaurantId: 'atmosphere-cafe',
      category: 'Aloo Paratha',
      name: 'Aloo Peas Paratha',
      price: 109,
      dietary: 'veg',
      prepTime: '13 min',
      tags: ['Homestyle'],
      description: 'Crushed green peas and masala potato stuffed inside warm paratha.'
    },
    {
      id: 'a-aloo-corns',
      restaurantId: 'atmosphere-cafe',
      category: 'Aloo Paratha',
      name: 'Aloo Corns Paratha',
      price: 99,
      dietary: 'veg',
      prepTime: '13 min',
      tags: ['Sweet & Spiced'],
      description: 'Sweet corn kernels blended with spiced aloo inside crisp wheat layers.'
    },
    {
      id: 'a-aloo-palak',
      restaurantId: 'atmosphere-cafe',
      category: 'Aloo Paratha',
      name: 'Aloo Palak Paratha',
      price: 109,
      dietary: 'veg',
      prepTime: '13 min',
      tags: ['Wholesome'],
      description: 'Fresh spinach and seasoned aloo stuffing cooked golden.'
    },
    {
      id: 'a-aloo-paneer',
      restaurantId: 'atmosphere-cafe',
      category: 'Aloo Paratha',
      name: 'Aloo Paneer Paratha',
      price: 109,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Protein'],
      description: 'Rich blend of spiced potato and grated cottage cheese.'
    },
    {
      id: 'a-aloo-cheese',
      restaurantId: 'atmosphere-cafe',
      category: 'Aloo Paratha',
      name: 'Aloo Cheese Paratha',
      price: 129,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Bestseller'],
      description: 'Crispy stuffed aloo paratha loaded with molten cheese. Extra butter/curd ₹10.'
    },
    {
      id: 'a-aloo-mushroom',
      restaurantId: 'atmosphere-cafe',
      category: 'Aloo Paratha',
      name: 'Aloo Mushroom Paratha',
      price: 119,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Savory'],
      description: 'Sauteed mushrooms and spiced potato tucked into flaky paratha.'
    },

    // 3. GOBI PARATHA
    {
      id: 'a-gobi',
      restaurantId: 'atmosphere-cafe',
      category: 'Gobi Paratha',
      name: 'Gobi Paratha',
      price: 89,
      dietary: 'veg',
      prepTime: '12 min',
      tags: ['Classic'],
      description: 'Finely grated cauliflower tempered with ginger, ajwain, and spices.'
    },
    {
      id: 'a-gobi-onion',
      restaurantId: 'atmosphere-cafe',
      category: 'Gobi Paratha',
      name: 'Gobi Onion Paratha',
      price: 99,
      dietary: 'veg',
      prepTime: '13 min',
      tags: ['Crisp'],
      description: 'Crunchy red onions paired with spiced cauliflower stuffing.'
    },
    {
      id: 'a-gobi-paneer',
      restaurantId: 'atmosphere-cafe',
      category: 'Gobi Paratha',
      name: 'Gobi Paneer Paratha',
      price: 109,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Hearty'],
      description: 'Grated cauliflower and fresh paneer seasoned with warm Indian spices.'
    },
    {
      id: 'a-gobi-cheese',
      restaurantId: 'atmosphere-cafe',
      category: 'Gobi Paratha',
      name: 'Gobi Cheese Paratha',
      price: 129,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Cheesy'],
      description: 'Spiced gobi filling finished with melted cheese.'
    },
    {
      id: 'a-gobi-chilli-paneer',
      restaurantId: 'atmosphere-cafe',
      category: 'Gobi Paratha',
      name: 'Gobi Chilli Paneer Paratha',
      price: 119,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Spicy'],
      description: 'Fiery green-chili gobi & paneer stuffing seared crisp.'
    },
    {
      id: 'a-gobi-chilli-cheese',
      restaurantId: 'atmosphere-cafe',
      category: 'Gobi Paratha',
      name: 'Gobi Chilli Cheese Paratha',
      price: 129,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Spicy & Cheesy'],
      description: 'Bold green chili, spiced gobi, and molten cheese in every bite.'
    },

    // 4. PANEER PARATHA
    {
      id: 'a-paneer',
      restaurantId: 'atmosphere-cafe',
      category: 'Paneer Paratha',
      name: 'Paneer Paratha',
      price: 109,
      dietary: 'veg',
      prepTime: '13 min',
      tags: ['High Protein'],
      description: 'Generously stuffed with spiced crumbled paneer and fresh coriander.'
    },
    {
      id: 'a-paneer-onion',
      restaurantId: 'atmosphere-cafe',
      category: 'Paneer Paratha',
      name: 'Paneer Onion Paratha',
      price: 119,
      dietary: 'veg',
      prepTime: '13 min',
      tags: ['Classic'],
      description: 'Soft malai paneer paired with crisp chopped onions and green chili.'
    },
    {
      id: 'a-paneer-mushroom',
      restaurantId: 'atmosphere-cafe',
      category: 'Paneer Paratha',
      name: 'Paneer Mushroom Paratha',
      price: 119,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Chef Choice'],
      description: 'Savory mushrooms and spiced paneer folded into golden wheat dough.'
    },
    {
      id: 'a-paneer-peas',
      restaurantId: 'atmosphere-cafe',
      category: 'Paneer Paratha',
      name: 'Paneer Peas Paratha',
      price: 129,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Wholesome'],
      description: 'Sweet green peas and seasoned paneer stuffed crisp.'
    },
    {
      id: 'a-paneer-cheese',
      restaurantId: 'atmosphere-cafe',
      category: 'Paneer Paratha',
      name: 'Paneer Cheese Paratha',
      price: 139,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Bestseller'],
      description: 'Double-rich stuffing of spiced paneer and gooey melted cheese.'
    },

    // 5. METHI PARATHA
    {
      id: 'a-methi',
      restaurantId: 'atmosphere-cafe',
      category: 'Methi Paratha',
      name: 'Methi Paratha',
      price: 89,
      dietary: 'veg',
      prepTime: '12 min',
      tags: ['Fragrant'],
      description: 'Aromatic fresh fenugreek leaves kneaded and roasted golden.'
    },
    {
      id: 'a-methi-corn',
      restaurantId: 'atmosphere-cafe',
      category: 'Methi Paratha',
      name: 'Methi Corn Paratha',
      price: 99,
      dietary: 'veg',
      prepTime: '13 min',
      tags: ['Balanced'],
      description: 'Earthy methi balanced with sweet corn kernels.'
    },
    {
      id: 'a-methi-onion',
      restaurantId: 'atmosphere-cafe',
      category: 'Methi Paratha',
      name: 'Methi Onion Paratha',
      price: 99,
      dietary: 'veg',
      prepTime: '13 min',
      tags: ['Crisp'],
      description: 'Fresh methi and crunchy spiced onions seared to perfection.'
    },
    {
      id: 'a-methi-pudina',
      restaurantId: 'atmosphere-cafe',
      category: 'Methi Paratha',
      name: 'Methi Pudina Paratha',
      price: 99,
      dietary: 'veg',
      prepTime: '13 min',
      tags: ['Herbaceous'],
      description: 'Cooling mint and aromatic fenugreek blend in flaky paratha.'
    },
    {
      id: 'a-methi-cheese-corn',
      restaurantId: 'atmosphere-cafe',
      category: 'Methi Paratha',
      name: 'Methi Cheese Corn Paratha',
      price: 129,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Cheesy'],
      description: 'Methi paratha loaded with sweet corn and melted cheese.'
    },
    {
      id: 'a-methi-garlic-cheese',
      restaurantId: 'atmosphere-cafe',
      category: 'Methi Paratha',
      name: 'Methi Garlic Cheese Paratha',
      price: 129,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Savory'],
      description: 'Roasted garlic, fresh fenugreek, and bubbling cheese.'
    },
    {
      id: 'a-methi-cheese-corn-garlic',
      restaurantId: 'atmosphere-cafe',
      category: 'Methi Paratha',
      name: 'Methi Cheese Corn Garlic Paratha',
      price: 139,
      dietary: 'veg',
      prepTime: '15 min',
      tags: ['Loaded'],
      description: 'All-in-one methi, roasted garlic, sweet corn, and melted cheese.'
    },

    // 6. CHEESE PARATHA
    {
      id: 'a-cheese-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Cheese Paratha',
      name: 'Cheese Paratha',
      price: 139,
      dietary: 'veg',
      prepTime: '13 min',
      tags: ['Extra Cheesy'],
      description: 'Pure molten cheese & herbs sealed inside crisp golden wheat.'
    },
    {
      id: 'a-cheese-onion-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Cheese Paratha',
      name: 'Cheese Onion Paratha',
      price: 149,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Rich'],
      description: 'Sharp melted cheese paired with crunchy spiced onions.'
    },

    // 7. SPECIAL PARATHA
    {
      id: 'a-peshawari-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Peshawari Paratha',
      price: 119,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['House Special'],
      description: 'Aloo + Cheese + Capsicum stuffed special paratha.'
    },
    {
      id: 'a-veg-keema-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Veg Keema Paratha',
      price: 139,
      dietary: 'veg',
      prepTime: '15 min',
      tags: ['Chef Special'],
      description: 'Finely minced spiced mixed vegetables folded into flaky layers.'
    },
    {
      id: 'a-ragda-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Ragda Paratha',
      price: 129,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Hearty'],
      description: 'Aloo + Gobhi + Peas + Onion medley cooked golden.'
    },
    {
      id: 'a-italian-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Italian Paratha',
      price: 139,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Fusion'],
      description: 'Cheese + Paneer + Capsicum with Italian herb seasoning.'
    },
    {
      id: 'a-hara-bhara-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Hara Bhara Paratha',
      price: 129,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Green Medley'],
      description: 'Peas + Methi + Palak + Pudina wholesome green stuffing.'
    },
    {
      id: 'a-pahadi-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Pahadi Paratha',
      price: 139,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Signature'],
      description: 'Cheese + Tomato + Special Sauce inside a crisp paratha.'
    },
    {
      id: 'a-kolhapuri-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Kolhapuri Paratha',
      price: 139,
      dietary: 'veg',
      prepTime: '15 min',
      tags: ['Spicy'],
      description: 'Cheese + Mushroom + Spicy Kolhapuri Masala.'
    },
    {
      id: 'a-toofani-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Toofani Paratha',
      price: 119,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Bold'],
      description: 'Gobi + Peas + Onion fiery spiced stuffing.'
    },
    {
      id: 'a-kashmiri-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Kashmiri Paratha',
      price: 119,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Rich'],
      description: 'Aloo + Paneer + Dry Fruits mildly spiced & aromatic.'
    },
    {
      id: 'a-schezwan-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Schezwan Paratha',
      price: 139,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Indo-Chinese'],
      description: 'Cheese + Mixed Veggies tossed in zesty Schezwan sauce.'
    },
    {
      id: 'a-amritsari-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Amritsari Paratha',
      price: 119,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Classic'],
      description: 'Aloo + Paneer + Onion + Pudina crushed Punjabi-style.'
    },
    {
      id: 'a-achari-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Achari Paratha',
      price: 119,
      dietary: 'veg',
      prepTime: '13 min',
      tags: ['Tangy'],
      description: 'Spiced Aloo tossed in tangy pickled Achari masala.'
    },
    {
      id: 'a-chilli-milli-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Chilli Milli Paratha',
      price: 129,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Spicy'],
      description: 'Cabbage + Cheese + Chilli crisp savory blend.'
    },
    {
      id: 'a-paushtik-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Paushtik Paratha',
      price: 119,
      dietary: 'veg',
      prepTime: '14 min',
      tags: ['Nutritious'],
      description: 'Aloo + Palak + Carrot wholesome campus meal paratha.'
    },
    {
      id: 'a-paneer-tikka-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Stuffed Paneer Tikka Paratha',
      price: 139,
      dietary: 'veg',
      prepTime: '15 min',
      tags: ['Bestseller'],
      description: 'Char-spiced paneer tikka chunks stuffed into flaky paratha.'
    },
    {
      id: 'a-chicken-keema-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Chicken Keema Paratha',
      price: 139,
      dietary: 'nonveg',
      prepTime: '15 min',
      tags: ['Protein'],
      description: 'Slow-spiced minced chicken keema stuffed golden.'
    },
    {
      id: 'a-namak-ajwain-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Namak Ajwain Paratha',
      price: 89,
      dietary: 'veg',
      prepTime: '10 min',
      tags: ['Simple & Crisp'],
      description: 'Flaky layered paratha speckled with carom seeds and sea salt.'
    },
    {
      id: 'a-sattu-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Sattu Paratha',
      price: 109,
      dietary: 'veg',
      prepTime: '13 min',
      tags: ['Traditional'],
      description: 'Roasted gram flour spiced with garlic, ajwain, mustard oil & chili.'
    },
    {
      id: 'a-aphlatun-paratha',
      restaurantId: 'atmosphere-cafe',
      category: 'Special Paratha',
      name: 'Aphlatun Paratha',
      price: 149,
      dietary: 'veg',
      prepTime: '15 min',
      tags: ['Signature'],
      description: 'Cheese + Paneer + Peas + Onion Tomato Schezwan Sauce.'
    },

    // 8. SWEET SCOOPS
    {
      id: 'a-gulab-jamun',
      restaurantId: 'atmosphere-cafe',
      category: 'Sweet Scoops',
      name: 'Gulab Jamun (1 pc.)',
      price: 20,
      dietary: 'veg',
      prepTime: '3 min',
      tags: ['Sweet'],
      description: 'Warm syrup-soaked khoya gulab jamun (₹20 per piece).'
    },

    // 9. DRINK DISPATCH
    {
      id: 'a-lemon-iced-tea',
      restaurantId: 'atmosphere-cafe',
      category: 'Drink Dispatch',
      name: 'Lemon Iced Tea',
      price: 39,
      dietary: 'veg',
      prepTime: '4 min',
      tags: ['Chilled'],
      description: 'Crisp chilled lemon iced tea.'
    },
    {
      id: 'a-sweet-lassi',
      restaurantId: 'atmosphere-cafe',
      category: 'Drink Dispatch',
      name: 'Sweet Lassi',
      price: 39,
      dietary: 'veg',
      prepTime: '4 min',
      tags: ['Cooling'],
      description: 'Thick chilled sweet yogurt lassi.'
    },
    {
      id: 'a-mango-lassi',
      restaurantId: 'atmosphere-cafe',
      category: 'Drink Dispatch',
      name: 'Mango Lassi',
      price: 59,
      dietary: 'veg',
      prepTime: '5 min',
      tags: ['Fruity'],
      description: 'Creamy mango-blended chilled lassi.'
    },
    {
      id: 'a-cold-coffee',
      restaurantId: 'atmosphere-cafe',
      category: 'Drink Dispatch',
      name: 'Cold Coffee',
      price: 69,
      dietary: 'veg',
      prepTime: '5 min',
      tags: ['Chilled'],
      description: 'Frothy blended cold coffee.'
    },
    {
      id: 'a-kulhad-tea',
      restaurantId: 'atmosphere-cafe',
      category: 'Drink Dispatch',
      name: 'Kulhad Tea',
      price: 15,
      dietary: 'veg',
      prepTime: '4 min',
      tags: ['Campus Favorite'],
      description: 'Hot spiced masala tea served in an earthy clay kulhad.'
    },
    {
      id: 'a-masala-buttermilk',
      restaurantId: 'atmosphere-cafe',
      category: 'Drink Dispatch',
      name: 'Masala Buttermilk',
      price: 39,
      dietary: 'veg',
      prepTime: '4 min',
      tags: ['Refreshing'],
      description: 'Spiced chilled chaas with roasted cumin and herbs.'
    },
    {
      id: 'a-banana-shake',
      restaurantId: 'atmosphere-cafe',
      category: 'Drink Dispatch',
      name: 'Banana Shake',
      price: 49,
      dietary: 'veg',
      prepTime: '5 min',
      tags: ['Energy'],
      description: 'Thick ripe banana milk shake.'
    },
    {
      id: 'a-banana-pb-shake',
      restaurantId: 'atmosphere-cafe',
      category: 'Drink Dispatch',
      name: 'Banana Shake (with Peanut Butter)',
      price: 59,
      dietary: 'veg',
      prepTime: '5 min',
      tags: ['High Protein'],
      description: 'Creamy banana shake blended with roasted peanut butter.'
    },

    // 10. SNACK STORIES (4-8PM)
    {
      id: 'a-salted-fries',
      restaurantId: 'atmosphere-cafe',
      category: 'Snack Stories (4–8 PM)',
      name: 'Salted Fries',
      price: 89,
      dietary: 'veg',
      prepTime: '8 min',
      tags: ['4–8 PM'],
      description: 'Crisp golden salted french fries.'
    },
    {
      id: 'a-periperi-fries',
      restaurantId: 'atmosphere-cafe',
      category: 'Snack Stories (4–8 PM)',
      name: 'Periperi Fries',
      price: 109,
      dietary: 'veg',
      prepTime: '8 min',
      tags: ['Spicy'],
      description: 'Crispy fries tossed in zesty peri-peri masala.'
    },
    {
      id: 'a-paneer-roll',
      restaurantId: 'atmosphere-cafe',
      category: 'Snack Stories (4–8 PM)',
      name: 'Paneer Roll',
      price: 99,
      dietary: 'veg',
      prepTime: '10 min',
      tags: ['Evening Bite'],
      description: 'Warm flaky roll packed with spiced paneer and veggies.'
    },
    {
      id: 'a-chicken-roll',
      restaurantId: 'atmosphere-cafe',
      category: 'Snack Stories (4–8 PM)',
      name: 'Chicken Roll',
      price: 119,
      dietary: 'nonveg',
      prepTime: '12 min',
      tags: ['Bestseller'],
      description: 'Juicy spiced chicken rolled with onions and sauce.'
    },
    {
      id: 'a-chicken-strips',
      restaurantId: 'atmosphere-cafe',
      category: 'Snack Stories (4–8 PM)',
      name: 'Chicken Strips',
      price: 149,
      dietary: 'nonveg',
      prepTime: '12 min',
      tags: ['Crispy'],
      description: 'Golden crispy fried chicken tenders.'
    },
    {
      id: 'a-veg-burger',
      restaurantId: 'atmosphere-cafe',
      category: 'Snack Stories (4–8 PM)',
      name: 'Veg Burger',
      price: 89,
      dietary: 'veg',
      prepTime: '10 min',
      tags: ['Classic'],
      description: 'Crispy veggie patty stacked with lettuce and burger sauce.'
    },
    {
      id: 'a-chicken-burger',
      restaurantId: 'atmosphere-cafe',
      category: 'Snack Stories (4–8 PM)',
      name: 'Chicken Burger',
      price: 109,
      dietary: 'nonveg',
      prepTime: '12 min',
      tags: ['Hearty'],
      description: 'Crisp chicken fillet burger with melted cheese and dressing.'
    },

    // 11. MON, WED, FRI SPECIAL
    {
      id: 'a-chicken-dum-biryani',
      restaurantId: 'atmosphere-cafe',
      category: 'Mon, Wed, Fri Special',
      name: 'Chicken Dum Biryani',
      price: 149,
      dietary: 'nonveg',
      prepTime: '16 min',
      tags: ['Mon / Wed / Fri'],
      description: 'Aromatic slow-steamed basmati dum biryani layered with spiced chicken.'
    },

    // 12. OUR SPECIAL
    {
      id: 'a-paneer-dum-biryani',
      restaurantId: 'atmosphere-cafe',
      category: 'Our Special',
      name: 'Paneer Dum Biryani',
      price: 139,
      dietary: 'veg',
      prepTime: '16 min',
      tags: ['Our Special'],
      description: 'Fragrant saffron basmati dum biryani layered with marinated paneer.'
    },
    {
      id: 'a-khadi-pakoda-rice',
      restaurantId: 'atmosphere-cafe',
      category: 'Our Special',
      name: 'Khadi Pakoda Rice',
      price: 90,
      dietary: 'veg',
      prepTime: '12 min',
      tags: ['Comfort Meal'],
      description: 'Tangy homestyle kadhi with crispy pakodas served over steamed rice.'
    }
  ];

  /* --------------------------------------------------------------------------
     Path Helpers (Works from frontend/, frontend/restaurants/, OR backend/)
     -------------------------------------------------------------------------- */
  function getRootPrefix() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/restaurants/')) return '../';
    if (path.includes('/backend/')) return '../frontend/';
    return '';
  }

  function getApiPrefix() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/frontend/restaurants/')) return '../../';
    if (path.includes('/restaurants/') || path.includes('/backend/') || path.includes('/frontend/')) return '../';
    return '';
  }

  /* --------------------------------------------------------------------------
     Cart State & Persistence
     -------------------------------------------------------------------------- */
  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) { /* ignore storage quota errors */ }
  }

  const orderChannel = typeof global.BroadcastChannel !== 'undefined'
    ? new global.BroadcastChannel('foodverse_orders_channel')
    : null;

  function loadOrders() {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveOrders(orders) {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify((orders || []).slice(0, 60)));
      if (orderChannel) {
        orderChannel.postMessage({ type: 'orders-updated', at: Date.now() });
      }
    } catch (e) { /* ignore */ }
  }

  function syncOrderApi(method, path, payload) {
    if (!/^https?:$/.test(global.location.protocol)) return Promise.resolve(null);
    return fetch(path, {
      method: method,
      headers: payload ? { 'Content-Type': 'application/json' } : undefined,
      body: payload ? JSON.stringify(payload) : undefined
    }).then(function (r) {
      return r.ok ? r.json() : null;
    }).catch(function () { return null; });
  }

  function fetchOrdersWithServerSync() {
    const local = loadOrders();
    return syncOrderApi('GET', getApiPrefix() + 'api/orders').then(function (data) {
      if (data && Array.isArray(data.orders)) {
        const mergedMap = {};
        data.orders.concat(local).forEach(function (o) {
          if (o && o.token && !mergedMap[o.token]) mergedMap[o.token] = o;
        });
        const merged = Object.values(mergedMap).sort(function (a, b) {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });
        saveOrders(merged);
        return merged;
      }
      return local;
    });
  }

  function updateOrderStatus(token, nextStatus) {
    const orders = loadOrders();
    const target = orders.find(function (o) { return o.token === token; });
    if (!target) return orders;
    target.status = nextStatus;
    target.statusUpdatedAt = new Date().toISOString();
    saveOrders(orders);
    syncOrderApi('PATCH', getApiPrefix() + 'api/orders/' + encodeURIComponent(token), { status: nextStatus }).then(function (res) {
      // If order existed locally before server started (e.g. local seed), push it to server
      if (!res) {
        syncOrderApi('POST', getApiPrefix() + 'api/orders', target);
      }
    });
    return orders;
  }

  function clearOrdersStore() {
    saveOrders([]);
    syncOrderApi('DELETE', getApiPrefix() + 'api/orders');
    return [];
  }

  let cart = loadCart();
  let orderMode = 'delivery'; // 'hostel' | 'delivery' | 'pickup'
  let checkoutDraft = { name: '', roll: '', locationByMode: {}, slotByMode: {} };

  function getItemById(id) {
    return MENU_ITEMS.find(function (m) { return m.id === id; });
  }

  function getVariantInfo(item, variantIdx) {
    if (!item) return null;
    if (Array.isArray(item.variants) && item.variants.length > 0) {
      const idx = Math.max(0, Math.min(item.variants.length - 1, Number(variantIdx) || 0));
      return {
        variantIdx: idx,
        label: item.variants[idx].label,
        price: item.variants[idx].price,
        dietary: item.variants[idx].dietary || item.dietary || 'veg'
      };
    }
    return {
      variantIdx: 0,
      label: null,
      price: item.price,
      dietary: item.dietary || 'veg'
    };
  }

  function makeCartKey(itemId, variantIdx) {
    return itemId + '::' + (Number(variantIdx) || 0);
  }

  function addToCart(itemId, variantIdx) {
    const item = getItemById(itemId);
    if (!item) return;
    const vIdx = Number(variantIdx) || 0;
    const vInfo = getVariantInfo(item, vIdx);
    const key = makeCartKey(itemId, vInfo.variantIdx);
    const existing = cart.find(function (c) { return (c.key || makeCartKey(c.id, c.variantIdx)) === key; });
    if (existing) {
      existing.key = key;
      existing.variantIdx = vInfo.variantIdx;
      existing.qty += 1;
    } else {
      cart.push({ key: key, id: itemId, variantIdx: vInfo.variantIdx, qty: 1 });
    }
    saveCart(cart);
    updateCartUI();
    const displayName = vInfo.label ? item.name + ' (' + vInfo.label + ')' : item.name;
    showToast('Added "' + displayName + '" to your Food Verse bag');
  }

  function changeQty(cartKey, delta) {
    const idx = cart.findIndex(function (c) { return (c.key || makeCartKey(c.id, c.variantIdx)) === cartKey; });
    if (idx === -1) return;
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) {
      cart.splice(idx, 1);
    }
    saveCart(cart);
    updateCartUI();
  }

  function clearCart() {
    cart = [];
    saveCart(cart);
    updateCartUI();
  }

  function getTotalCount() {
    return cart.reduce(function (sum, c) { return sum + c.qty; }, 0);
  }

  function getSubtotal() {
    return cart.reduce(function (sum, c) {
      const item = getItemById(c.id);
      if (!item) return sum;
      const vInfo = getVariantInfo(item, c.variantIdx);
      return sum + vInfo.price * c.qty;
    }, 0);
  }

  /* --------------------------------------------------------------------------
     Toast UI
     -------------------------------------------------------------------------- */
  let toastTimer = null;
  function showToast(message) {
    let toast = document.getElementById('fv-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'fv-toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2400);
  }

  /* --------------------------------------------------------------------------
     Inject Shared Header, Cart Drawer, and Footer
     -------------------------------------------------------------------------- */
  function renderSharedChrome(activeKey) {
    const prefix = getRootPrefix();

    // 1. Scroll progress bar
    if (!document.querySelector('.scroll-progress')) {
      const prog = document.createElement('div');
      prog.className = 'scroll-progress';
      prog.innerHTML = '<div class="scroll-progress__bar" id="fv-scroll-bar"></div>';
      document.body.prepend(prog);
    }

    // 2. Header
    const isOrdersBackend = activeKey === 'orders';
    const navHtml = isOrdersBackend
      ? `<nav class="nav-links nav-links--backend" id="fv-nav-links" aria-label="Kitchen Backend">
           <a href="orders.html" class="nav-link is-active">Kitchen Orders</a>
         </nav>`
      : `<nav class="nav-links" id="fv-nav-links" aria-label="Campus Restaurants">
           <a href="${prefix}index.html" class="nav-link ${activeKey === 'home' ? 'is-active' : ''}">Portal</a>
           <a href="${prefix}restaurants/cafe-by-the-valley.html" class="nav-link ${activeKey === 'cafe-by-the-valley' ? 'is-active' : ''}">Cafe by the Valley</a>
           <a href="${prefix}restaurants/atmosphere-cafe.html" class="nav-link ${activeKey === 'atmosphere-cafe' ? 'is-active' : ''}">Atmosphere Cafe</a>
           <a href="${prefix}sdg.html" class="nav-link ${activeKey === 'sdg' ? 'is-active' : ''}">SDG Impact</a>
         </nav>`;

    const actionsHtml = isOrdersBackend
      ? `<div class="header-actions">
           <button type="button" class="theme-toggle-btn" id="fv-theme-toggle" aria-pressed="false" aria-label="Toggle Dark Mode" title="Switch to Dark Mode">
             <svg class="theme-toggle-btn__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
               <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"></path>
             </svg>
             <span class="theme-toggle-btn__label">Dark</span>
           </button>
         </div>`
      : `<div class="header-actions">
           <button type="button" class="theme-toggle-btn" id="fv-theme-toggle" aria-pressed="false" aria-label="Toggle Dark Mode" title="Switch to Dark Mode">
             <svg class="theme-toggle-btn__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
               <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"></path>
             </svg>
             <span class="theme-toggle-btn__label">Dark</span>
           </button>
           <button type="button" class="bag-btn" id="fv-open-bag" aria-label="Open order bag">
             <span>Order Bag</span>
             <span class="bag-btn__count" id="fv-bag-count">0</span>
           </button>
           <button type="button" class="mobile-menu-btn" id="fv-mobile-toggle" aria-label="Toggle Menu">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
               <line x1="3" y1="7" x2="21" y2="7"></line>
               <line x1="3" y1="12" x2="21" y2="12"></line>
               <line x1="3" y1="17" x2="21" y2="17"></line>
             </svg>
           </button>
         </div>`;

    const headerMount = document.getElementById('fv-header');
    if (headerMount) {
      headerMount.innerHTML = `
        <header class="site-header">
          <div class="header-inst-bar">
            <div class="container header-inst-bar__inner">
              <a href="${prefix}index.html" class="uni-logo-wrap" title="CHRIST (Deemed to be University)">
                <img src="${prefix}assets/images/christ-university-logo.png" alt="CHRIST (Deemed to be University) Logo" class="uni-logo-img" />
              </a>
              <span class="header-inst-bar__label">${isOrdersBackend ? 'Kitchen Backend Dispatch' : 'Campus Dining Collective'}</span>
              <img src="${prefix}assets/images/department-logo.png" alt="Department Logo" class="dept-logo-img" title="Department Emblem" />
            </div>
          </div>
          <div class="container site-header__inner">
            <a href="${isOrdersBackend ? 'orders.html' : prefix + 'index.html'}" class="brand-mark" aria-label="Food Verse Home">
              <div class="brand-mark__crest"><span class="crest-burger"><span class="cb-bun">.---.</span>
<span class="cb-wave">(~~~)</span>
<span class="cb-patty">[===]</span>
<span class="cb-bun">&#96;---'</span></span></div>
              <div class="brand-mark__text">
                <span class="brand-mark__name">Food Verse</span>
              </div>
            </a>

            ${navHtml}

            ${actionsHtml}
          </div>
        </header>
      `;

      const themeBtn = document.getElementById('fv-theme-toggle');
      if (themeBtn) {
        applyTheme(isDarkMode(), false);
        themeBtn.addEventListener('click', function () {
          applyTheme(!isDarkMode(), true);
        });
      }

      const mobileBtn = document.getElementById('fv-mobile-toggle');
      const navLinks = document.getElementById('fv-nav-links');
      if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', function () {
          navLinks.classList.toggle('is-mobile-open');
        });
      }
    }

    // 3. Cart Drawer
    if (!document.getElementById('fv-cart-drawer')) {
      const drawerWrap = document.createElement('div');
      drawerWrap.innerHTML = `
        <div class="cart-backdrop" id="fv-cart-backdrop"></div>
        <aside class="cart-drawer" id="fv-cart-drawer" aria-label="Campus Order Bag">
          <div class="cart-drawer__head">
            <div>
              <span class="eyebrow" style="margin-bottom:4px;">Unified Tray</span>
              <h2 class="cart-drawer__title">Your Campus Order</h2>
            </div>
            <button type="button" class="close-btn" id="fv-close-bag" aria-label="Close order bag">&times;</button>
          </div>
          <div class="cart-drawer__body" id="fv-cart-body"></div>
          <div class="cart-drawer__foot" id="fv-cart-foot"></div>
        </aside>
      `;
      document.body.appendChild(drawerWrap);

      document.getElementById('fv-close-bag').addEventListener('click', closeCart);
      document.getElementById('fv-cart-backdrop').addEventListener('click', closeCart);
    }

    const openBagBtn = document.getElementById('fv-open-bag');
    if (openBagBtn) {
      openBagBtn.addEventListener('click', openCart);
    }

    // 4. Footer
    const footerMount = document.getElementById('fv-footer');
    if (footerMount) {
      footerMount.innerHTML = `
        <footer class="site-footer">
          <div class="container">
            <div class="site-footer__grid">
              <div>
                <div class="brand-mark" style="margin-bottom:14px;">
                  <div class="brand-mark__crest"><span class="crest-burger"><span class="cb-bun">.---.</span>
<span class="cb-wave">(~~~)</span>
<span class="cb-patty">[===]</span>
<span class="cb-bun">&#96;---'</span></span></div>
                  <div class="brand-mark__text">
                    <span class="brand-mark__name">Food Verse</span>
                    <span class="brand-mark__sub">University Dining Collective</span>
                  </div>
                </div>
                <p style="font-size:0.88rem; color:var(--ink-muted); max-width:340px; line-height:1.7;">
                  Connecting every student table across campus. Browse live menus, preview signature dishes, and order directly to your hostel or lecture hall.
                </p>
              </div>
              <div>
                <h4 class="site-footer__heading">The Two Houses</h4>
                <ul class="site-footer__links">
                  <li><a href="${prefix}restaurants/cafe-by-the-valley.html">01 · Cafe by the Valley</a></li>
                  <li><a href="${prefix}restaurants/atmosphere-cafe.html">02 · Atmosphere Cafe</a></li>
                  <li><a href="${prefix}sdg.html">03 · SDG Alignments</a></li>
                  ${isOrdersBackend ? '<li><a href="orders.html">04 · Kitchen Orders Portal</a></li>' : ''}
                </ul>
              </div>
              <div>
                <h4 class="site-footer__heading">Campus Drop Points</h4>
                <ul class="site-footer__links">
                  <li>Main Entrance Central Block</li>
                  <li>Main Entrance Management Block</li>
                  <li>Social Sphere &amp; Learning Cafe</li>
                  <li>Girls &amp; Boys Hostels (+2% Maint.)</li>
                </ul>
              </div>
              <div>
                <h4 class="site-footer__heading">Student Contact</h4>
                <ul class="site-footer__links">
                  <li><strong>P. Devarsh</strong></li>
                  <li><a href="tel:9363901624">+91 9363901624</a></li>
                  <li>Zero Campus Delivery Fee</li>
                  <li><a href="${prefix}index.html#unified-menu">Browse Full Directory</a></li>
                </ul>
              </div>
            </div>
            <div class="site-footer__bottom">
              <span>&copy; 2026 Food Verse · CHRIST (Deemed to be University) Campus Portal</span>
              <span>Developed by <strong>P. Devarsh</strong> &middot; Contact: <a href="tel:9363901624">9363901624</a></span>
            </div>
          </div>
        </footer>
      `;
    }

    updateCartUI();
  }

  function openCart() {
    document.getElementById('fv-cart-backdrop').classList.add('is-open');
    document.getElementById('fv-cart-drawer').classList.add('is-open');
    renderCartContents();
  }

  function closeCart() {
    document.getElementById('fv-cart-backdrop').classList.remove('is-open');
    document.getElementById('fv-cart-drawer').classList.remove('is-open');
  }

  function updateCartUI() {
    const countEl = document.getElementById('fv-bag-count');
    if (countEl) {
      countEl.textContent = String(getTotalCount());
    }
    if (document.getElementById('fv-cart-drawer')?.classList.contains('is-open')) {
      renderCartContents();
    }
    // Sync any add buttons on page
    document.querySelectorAll('[data-add-id]').forEach(function (btn) {
      const id = btn.getAttribute('data-add-id');
      const vIdx = Number(btn.getAttribute('data-variant-idx')) || 0;
      const key = makeCartKey(id, vIdx);
      const entry = cart.find(function (c) { return (c.key || makeCartKey(c.id, c.variantIdx)) === key; });
      if (entry) {
        btn.classList.add('is-added');
        btn.innerHTML = '<span>In Bag (' + entry.qty + ')</span><span>+</span>';
      } else {
        btn.classList.remove('is-added');
        btn.innerHTML = '<span>Add to Tray</span><span>+</span>';
      }
    });
  }

  let latestConfirmedOrder = null;

  function renderCartContents() {
    const body = document.getElementById('fv-cart-body');
    const foot = document.getElementById('fv-cart-foot');
    if (!body || !foot) return;

    if (latestConfirmedOrder) {
      const confirmedKitchens = Array.isArray(latestConfirmedOrder.kitchens)
        ? latestConfirmedOrder.kitchens.map(escapeHtml).join(', ')
        : '';
      body.innerHTML = `
        <div class="order-pass">
          <span class="eyebrow" style="justify-content:center;">Order Confirmed</span>
          <div class="order-pass__code">${escapeHtml(latestConfirmedOrder.token)}</div>
          <p style="font-size:0.88rem; color:var(--ink-muted); margin-bottom:14px;">
            Sent to <strong>${confirmedKitchens}</strong>
          </p>
          <div class="hairline" style="margin:14px 0;"></div>
          <div style="text-align:left; font-size:0.84rem; display:flex; flex-direction:column; gap:6px;">
            <div><strong>Student:</strong> ${escapeHtml(latestConfirmedOrder.studentName)} (${escapeHtml(latestConfirmedOrder.rollNo)})</div>
            <div><strong>Mode:</strong> ${latestConfirmedOrder.mode === 'hostel' ? 'Delivery to Hostels (+2% Maintenance)' : (latestConfirmedOrder.mode === 'delivery' ? 'Campus Drop Delivery' : 'Express Counter Pickup')}</div>
            <div><strong>Drop / Counter:</strong> ${escapeHtml(latestConfirmedOrder.location)}</div>
            <div><strong>Window:</strong> ${escapeHtml(latestConfirmedOrder.slot)}</div>
            ${Number(latestConfirmedOrder.commission) > 0 ? `<div><strong>Hostel Maintenance (2%):</strong> ₹${escapeHtml(latestConfirmedOrder.commission)}</div>` : ''}
            <div><strong>Total Paid / Payable:</strong> ₹${escapeHtml(latestConfirmedOrder.total)}</div>
          </div>
          <button type="button" class="btn-editorial btn-editorial--pill" id="fv-new-order-btn" style="margin-top:20px; width:100%;">
            Start Another Order
          </button>
        </div>
      `;
      foot.innerHTML = '';
      document.getElementById('fv-new-order-btn').addEventListener('click', function () {
        latestConfirmedOrder = null;
        renderCartContents();
      });
      return;
    }

    if (cart.length === 0) {
      const pastOrders = loadOrders();
      let historyHtml = '';
      if (pastOrders.length > 0) {
        historyHtml = `
          <div style="margin-top:28px; text-align:left; border-top:1px solid var(--line); padding-top:18px;">
            <span class="eyebrow" style="margin-bottom:10px;">Recent Passes</span>
            ${pastOrders.slice(0, 3).map(function (o) {
              const kitchensLine = Array.isArray(o.kitchens) ? o.kitchens.map(escapeHtml).join(' · ') : '';
              return `<div style="padding:10px 12px; border:1px solid var(--line); margin-bottom:8px; font-size:0.8rem; background:var(--bg-soft);">
                <div style="display:flex; justify-content:space-between; font-weight:600;">
                  <span>${escapeHtml(o.token)}</span>
                  <span>₹${escapeHtml(o.total)}</span>
                </div>
                <div style="color:var(--ink-muted); margin-top:2px;">${kitchensLine} — ${escapeHtml(o.location)}</div>
              </div>`;
            }).join('')}
          </div>
        `;
      }

      body.innerHTML = `
        <div class="cart-empty">
          <p class="serif-title" style="font-size:1.7rem; margin-bottom:8px;">Your Tray is Empty</p>
          <p style="font-size:0.88rem; margin-bottom:18px;">Explore dishes from Cafe by the Valley or Atmosphere Cafe to begin your campus order.</p>
          ${historyHtml}
        </div>
      `;
      foot.innerHTML = '';
      return;
    }

    // Group items by restaurant
    const grouped = {};
    cart.forEach(function (entry) {
      const item = getItemById(entry.id);
      if (!item) return;
      if (!grouped[item.restaurantId]) grouped[item.restaurantId] = [];
      grouped[item.restaurantId].push({
        item: item,
        qty: entry.qty,
        key: entry.key || makeCartKey(entry.id, entry.variantIdx),
        vInfo: getVariantInfo(item, entry.variantIdx)
      });
    });

    let groupsHtml = '';
    Object.keys(grouped).forEach(function (restId) {
      const rest = RESTAURANTS[restId];
      groupsHtml += `<div class="cart-group">
        <div class="cart-group__name">${rest.name} · ${rest.prepAvg}</div>
        ${grouped[restId].map(function (row) {
          const title = row.vInfo.label ? row.item.name + ' — ' + row.vInfo.label : row.item.name;
          return `
            <div class="cart-item">
              <div>
                <div class="cart-item__title">${title}</div>
                <div class="cart-item__price">₹${row.vInfo.price} each</div>
              </div>
              <div class="qty-control">
                <button type="button" data-qty-key="${row.key}" data-delta="-1" aria-label="Decrease quantity">&minus;</button>
                <span>${row.qty}</span>
                <button type="button" data-qty-key="${row.key}" data-delta="1" aria-label="Increase quantity">+</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>`;
    });

    const existingNameEl = document.getElementById('fv-student-name');
    const existingRollEl = document.getElementById('fv-roll-no');
    const existingLocEl = document.getElementById('fv-location');
    const existingSlotEl = document.getElementById('fv-slot');
    if (existingNameEl) checkoutDraft.name = existingNameEl.value || '';
    if (existingRollEl) checkoutDraft.roll = existingRollEl.value || '';
    if (existingLocEl) {
      const prevMode = existingLocEl.getAttribute('data-mode-owner') || orderMode;
      checkoutDraft.locationByMode[prevMode] = existingLocEl.value;
    }
    if (existingSlotEl) {
      const prevSlotMode = existingSlotEl.getAttribute('data-mode-owner') || orderMode;
      checkoutDraft.slotByMode[prevSlotMode] = existingSlotEl.value;
    }

    const modeLocationLabel =
      orderMode === 'hostel'
        ? 'Select Hostel (2% Maintenance Commission)'
        : orderMode === 'delivery'
          ? 'Campus Drop Point (Zero Fee)'
          : 'Pickup Counter';

    const modeLocationOptions =
      orderMode === 'hostel'
        ? `<optgroup label="Girls Hostels">
             <option>Girls — Celebrations</option>
             <option>Girls — Aashiana Girls</option>
             <option>Girls — Portofino</option>
             <option>Girls — Private Villa</option>
             <option>Girls — Residency Girls</option>
           </optgroup>
           <optgroup label="Boys Hostels">
             <option>Boys — Club View</option>
             <option>Boys — Aashiana Boys</option>
             <option>Boys — Portofino</option>
             <option>Boys — Private Villa</option>
             <option>Boys — Residency Boys</option>
           </optgroup>`
        : orderMode === 'delivery'
          ? `<option>Main Entrance Central Block</option>
             <option>Main Entrance Management Block</option>
             <option>Social Sphere</option>
             <option>Outside Learning Cafe</option>`
          : `<option>Express Counter — Selected Kitchen(s)</option>
             <option>Main Entrance Central Block</option>
             <option>Main Entrance Management Block</option>
             <option>Social Sphere</option>
             <option>Outside Learning Cafe</option>`;

    const modeSlotLabel =
      orderMode === 'hostel'
        ? 'Hostel Delivery Window (Flexible Hours)'
        : 'Campus Time Slot';

    const modeSlotOptions =
      orderMode === 'hostel'
        ? `<option>ASAP Express Hostel Drop (20–30 min)</option>
           <option>Early Morning (7:30 AM – 10:30 AM)</option>
           <option>Midday / Lunch (11:00 AM – 3:00 PM)</option>
           <option>Evening Drop (4:00 PM – 7:30 PM)</option>
           <option>Night Hostel Drop (8:00 PM – 11:00 PM)</option>
           <option>Late Night Drop (11:00 PM – 1:00 AM)</option>
           <option>Flexible / Anytime Delivery</option>`
        : `<option>ASAP (15–20 mins)</option>
           <option>Next Lecture Break (1:00 PM)</option>
           <option>Evening Chai Hour (5:30 PM)</option>
           <option>Dinner Slot (8:15 PM)</option>`;

    const formHtml = `
      <form class="checkout-form" id="fv-checkout-form">
        <div class="mode-toggle mode-toggle--three">
          <button type="button" data-mode="hostel" class="${orderMode === 'hostel' ? 'is-active' : ''}">Delivery to Hostels (+2%)</button>
          <button type="button" data-mode="delivery" class="${orderMode === 'delivery' ? 'is-active' : ''}">Campus Drop</button>
          <button type="button" data-mode="pickup" class="${orderMode === 'pickup' ? 'is-active' : ''}">Counter Pickup</button>
        </div>
        <div class="form-field">
          <label for="fv-location">${modeLocationLabel}</label>
          <select id="fv-location" data-mode-owner="${orderMode}">
            ${modeLocationOptions}
          </select>
        </div>
        <div class="form-field">
          <label for="fv-slot">${modeSlotLabel}</label>
          <select id="fv-slot" data-mode-owner="${orderMode}">
            ${modeSlotOptions}
          </select>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div class="form-field">
            <label for="fv-student-name">Student Name</label>
            <input id="fv-student-name" type="text" placeholder="e.g. Aarav Mehta" value="${escapeHtml(checkoutDraft.name)}" required />
          </div>
          <div class="form-field">
            <label for="fv-roll-no">Roll / ID No.</label>
            <input id="fv-roll-no" type="text" placeholder="e.g. 24CS108" value="${escapeHtml(checkoutDraft.roll)}" required />
          </div>
        </div>
      </form>
    `;

    body.innerHTML = groupsHtml + formHtml;

    const locSelect = document.getElementById('fv-location');
    const slotSelect = document.getElementById('fv-slot');
    const nameEl = document.getElementById('fv-student-name');
    const rollEl = document.getElementById('fv-roll-no');
    const checkoutForm = document.getElementById('fv-checkout-form');

    function restoreSelectValue(sel, savedVal) {
      if (!sel || !savedVal) return;
      const hasOpt = Array.from(sel.options).some(function (opt) { return opt.value === savedVal; });
      if (hasOpt) sel.value = savedVal;
    }

    restoreSelectValue(locSelect, checkoutDraft.locationByMode[orderMode]);
    restoreSelectValue(slotSelect, checkoutDraft.slotByMode[orderMode]);

    if (locSelect) {
      locSelect.addEventListener('change', function () {
        checkoutDraft.locationByMode[orderMode] = locSelect.value;
      });
    }
    if (slotSelect) {
      slotSelect.addEventListener('change', function () {
        checkoutDraft.slotByMode[orderMode] = slotSelect.value;
      });
    }
    if (nameEl) {
      nameEl.addEventListener('input', function () { checkoutDraft.name = nameEl.value; });
    }
    if (rollEl) {
      rollEl.addEventListener('input', function () { checkoutDraft.roll = rollEl.value; });
    }
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = document.getElementById('fv-place-order');
        if (btn) btn.click();
      });
    }

    function formatCurrencyNum(val) {
      const rounded = Math.round(val * 100) / 100;
      return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
    }

    const subtotal = getSubtotal();
    const commissionRaw = orderMode === 'hostel' ? Math.round(subtotal * 0.02 * 100) / 100 : 0;
    const totalRaw = Math.round((subtotal + commissionRaw) * 100) / 100;
    const commissionText = formatCurrencyNum(commissionRaw);
    const totalText = formatCurrencyNum(totalRaw);

    const feeRowHtml = orderMode === 'hostel'
      ? `<div class="cart-summary-row" id="fv-commission-row"><span>Hostel Maintenance Commission (2%)</span><span>+₹${commissionText}</span></div>`
      : `<div class="cart-summary-row" id="fv-commission-row"><span>${orderMode === 'pickup' ? 'Counter Pickup Fee' : 'University Delivery Fee'}</span><span style="color:#237a4b; font-weight:600;">FREE</span></div>`;

    foot.innerHTML = `
      <div class="cart-summary-row"><span>Items Subtotal</span><span id="fv-subtotal-val">₹${subtotal}</span></div>
      ${feeRowHtml}
      <div class="cart-summary-total"><span>Total</span><span id="fv-total-val">₹${totalText}</span></div>
      <button type="button" class="btn-editorial btn-editorial--pill" id="fv-place-order" style="width:100%;">
        Place Campus Order &rarr;
      </button>
    `;

    body.querySelectorAll('[data-qty-key]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        changeQty(btn.getAttribute('data-qty-key'), Number(btn.getAttribute('data-delta')));
      });
    });

    body.querySelectorAll('[data-mode]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        orderMode = btn.getAttribute('data-mode');
        renderCartContents();
      });
    });

    document.getElementById('fv-place-order').addEventListener('click', function () {
      const nameInput = document.getElementById('fv-student-name');
      const rollInput = document.getElementById('fv-roll-no');
      const studentName = (nameInput.value || '').trim();
      const rollNo = (rollInput.value || '').trim();

      if (!studentName || !rollNo) {
        showToast('Please enter your Student Name & Roll No.');
        (!studentName ? nameInput : rollInput).focus();
        return;
      }

      const kitchenIds = Object.keys(grouped);
      const kitchens = kitchenIds.map(function (id) { return RESTAURANTS[id].name; });
      const itemsList = [];
      const kitchenTotals = {};
      kitchenIds.forEach(function (restId) {
        const restName = RESTAURANTS[restId].name;
        let kTotal = 0;
        grouped[restId].forEach(function (row) {
          const lineTotal = row.vInfo.price * row.qty;
          kTotal += lineTotal;
          itemsList.push({
            id: row.item.id,
            name: row.item.name,
            variantLabel: row.vInfo.label || '',
            qty: row.qty,
            price: row.vInfo.price,
            lineTotal: lineTotal,
            restaurantId: restId,
            restaurantName: restName
          });
        });
        kitchenTotals[restId] = kTotal;
      });

      const token = 'FV-' + Math.floor(1000 + Math.random() * 9000);
      const orderRecord = {
        token: token,
        studentName: studentName,
        rollNo: rollNo,
        mode: orderMode,
        location: document.getElementById('fv-location').value,
        slot: document.getElementById('fv-slot').value,
        kitchens: kitchens,
        kitchenIds: kitchenIds,
        kitchenTotals: kitchenTotals,
        items: itemsList,
        status: 'Pending',
        statusUpdatedAt: new Date().toISOString(),
        subtotal: subtotal,
        commission: commissionText,
        total: totalText,
        createdAt: new Date().toISOString()
      };
      checkoutDraft = { name: '', roll: '', locationByMode: {}, slotByMode: {} };

      const orders = loadOrders();
      orders.unshift(orderRecord);
      saveOrders(orders);
      syncOrderApi('POST', getApiPrefix() + 'api/orders', orderRecord);
      latestConfirmedOrder = orderRecord;
      cart = [];
      saveCart(cart);
      updateCartUI();
      renderCartContents();
      showToast('Order ' + token + ' confirmed!');
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* --------------------------------------------------------------------------
     Dish Card HTML Builder
     -------------------------------------------------------------------------- */
  function getDietaryMarkHtml(dietary) {
    if (dietary === 'nonveg') {
      return '<span class="nonveg-mark" title="Non-Vegetarian / Egg"></span>';
    }
    return '<span class="veg-mark" title="Vegetarian"></span>';
  }

  function createDishCardHtml(item, showRestaurantName) {
    const rest = RESTAURANTS[item.restaurantId];
    const vInfo = getVariantInfo(item, 0);
    const key = makeCartKey(item.id, 0);
    const entry = cart.find(function (c) { return (c.key || makeCartKey(c.id, c.variantIdx)) === key; });
    const addedClass = entry ? 'is-added' : '';
    const btnLabel = entry ? '<span>In Bag (' + entry.qty + ')</span><span>+</span>' : '<span>Add to Tray</span><span>+</span>';
    const tagsHtml = (item.tags || []).slice(0, 2).map(function (t) {
      return '<span class="dish-tag">' + t + '</span>';
    }).join('');

    let variantsHtml = '';
    if (Array.isArray(item.variants) && item.variants.length > 0) {
      variantsHtml = '<div class="variant-pills">' + item.variants.map(function (v, idx) {
        return '<button type="button" class="variant-pill ' + (idx === 0 ? 'is-active' : '') + '" data-variant-select="' + idx + '" data-item-id="' + item.id + '">' +
          v.label + ' &middot; ₹' + v.price + '</button>';
      }).join('') + '</div>';
    }

    const metaHtml = item.calories
      ? `<div class="dish-card__meta"><span>Prep: ${item.prepTime}</span><span>&bull;</span><span>${item.calories}</span></div>`
      : `<div class="dish-card__meta"><span>Prep: ${item.prepTime}</span></div>`;

    return `
      <article class="dish-card gs-reveal" data-dish-id="${item.id}">
        <div>
          <div class="dish-card__top">
            <span class="dish-card__restaurant">${showRestaurantName ? rest.name : item.category}</span>
            <div class="dish-badges">
              ${tagsHtml}
              <span class="dish-diet-slot">${getDietaryMarkHtml(vInfo.dietary)}</span>
            </div>
          </div>
          <h3 class="dish-card__title">${item.name}</h3>
          <p class="dish-card__desc">${item.description}</p>
          ${variantsHtml}
          ${metaHtml}
        </div>
        <div class="dish-card__bottom">
          <span class="dish-card__price" data-price-el>₹${vInfo.price}</span>
          <button type="button" class="add-btn ${addedClass}" data-add-id="${item.id}" data-variant-idx="0">
            ${btnLabel}
          </button>
        </div>
      </article>
    `;
  }

  function bindAddButtons(container) {
    const scope = container || document;
    scope.querySelectorAll('[data-add-id]').forEach(function (btn) {
      if (btn.dataset.bound === '1') return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', function () {
        addToCart(btn.getAttribute('data-add-id'), Number(btn.getAttribute('data-variant-idx')) || 0);
      });
    });

    scope.querySelectorAll('[data-variant-select]').forEach(function (pill) {
      if (pill.dataset.bound === '1') return;
      pill.dataset.bound = '1';
      pill.addEventListener('click', function () {
        const card = pill.closest('.dish-card');
        if (!card) return;
        const itemId = pill.getAttribute('data-item-id');
        const vIdx = Number(pill.getAttribute('data-variant-select')) || 0;
        const item = getItemById(itemId);
        if (!item) return;
        const vInfo = getVariantInfo(item, vIdx);

        card.querySelectorAll('[data-variant-select]').forEach(function (p) {
          p.classList.toggle('is-active', p === pill);
        });
        const priceEl = card.querySelector('[data-price-el]');
        if (priceEl) priceEl.textContent = '₹' + vInfo.price;

        const dietSlot = card.querySelector('.dish-diet-slot');
        if (dietSlot) dietSlot.innerHTML = getDietaryMarkHtml(vInfo.dietary);

        const addBtn = card.querySelector('[data-add-id]');
        if (addBtn) {
          addBtn.setAttribute('data-variant-idx', String(vIdx));
          updateCartUI();
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     GSAP + ScrollTrigger Motion System
     -------------------------------------------------------------------------- */
  function initScrollAnimations() {
    if (typeof global.gsap === 'undefined') return;
    const gsap = global.gsap;
    if (typeof global.ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(global.ScrollTrigger);
    }

    // 1. Top Scroll Progress Line
    const bar = document.getElementById('fv-scroll-bar');
    if (bar && typeof global.ScrollTrigger !== 'undefined') {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.25
        }
      });
    }

    // 2. Hero Entrance Stagger (keep visible immediately, animate subtle motion only)
    const heroEls = document.querySelectorAll('.gs-hero');
    if (heroEls.length > 0) {
      gsap.from(heroEls, {
        y: 16,
        duration: 0.65,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'transform'
      });
    }

    // 3. Vitrine / 3D Stage Entrance
    const vitrines = document.querySelectorAll('.gs-vitrine');
    if (vitrines.length > 0) {
      gsap.from(vitrines, {
        y: 14,
        scale: 0.985,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'transform'
      });
    }

    // 4. Infinite Editorial Marquee
    const marqueeTrack = document.querySelector('.editorial-strip__track');
    if (marqueeTrack) {
      gsap.to(marqueeTrack, {
        xPercent: -50,
        repeat: -1,
        duration: 28,
        ease: 'none'
      });
    }

    // 5. Hairline Draw Animations on Scroll
    document.querySelectorAll('.gs-line').forEach(function (line) {
      gsap.from(line, {
        scaleX: 0,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: line,
          start: 'top 92%',
          once: true
        }
      });
    });

    // 6. Scroll Reveal Cards & Sections + Sequential Story Chapters
    if (typeof global.ScrollTrigger !== 'undefined') {
      global.ScrollTrigger.batch('.gs-reveal', {
        start: 'top 92%',
        once: true,
        onEnter: function (batch) {
          gsap.from(batch, {
            y: 20,
            duration: 0.55,
            stagger: 0.05,
            ease: 'power2.out',
            clearProps: 'transform'
          });
        }
      });

      // 7. Sequential Story Chapters (Viewport-safe scrubbed reveal without fragile pin-spacers):
      //    Name stays visible -> Scroll unveils Picture -> Scroll brings Short Info
      document.querySelectorAll('.story-chapter').forEach(function (chapter) {
        const media = chapter.querySelector('.story-chapter__media');
        const img = chapter.querySelector('.story-chapter__img');
        const details = chapter.querySelector('.story-chapter__details');
        const progress = chapter.querySelector('.story-chapter__progress');

        if (progress) {
          gsap.fromTo(
            progress,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: chapter,
                start: 'top 88%',
                end: 'bottom 45%',
                scrub: 0.3
              }
            }
          );
        }

        if (media) {
          gsap.fromTo(
            media,
            { clipPath: 'inset(36% 0% 0% 0%)', y: 28, opacity: 0.25 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: chapter,
                start: 'top 84%',
                end: 'top 46%',
                scrub: 0.45
              }
            }
          );
        }

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.1 },
            {
              scale: 1.0,
              ease: 'none',
              scrollTrigger: {
                trigger: chapter,
                start: 'top 85%',
                end: 'bottom 25%',
                scrub: 0.5
              }
            }
          );
        }

        if (details) {
          gsap.fromTo(
            details,
            { opacity: 0.08, y: 34 },
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: chapter,
                start: 'top 66%',
                end: 'top 34%',
                scrub: 0.45
              }
            }
          );
        }
      });

      // Smooth anchor links without CSS scroll-behavior conflict
      document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
          const targetId = anchor.getAttribute('href');
          if (!targetId || targetId === '#') return;
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });

      // Refresh ScrollTrigger once images and async fonts settle
      window.addEventListener('load', function () {
        global.ScrollTrigger.refresh();
      });
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () {
          global.ScrollTrigger.refresh();
        });
      }
      setTimeout(function () {
        global.ScrollTrigger.refresh();
      }, 250);
    }
  }

  /**
   * Plain White / Black ASCII Burger Runner Preloader (Runs Left -> End -> Opens Page)
   */
  function initBurgerRunnerLoader() {
    const loader = document.getElementById('fv-loader');
    const preEl = document.getElementById('fv-runner-pre');
    if (!loader || !preEl) return;

    const TRACK_W = 54;
    const ROWS = 9;
    const START_X = 1;
    const END_X = 41;
    const DURATION_MS = 2400;
    const startTs = Date.now();
    let closed = false;
    let manualJumpUntil = 0;
    let intervalId = null;

    function triggerJump() {
      manualJumpUntil = Date.now() + 340;
    }

    function onKeyDown(e) {
      if (!closed && (e.code === 'Space' || e.code === 'ArrowUp')) {
        e.preventDefault();
        triggerJump();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    loader.addEventListener('click', triggerJump);

    function finishLoading() {
      if (closed) return;
      closed = true;
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener('keydown', onKeyDown);
      loader.removeEventListener('click', triggerJump);
      setTimeout(function () {
        loader.classList.add('is-opening');
        document.body.classList.remove('is-fv-loading');
        if (typeof global.ScrollTrigger !== 'undefined') {
          global.ScrollTrigger.refresh();
        }
        setTimeout(function () {
          loader.style.display = 'none';
        }, 580);
      }, 220);
    }

    function escapeHtml(ch) {
      if (ch === '<') return '&lt;';
      if (ch === '>') return '&gt;';
      if (ch === '&') return '&amp;';
      return ch;
    }

    function renderFrame() {
      if (closed) return;
      const nowTs = Date.now();
      const elapsed = Math.max(0, nowTs - startTs);
      const progress = Math.min(1, elapsed / DURATION_MS);
      const burgerX = Math.round(START_X + progress * (END_X - START_X));

      const grid = Array.from({ length: ROWS }, () => Array(TRACK_W).fill(' '));
      const colorMap = Array.from({ length: ROWS }, () => Array(TRACK_W).fill(''));

      function put(r, c, str, cls) {
        if (r < 0 || r >= ROWS) return;
        for (let i = 0; i < str.length; i++) {
          const cc = c + i;
          if (cc >= 0 && cc < TRACK_W) {
            grid[r][cc] = str[i];
            if (cls) colorMap[r][cc] = cls;
          }
        }
      }

      // Clean ground line (row 8)
      put(8, 0, '_'.repeat(TRACK_W), 'ac-track');

      // Finish flag at right end of track
      put(5, 49, '|>', 'ac-tomato');
      put(6, 49, '|',  'ac-ink');
      put(7, 49, '|',  'ac-ink');

      const isAirborne = nowTs < manualJumpUntil;
      const jumpOffset = isAirborne ? 2 : 0;
      const step = Math.floor(elapsed / 90) % 4;
      const strideHop = (!isAirborne && step % 2 === 1) ? 1 : 0;
      const feetRow = 7 - jumpOffset - strideHop;

      // Subtle trailing speed dust when sprinting
      if (progress < 0.96) {
        const dust = step % 2 === 0 ? '~ .' : '. ~';
        put(7, Math.max(0, burgerX - 4), dust, 'ac-steam');
      }

      // Reworked Cute Detailed Small Running ASCII Burger (6 rows, multi-color)
      put(feetRow - 5, burgerX, '  .---.  ', 'ac-bun');
      put(feetRow - 4, burgerX, ' /',        'ac-bun');
      put(feetRow - 4, burgerX + 2, '* . *',   'ac-sesame');
      put(feetRow - 4, burgerX + 7, '\\ ',     'ac-bun');
      put(feetRow - 3, burgerX, ' ~^~^~^~ ', 'ac-lettuce');
      put(feetRow - 2, burgerX, ' [=====] ', 'ac-patty');
      put(feetRow - 2, burgerX + 3, 'v',       'ac-cheddar');
      put(feetRow - 2, burgerX + 6, 'v',       'ac-tomato');
      put(feetRow - 1, burgerX, " `-===-' ", 'ac-bun');
      const legs = isAirborne
        ? '  <   >  '
        : ['   / \\   ', '   | \\   ', '   \\ /   ', '   / |   '][step];
      put(feetRow,     burgerX, legs,        'ac-ink');

      let html = '';
      for (let r = 0; r < ROWS; r++) {
        let lineHtml = '';
        let activeCls = '';
        for (let c = 0; c < TRACK_W; c++) {
          const cls = colorMap[r][c];
          if (cls !== activeCls) {
            if (activeCls) lineHtml += '</span>';
            if (cls) lineHtml += '<span class="' + cls + '">';
            activeCls = cls;
          }
          lineHtml += escapeHtml(grid[r][c]);
        }
        if (activeCls) lineHtml += '</span>';
        html += lineHtml + (r < ROWS - 1 ? '\n' : '');
      }
      preEl.innerHTML = html;

      if (progress >= 1) {
        finishLoading();
      }
    }

    renderFrame();
    intervalId = setInterval(renderFrame, 42);
  }

  global.FoodVerse = {
    RESTAURANTS: RESTAURANTS,
    MENU_ITEMS: MENU_ITEMS,
    renderSharedChrome: renderSharedChrome,
    createDishCardHtml: createDishCardHtml,
    bindAddButtons: bindAddButtons,
    updateCartUI: updateCartUI,
    addToCart: addToCart,
    openCart: openCart,
    initScrollAnimations: initScrollAnimations,
    initBurgerRunnerLoader: initBurgerRunnerLoader,
    getRootPrefix: getRootPrefix,
    getApiPrefix: getApiPrefix,
    isDarkMode: isDarkMode,
    toggleDarkMode: function () { applyTheme(!isDarkMode(), true); },
    loadOrders: loadOrders,
    saveOrders: saveOrders,
    fetchOrdersWithServerSync: fetchOrdersWithServerSync,
    updateOrderStatus: updateOrderStatus,
    clearOrdersStore: clearOrdersStore,
    syncOrderApi: syncOrderApi,
    orderChannel: orderChannel
  };
})(window);
