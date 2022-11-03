import { instruments } from './card-items';

const STORAGE_KEY = 'product-to-basket';
const list = document.querySelector('.list-card');
const openModalBtn = document.querySelector('[data-modal-open]');
const basketList = document.querySelector('.list-basket');
const form = document.querySelector('.form');
const basket = [];

const markup = instruments
  .map(
    ({ id, img, name, price }) => ` <li class="card-item js-item" data-id=${id}>
    <img src = "${img}" alt = "${name}"/>
        <div class="disc"><h2 class="title">${name}</h2>
        <p>${price}</p>
        <button class="js-add-btn">Add</button>
        <button>Wish list</button></div>
      </li>`
  )
  .join('');

list.insertAdjacentHTML('beforeend', markup);

list.addEventListener('click', onItem);
openModalBtn.addEventListener('click', fillBasket);

function onItem(e) {
  if (e.target.classList.contains('js-add-btn')) {
    const currentProd = e.target.closest('.js-item');
    const currentId = Number(currentProd.dataset.id);
    const toBasket = instruments.find(({ id }) => id === currentId);

    const prodInBasket = basket.find(({ id }) => id === currentId);
    if (!prodInBasket) {
      toBasket.qty = 1;
      toBasket.totalSum = toBasket.price;
      basket.push(toBasket);
    } else {
      prodInBasket.qty += 1;
      prodInBasket.totalSum = prodInBasket.qty * prodInBasket.price;
    }
    // console.log(basket);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(basket));
    return;
  }
}

function fillBasket() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(savedData);
  if (!savedData) {
    return;
  } else {
    const markup = savedData
      .map(
        ({ img, name, qty, price }) => ` <li class="list-basket-item">
    <img src = "${img}" alt = "${name}" width="100"/>
        <h2 class="title">${name}</h2>
        <p>${qty} шт.</p>
        <p>${price}</p>
      </li>`
      )
      .join('');
    basketList.innerHTML = markup;
    const sum = savedData.reduce(
      (acc, data) => (acc += data.qty * data.price),
      0
    );
    console.log(sum);
    form.innerHTML = `<p>Сума до сплати: ${sum}</p>
          <button>Сплатити</button>`;
  }
}
