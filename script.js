// Mock Data for Products
const products = [
  // --- Vegetables ---
  { id: 1, category: 'vegetables', name: "Beetroot (Beet)", specs: "500 g", price: "₹45", images: ["../project ASSETS/vegetables/Beetroot.jpg"] },
  { id: 2, category: 'vegetables', name: "Bottle Gourd (Dudhi Bhopla)", specs: "1 pc", price: "₹35", images: ["../project ASSETS/vegetables/bhopla.jpg"] },
  { id: 3, category: 'vegetables', name: "Striped Brinjal (Vangi)", specs: "500 g", price: "₹40", images: ["../project ASSETS/vegetables/Brinjal.jpg"] },
  { id: 4, category: 'vegetables', name: "Long Brinjal (Vangi)", specs: "500 g", price: "₹38", images: ["../project ASSETS/vegetables/Brinjal.png"] },
  { id: 5, category: 'vegetables', name: "Cabbage (Kobi)", specs: "1 pc", price: "₹30", images: ["../project ASSETS/vegetables/Cabbage.jpg"] },
  { id: 6, category: 'vegetables', name: "Chilli (Mirchi)", specs: "200 g", price: "₹20", images: ["../project ASSETS/vegetables/CHILLI.jpg"] },
  { id: 7, category: 'vegetables', name: "Okra (Bhendi)", specs: "500 g", price: "₹40", images: ["../project ASSETS/vegetables/Okra.jpg"] },
  { id: 8, category: 'vegetables', name: "Potato (Batata)", specs: "1 kg", price: "₹30", images: ["../project ASSETS/vegetables/Potato.jpg"] },
  { id: 9, category: 'vegetables', name: "Tomato (Tamatar/Belati)", specs: "1 kg", price: "₹40", images: ["../project ASSETS/vegetables/Tomato.jpg"] },
  { id: 10, category: 'vegetables', name: "Cauliflower (Phul Gobi)", specs: "1 pc", price: "₹35", images: ["../project ASSETS/vegetables/cauliflower.jpg"] },
  { id: 25, category: 'vegetables', name: "Carrot (Gajar)", specs: "500 g", price: "₹30", images: ["../project ASSETS/vegetables/carrot.jpg"] },
  { id: 26, category: 'vegetables', name: "Onion (Kanda)", specs: "1 kg", price: "₹45", images: ["../project ASSETS/vegetables/onion.jpg"] },
  { id: 27, category: 'vegetables', name: "Lemon (Limbu)", specs: "5 pcs", price: "₹20", images: ["../project ASSETS/vegetables/lemon.jpg"] },
  { id: 28, category: 'vegetables', name: "Ivy Gourd (Tondli)", specs: "250 g", price: "₹25", images: ["../project ASSETS/vegetables/tondali.jpg"] },
  { id: 29, category: 'vegetables', name: "Ginger (Aale)", specs: "100 g", price: "₹15", images: ["../project ASSETS/vegetables/ginger.jpg"] },

  
  // --- Exotic Vegetables ---
  { id: 11, category: 'exotic', name: "Broccoli (Broccoli)", specs: "1 pc", price: "₹80", images: ["../project ASSETS/exotic vegetables/broccoli.jpg"] },
  { id: 12, category: 'exotic', name: "Zucchini (Zuccini)", specs: "500 g", price: "₹90", images: ["../project ASSETS/exotic vegetables/zucchini.jpg"] },
  { id: 13, category: 'exotic', name: "Red/Yellow Capsicum (Dhobli Mirchi)", specs: "2 pcs", price: "₹120", images: ["../project ASSETS/exotic vegetables/rednyellowcapsicum.jpg"] },
  { id: 14, category: 'exotic', name: "Iceberg Lettuce (Lettuce)", specs: "1 pc", price: "₹70", images: ["../project ASSETS/exotic vegetables/iceburg.jpg"] },
  { id: 15, category: 'exotic', name: "Red Cabbage (Lal Kobi)", specs: "1 pc", price: "₹65", images: ["../project ASSETS/exotic vegetables/redcabbage.jpg"] },
  { id: 16, category: 'exotic', name: "English Cucumber (Kakdi)", specs: "500 g", price: "₹55", images: ["../project ASSETS/exotic vegetables/englishcucumber.jpg"] },
  { id: 17, category: 'exotic', name: "Khira Cucumber (Gavran Kakdi)", specs: "500 g", price: "₹45", images: ["../project ASSETS/exotic vegetables/khiracucumber.jpg"] },
  
  // --- Fruits ---
  { id: 18, category: 'fruits', name: "Watermelon (Kalingad)", specs: "1 pc", price: "₹80", images: ["../project ASSETS/fruits/Watermelon.jpg"] },
  { id: 19, category: 'fruits', name: "Muskmelon (Kharbuj)", specs: "1 pc", price: "₹70", images: ["../project ASSETS/fruits/Muskmelon.jpg"] },
  { id: 20, category: 'fruits', name: "Guava (Peru)", specs: "500 g", price: "₹60", images: ["../project ASSETS/fruits/guava.jpg"] },
  { id: 21, category: 'fruits', name: "Banana (Kele)", specs: "1 Dozen", price: "₹50", images: ["../project ASSETS/fruits/banana.jpg"] },
  { id: 22, category: 'fruits', name: "Pomegranate (Dalimb)", specs: "500 g", price: "₹120", images: ["../project ASSETS/fruits/pomegrante.jpg"] },
  { id: 23, category: 'fruits', name: "Papaya (Papai)", specs: "1 pc", price: "₹60", images: ["../project ASSETS/fruits/papaya.jpg"] },
  { id: 24, category: 'fruits', name: "Mosambi (Mosambi)", specs: "1 kg", price: "₹90", images: ["../project ASSETS/fruits/Mosambi.png"] }
];

