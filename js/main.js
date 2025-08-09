//Cart count
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  let totalQty = 0;
  for (const id in cart) {
    totalQty += cart[id].qty;
  }
  const badgeEl = document.querySelector('.cart-count');
  if (badgeEl) {
    badgeEl.textContent = totalQty;
  }
}
