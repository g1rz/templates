class FPopup {
  constructor(link) {
    this._link = document.querySelector(link);
    this._currentPopup = this._findPopup();
    this.init();
  }
  _findPopup() {
    const id = this._link.getAttribute('href');
    const popup = document.querySelector(id);
    return popup;
  }
  _addFadeSubstrate() {
    const element = document.createElement('div');
    element.classList.add('f-popup__fade');
    document.body.appendChild(element);
  }
  _deleteFadeSubstrate() {
    const substrate = document.querySelector('.f-popup__fade');
    if (substrate) {
      substrate.parentNode.removeChild(substrate);
    }
  }
  _openPopup() {
    this._link.addEventListener('click', (e) => {
      e.preventDefault();
      this._currentPopup.classList.add('f-popup--active');
      this._addFadeSubstrate();
      document.body.style.overflow = 'hidden';
    });
  }
  _closePopup() {
    const closeBtn = this._currentPopup.querySelector('.f-popup__close');
    closeBtn.addEventListener('click', () => {
      this._currentPopup.classList.remove('f-popup--active');
      this._deleteFadeSubstrate();
      document.body.style.overflow = '';
    });

    document.addEventListener('mouseup', (evt) => {
      const substract = document.querySelector('.f-popup__fade');
      if (substract && evt.target === substract) {
        this._currentPopup.classList.remove('f-popup--active');
        this._deleteFadeSubstrate();
        document.body.style.overflow = '';
      }
    });
  }
  init() {
    this._openPopup();
    this._closePopup();
  }
}

new FPopup('.open-popup');
