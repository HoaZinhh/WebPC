// js/product-gallery.js
document.addEventListener('DOMContentLoaded', function () {
  const mainImg = document.querySelector('.main-image');
  const thumbs = Array.from(document.querySelectorAll('.thumbnail-list img'));
  let currentIndex = 0;
  const intervalTime = 3000; // change every 3 seconds
  let timer;

  function showImage(index) {
    const thumb = thumbs[index];
    mainImg.src = thumb.src;
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    currentIndex = index;
  }

  function nextImage() {
    const nextIdx = (currentIndex + 1) % thumbs.length;
    showImage(nextIdx);
  }

  function startAuto() {
    timer = setInterval(nextImage, intervalTime);
  }

  function resetAuto() {
    clearInterval(timer);
    startAuto();
  }

  // initialize gallery
  thumbs.forEach((thumb, i) => {
    thumb.style.cursor = 'pointer';
    thumb.addEventListener('click', function () {
      showImage(i);
      resetAuto();
    });
  });

  if (thumbs.length === 0 || !mainImg) return;
  showImage(0);
  startAuto();
});

//Local Store
document.addEventListener('DOMContentLoaded', () => {
  const btnAdd = document.querySelector('.btn-add-cart');
  btnAdd.addEventListener('click', () => {
    const productId = 'lenovo1'; // hoặc từ data-id
    const title = document.querySelector('h1').textContent.trim();
    const priceText = document.querySelector('.price').textContent;
    // Xóa ký tự không không phải số/dấu chấm trước khi parse
    const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;

    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (cart[productId]) {
      cart[productId].qty += 1;
    } else {
      cart[productId] = { title, price, qty: 1 };
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Đã thêm vào giỏ hàng!');
  });
});
