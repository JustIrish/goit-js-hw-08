(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    body: document.querySelector('body'),
    backdrop: document.querySelector('.backdrop'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);
  refs.backdrop.addEventListener('click', onBackdropClick);

  function toggleModal() {
    window.addEventListener('keydown', onEscPress);
    refs.modal.classList.toggle('is-hidden');
    refs.body.classList.toggle('no-scroll');
    if (refs.modal.classList.contains('is-hidden')) {
      window.removeEventListener('keydown', onEscPress);
    }
  }

  function onBackdropClick(evt) {
    if (evt.currentTarget === evt.target) {
      toggleModal();
    }
  }

  function onEscPress(evt) {
    if (evt.key === 'Escape') {
      toggleModal();
    }
  }
})();
