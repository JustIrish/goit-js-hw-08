const throttle = require('lodash.throttle');

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(handleInput, 500));
form.addEventListener('submit', onFormSubmit);
fillFormField();

let data = {};

function handleInput(evt) {
  data[evt.target.name] = evt.target.value.trim();

  checkData(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function checkData(obj) {
  if (!obj?.email) {
    obj.email = form.elements.email.value;
  }
  if (!obj?.message) {
    obj.message = form.elements.message.value.trim();
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!savedData?.email || !savedData.message) {
    alert('All fields must be filled!!!');
  } else {
    console.log(savedData);
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    data = {};
  }
}

function fillFormField() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData?.email) {
    form.elements.email.value = savedData.email;
  }

  if (savedData?.message) {
    form.elements.message.value = savedData.message;
  }
}
