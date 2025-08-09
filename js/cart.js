// js/cart.js
document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  const tbody = document.querySelector('.cart-table tbody');
  const totalElem = document.querySelector('.cart-summary p strong');

  function parseCurrency(str) {
    const cleaned = str.replace(/[^0-9.\-]/g, '');
    const val = parseFloat(cleaned) || 0;
    return val;
  }

  function renderCart() {
    tbody.innerHTML = '';
    let total = 0;

    for (const id in cart) {
      const item = cart[id];
      console.log('Item price raw:', item.price); // Debug raw value
      const price = parseCurrency(item.price.toString());
      console.log('Parsed price:', price);

      const lineTotal = price * item.qty;
      total += lineTotal;

      const tr = document.createElement('tr');
      tr.setAttribute('data-id', id);
      tr.innerHTML = `
        <td data-label="Sản phẩm">${item.title}</td>
        <td data-label="Giá">${price.toLocaleString()}₫</td>
        <td data-label="Số lượng"><input type="number" min="1" value="${item.qty}"></td>
        <td data-label="Tổng">${lineTotal.toLocaleString()}₫</td>
        <td><button class="btn-remove">X</button></td>
      `;
      tbody.appendChild(tr);
    }

    totalElem.textContent = `Tạm tính: ${total.toLocaleString()}₫`;
  }

  tbody.addEventListener('input', e => {
    if (e.target.matches('input[type="number"]')) {
      const tr = e.target.closest('tr');
      const id = tr.getAttribute('data-id');
      const newQty = parseInt(e.target.value) || 1;
      cart[id].qty = newQty;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  });

  tbody.addEventListener('click', e => {
    if (e.target.matches('.btn-remove')) {
      const tr = e.target.closest('tr');
      const id = tr.getAttribute('data-id');
      delete cart[id];
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  });

  renderCart();
});
