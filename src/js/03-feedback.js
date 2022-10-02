const throttle = require('lodash.throttle');

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(handleInput, 500));
form.addEventListener('submit', onFormSubmit);
fillFormField();

const data = {};

function handleInput(evt) {
  data[evt.target.name] = evt.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
  }
}

function fillFormField() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    form.elements.email.value = savedData.email;
    form.elements.message.value = savedData.message;
  }
}
