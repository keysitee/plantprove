const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const bag = [];

menuToggle.addEventListener('click', () => {
  const open = body.classList.toggle('menu-is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});

document.querySelectorAll('#mobile-nav a').forEach((link) => link.addEventListener('click', () => body.classList.remove('menu-is-open')));

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.product-card').forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

function renderBag() {
  document.querySelector('#bag-count').textContent = bag.length;
  const items = document.querySelector('#bag-items');
  items.innerHTML = bag.length ? bag.map((item) => `<div class="bag-line"><span>${item.name}</span><strong>$${item.price}</strong></div>`).join('') : '<p>Your bag is waiting for something green.</p>';
  document.querySelector('#bag-total').textContent = `$${bag.reduce((sum, item) => sum + item.price, 0)}`;
}

document.querySelectorAll('.add-item').forEach((button) => button.addEventListener('click', () => {
  bag.push({ name: button.dataset.product, price: Number(button.dataset.price) });
  renderBag();
  body.classList.add('panel-open');
}));

document.querySelector('[data-open-bag]').addEventListener('click', () => body.classList.add('panel-open'));
document.querySelectorAll('[data-open-booking]').forEach((button) => button.addEventListener('click', () => {
  body.classList.remove('menu-is-open');
  body.classList.add('booking-open');
}));
document.querySelectorAll('[data-close-panels], .overlay').forEach((button) => button.addEventListener('click', () => body.classList.remove('panel-open', 'booking-open')));

document.querySelector('#booking-form').addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.hidden = true;
  document.querySelector('.booking-success').hidden = false;
});

renderBag();
