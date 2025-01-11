const slides = document.querySelectorAll(".slide"); 
const tl = gsap.timeline({ repeat: -1 }); 

slides.forEach((slide, index) => {
  tl.to(slide, {
    opacity: 1,
    duration: 1, 
    delay:0.1, 
  })
  .to(slide, {
    opacity: 0,
    duration: 1,
    delay:1, 
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-wishlist');
    if (buttons) {
      buttons.forEach(button => {
        button.addEventListener('click', (e) => {
          const productId = e.target.dataset.id;
          console.log('Product ID:', productId);
          addToWishlist(productId);
        });
      });
    } else {
      console.error('Buttons not found!');
    }
    const wishlistContainer = document.querySelector('.wishlist-container');
    function addToWishlist(productId) {
      fetch('http://localhost:3000/products')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (!wishlistContainer) {
            console.error('Wishlist container not found');
          }
          data.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('wishlist-item');
            itemElement.innerHTML = `
             <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
             <div class="feature col">
            <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
              <img src="/imgs/${item.product_name}.webp" alt="default"  width="250"></div>
              <div class="pro">
              <div class="front">
               <h4 class="fs-2 text-body-emphasis">${item.product_name}</h4>
                <li><ul>Price: ${item.price}</ul>
                <ul>Stock: ${item.quantity}</ul></li></div>
                <div class="back">
                <button>Remove <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg> </button></div>
              </div></div></div>
            `;
            wishlistContainer.appendChild(itemElement);
          });
        })
        .catch(err => {
          console.error('Error adding to wishlist:', err);
          alert('Failed to add product to wishlist. Please try again.');
        });
    }
  });
document.addEventListener("DOMContentLoaded", () => {
    const but = document.querySelectorAll('.add-to-cart');
    if (but) {
      but.forEach(button => {
        button.addEventListener('click', (e) => {
          const productId = e.target.dataset.id;
          console.log('Product ID:', productId);
          addToCart(productId);
        });
      });
    } else {
      console.error('Buttons not found!');
    }
    const cartContainer = document.querySelector('.cart-container');
    function addToCart(productId) {
      fetch('http://localhost:3000/products')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (!cartContainer) {
            console.error('Wishlist container not found');
          }
          data.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
             <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
             <div class="feature col">
            <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
              <img src="/imgs/${item.product_name}.webp" alt="default"  width="250"></div>
              <div class="pro">
              <div class="front">
               <h4 class="fs-2 text-body-emphasis">${item.product_name}</h4>
                <li><ul>Price: ${item.price}</ul>
                <ul>Stock: ${item.quantity}</ul></li></div>
                <div class="back">
                <button>Remove <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg> </button> </div>
              </div></div></div>
            `;
            cartContainer.appendChild(itemElement);
          });
        })
        .catch(err => {
          console.error('Error adding to wishlist:', err);
          alert('Failed to add product to wishlist. Please try again.');
        });
    }

  });
  