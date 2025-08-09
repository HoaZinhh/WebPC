//Local Store
document.addEventListener('DOMContentLoaded', () => {
  const btnAdd = document.querySelector('.btn-add-cart');
  if (!btnAdd) return;

  // Hàm xử lý khi bấm thêm sản phẩm
  function handleAddToCart() {
    const productId = document.querySelector('[data-product-id]')?.dataset.productId || 'lenovo1';
    const title = document.querySelector('h1')?.textContent.trim() || 'Sản phẩm';
    const priceText = document.querySelector('.price')?.textContent || '0';
    const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;

    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (cart[productId]) {
      cart[productId].qty = (Number(cart[productId].qty) || 0) + 1;
    } else {
      cart[productId] = { title, price, qty: 1 };
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.updateCartCount?.();
    alert('Đã thêm vào giỏ hàng!');
  }

  // Xóa handler cũ (nếu có), rồi gán mới Chính xác chỉ 1 lần
  btnAdd.replaceWith(btnAdd.cloneNode(true));
  const newBtn = document.querySelector('.btn-add-cart');
  newBtn.addEventListener('click', handleAddToCart);
});