let currentCategory = 'vegetables';
let currentProduct = null;
let currentImageIndex = 0;

// DOM Elements
const productGrid = document.getElementById('productGrid');
const relatedGrid = document.getElementById('relatedGrid');
const mainImage = document.getElementById('mainImage');
const categoryTabs = document.querySelectorAll('.cat-tab');

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('theme-' + currentCategory);

  if (productGrid) {
    const filteredProducts = products.filter(p => p.category === currentCategory);
    renderProductGrid(filteredProducts, productGrid);
  }

  if (categoryTabs.length > 0) {
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        if (tab.dataset.category === currentCategory) return;
        switchCategory(tab.dataset.category, tab);
      });
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId && document.querySelector('.product-details-container')) {
    loadProductDetails(parseInt(productId));
    if (relatedGrid && currentProduct) {
      // Show products of SAME category
      const relatedProducts = products.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id).slice(0, 12);
      renderProductGrid(relatedProducts, relatedGrid);
    }
  }
});

function switchCategory(newCategory, activeTabElement) {
  categoryTabs.forEach(t => t.classList.remove('active'));
  activeTabElement.classList.add('active');

  const categoriesMap = { 'vegetables': 0, 'exotic': 1, 'fruits': 2 };
  const oldIndex = categoriesMap[currentCategory];
  const newIndex = categoriesMap[newCategory];
  
  const isMovingRight = newIndex > oldIndex;
  productGrid.classList.add(isMovingRight ? 'slide-out-left' : 'slide-out-right');

  document.body.classList.remove('theme-vegetables', 'theme-exotic', 'theme-fruits');
  document.body.classList.add('theme-' + newCategory);

  setTimeout(() => {
    currentCategory = newCategory;
    const filteredProducts = products.filter(p => p.category === currentCategory);
    renderProductGrid(filteredProducts, productGrid);

    productGrid.classList.remove('slide-out-left', 'slide-out-right');
    productGrid.classList.add(isMovingRight ? 'slide-in-right' : 'slide-in-left');
    
    setTimeout(() => {
      productGrid.classList.remove('slide-in-right', 'slide-in-left');
    }, 400);

  }, 150);
}

function renderProductGrid(productsData, container) {
  container.innerHTML = ''; 
  productsData.forEach((product, index) => {
    const delay = Math.min(index * 20, 300); 
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animation = `fadeIn 0.3s ease-out ${delay}ms both`;

    card.innerHTML = `
      <a href="product.html?id=${product.id}" style="display:flex; flex-direction:column; height: 100%;">
        <div class="card-image-wrap">
          <img src="${product.images[0]}" alt="${product.name}" class="card-image" loading="lazy">
        </div>
        <div class="card-content">
          <div class="rating-text">4.5 ★</div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-specs">${product.specs}</p>
          <div class="price">${product.price}</div>
          <button class="btn-add" onclick="event.preventDefault(); alert('Added to cart!')">ADD TO CART</button>
        </div>
      </a>
    `;
    container.appendChild(card);
  });
}

function loadProductDetails(id) {
  currentProduct = products.find(p => p.id === id) || products[0];
  currentImageIndex = 0;

  document.body.classList.remove('theme-vegetables', 'theme-exotic', 'theme-fruits');
  document.body.classList.add('theme-' + currentProduct.category);

  document.getElementById('pName').textContent = currentProduct.name;
  document.getElementById('pSpecs').textContent = currentProduct.specs;
  
  // Update price in details if the element exists
  const priceElement = document.querySelector('.details-title + .price');
  if (priceElement) priceElement.textContent = currentProduct.price;
  
  updateMainImage();

  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  
  if (currentProduct.images.length > 1) {
    btnPrev.style.display = 'flex';
    btnNext.style.display = 'flex';
  } else {
    btnPrev.style.display = 'none';
    btnNext.style.display = 'none';
  }

  const variantOptions = document.getElementById('variantOptions');
  variantOptions.innerHTML = `
    <button class="v-btn">
      <span class="v-qut">${currentProduct.specs}</span>
      <span class="v-mrp">${currentProduct.price}</span>
    </button>
    <button class="v-btn">
      <span class="v-qut">Bulk</span>
      <span class="v-mrp">Check</span>
    </button>
  `;

  const vBtns = variantOptions.querySelectorAll('.v-btn');
  vBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      vBtns.forEach(b => b.style.borderColor = 'var(--border-color)');
      btn.style.borderColor = 'var(--theme-primary)';
    });
  });
}

function updateMainImage() {
  if (!mainImage || !currentProduct) return;
  mainImage.style.opacity = '0';
  setTimeout(() => {
    mainImage.src = currentProduct.images[currentImageIndex];
    mainImage.style.opacity = '1';
  }, 150);
}

window.prevImage = function() {
  if (!currentProduct) return;
  currentImageIndex--;
  if (currentImageIndex < 0) currentImageIndex = currentProduct.images.length - 1;
  updateMainImage();
};

window.nextImage = function() {
  if (!currentProduct) return;
  currentImageIndex++;
  if (currentImageIndex >= currentProduct.images.length) currentImageIndex = 0;
  updateMainImage();
};
