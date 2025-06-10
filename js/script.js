
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
let total = 0;

// Fonction pour ajouter un article au panier
function addToCart(name, price) {
  const item = document.createElement('div');
  item.classList.add('cart-item');
  item.style.margin = '20px 0';
  item.innerHTML = `
    <strong>${name}</strong> - <span class="item-price">${price}f</span>
    <div>
      <button class="minus">-</button>
      <span class="quantity">1</span>
      <button class="plus">+</button>
      <button class="delete" style="color:red">🗑️</button>
      <button class="heart" style="color:grey">❤️</button>
    </div>
  `;
  cartItemsContainer.appendChild(item);

  updateTotal();

  item.querySelector('.plus').addEventListener('click', () => {
    const quantitySpan = item.querySelector('.quantity');
    quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
    updateTotal();
  });

  item.querySelector('.minus').addEventListener('click', () => {
    const quantitySpan = item.querySelector('.quantity');
    let qty = parseInt(quantitySpan.textContent);
    if (qty > 1) {
      quantitySpan.textContent = qty - 1;
      updateTotal();
    }
  });

  item.querySelector('.delete').addEventListener('click', () => {
    item.remove();
    updateTotal();
  });

  item.querySelector('.heart').addEventListener('click', (e) => {
    const btn = e.target;
    btn.style.color = btn.style.color === 'red' ? 'grey' : 'red';
  });
}

// Fonction pour mettre à jour le total
function updateTotal() {
  const items = document.querySelectorAll('.cart-item');
  let sum = 0;
  items.forEach(item => {
    const price = parseInt(item.querySelector('.item-price').textContent);
    const qty = parseInt(item.querySelector('.quantity').textContent);
    sum += price * qty;
  });
  totalPriceElement.textContent = `${sum}f`;
}

// Lier tous les boutons "acheter"
document.querySelectorAll('#btn3 button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const name = card.querySelector('h3').textContent;
    const priceText = card.querySelector('.card-text').textContent;
    const price = parseInt(priceText);
    addToCart(name, price);
  });
});

