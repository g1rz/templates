export default class FPopup {
  #closeIcons = document.querySelectorAll('.f-popup__close');
  #unlock = true;
  #timeout = 300;

  constructor(link) {
    this.links = document.querySelectorAll(link);
  }

  #openPopup(currentPopup) {
    if (currentPopup && this.#unlock) {
      const popupActive = document.querySelector('.f-popup.f-popup--active');
      if (popupActive) {
        this.#closePopup(popupActive, false);
      } else {
        this.#bodyLock();
      }
      currentPopup.classList.add('f-popup--active');
      currentPopup.addEventListener('click', (e) => {
        if (!e.target.closest('.f-popup__content')) {
          this.#closePopup(e.target.closest('.f-popup'));
        }
      });
    }
  }

  #closePopup(popupActive, doUnlock = true) {
    if (this.#unlock) {
      popupActive.classList.remove('f-popup--active');
      if (doUnlock) {
        this.#bodyUnlock();
      }
    }
  }

  #bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.page-body').offsetWidth + 'px';
    document.body.style.paddingRight = lockPaddingValue;
    document.body.classList.add('page-body--hidden');

    this.#unlock = false;
    setTimeout(() => {
      this.#unlock = true;
    }, this.#timeout);
  }

  #bodyUnlock() {
    setTimeout(() => {
      document.body.style.paddingRight = '0px';
      document.body.classList.remove('page-body--hidden');

      this.#unlock = false;
      setTimeout(() => {
        this.#unlock = true;
      }, this.#timeout);
    }, this.#timeout);
  }

  init() {
    if (this.links.length > 0) {
      this.links.forEach((item) => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const popupName = item.getAttribute('href');
          const currentPopup = document.querySelector(popupName);
          this.#openPopup(currentPopup);
        });
      });
    }

    if (this.#closeIcons.length > 0) {
      this.#closeIcons.forEach((item) => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          this.#closePopup(item.closest('.f-popup'));
        });
      });
    }
  }
}
