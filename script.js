// Mock Data for Products
const products = [
  {
    id: 1,
    name: "Name",
    specs: "Specifications",
    price: "price",
    images: [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6fb6c?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1568702846914-960914cb7061?auto=format&fit=crop&q=80&w=400"
    ]
  },
  {
    id: 2, name: "Name", specs: "Specifications", price: "price",
    images: ["https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400"]
  },
  {
    id: 3, name: "Name", specs: "Specifications", price: "price",
    images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400"]
  },
  {
    id: 4, name: "Name", specs: "Specifications", price: "price",
    images: ["https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&q=80&w=400"]
  },
  {
    id: 5, name: "Name", specs: "Specifications", price: "price",
    images: ["https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400"]
  },
  {
    id: 6, name: "Name", specs: "Specifications", price: "price",
    images: ["https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&q=80&w=400"]
  },
  {
    id: 7, name: "Name", specs: "Specifications", price: "price",
    images: ["https://images.unsplash.com/photo-1590004953392-5aba2e72269a?auto=format&fit=crop&q=80&w=400"]
  },
  {
    id: 8, name: "Name", specs: "Specifications", price: "price",
    images: ["https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=400"]
  },
  {
    id: 9, name: "Name", specs: "Specifications", price: "price",
    images: ["https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=400"]
  },
  {
    id: 10, name: "Name", specs: "Specifications", price: "price",
    images: ["https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=400"]
  },
  {
    id: 11, name: "Name", specs: "Specifications", price: "price",
    images: ["https://images.unsplash.com/photo-1560806887-1e4cd0b6fb6c?auto=format&fit=crop&q=80&w=400"]
  },
  {
    id: 12, name: "Name", specs: "Specifications", price: "price",
    images: ["https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400"]
  }
];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const relatedGrid = document.getElementById('relatedGrid');
const mainImage = document.getElementById('mainImage');

let currentImageIndex = 0;
let currentProduct = null;

document.addEventListener('DOMContentLoaded', () => {
  if (productGrid) {
    renderProductGrid(products, productGrid);
  }

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId && document.querySelector('.product-details-container')) {
    loadProductDetails(parseInt(productId));
    if (relatedGrid) {
      // Show exactly 12 items to match 2x6 grid from wireframe
      renderProductGrid(products, relatedGrid);
    }
  }
});

function renderProductGrid(productsData, container) {
  container.innerHTML = ''; 

  productsData.forEach((product, index) => {
    const delay = index * 30;
    
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animation = `fadeIn 0.3s ease-out ${delay}ms both`;

    card.innerHTML = `
      <a href="product.html?id=${product.id}" style="display:flex; flex-direction:column; height: 100%;">
        <div class="card-image-wrap">
          <img src="${product.images[0]}" alt="photo" class="card-image" loading="lazy">
        </div>
        <div class="card-content">
          <div class="rating-text">rating</div>
          <h3 class="product-name">Name</h3>
          <p class="product-specs">Specifications</p>
          <div class="price">price</div>
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

  document.getElementById('pName').textContent = "Name";
  document.getElementById('pSpecs').textContent = "Specifications";
  
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
      <span class="v-qut">QUT</span>
      <span class="v-mrp">MRP</span>
    </button>
    <button class="v-btn">
      <span class="v-qut">QUT</span>
      <span class="v-mrp">MRP</span>
    </button>
  `;

  const vBtns = variantOptions.querySelectorAll('.v-btn');
  vBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      vBtns.forEach(b => b.style.borderColor = 'var(--border-color)');
      btn.style.borderColor = 'var(--primary-green)';
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
