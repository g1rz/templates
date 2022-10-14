export default class FAccordeon {
  constructor(target, config) {
    this._el = typeof target === 'string' ? document.querySelectorAll(target) : target;
    const defaultConfig = {
      alwaysOpen: true,
      duration: 350
    };
    this._config = Object.assign(defaultConfig, config);
    this.init();
  }
  addEventListener(item) {
    item.addEventListener('click', (e) => {
      const elHeader = e.target.closest('.f-accordeon__header');
      if (!elHeader) {
        return;
      }
      if (!this._config.alwaysOpen) {
        item.querySelectorAll('.f-accordeon__item--show').forEach((el) => {
          if (el.contains(elHeader.parentElement)) {
            return;
          }
          el !== elHeader.parentElement ? this.toggle(el) : null;
        });
      }
      this.toggle(elHeader.parentElement);
    });
  }
  show(el) {
    const elBody = el.querySelector('.f-accordeon__body');
    if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
      return;
    }
    elBody.style.display = 'block';
    const height = elBody.offsetHeight;
    elBody.style.height = 0;
    elBody.style.overflow = 'hidden';
    elBody.style.transition = `height ${this._config.duration}ms ease`;
    elBody.classList.add('collapsing');
    el.classList.add('f-accordeon__item--slidedown');
    elBody.offsetHeight;
    elBody.style.height = `${height}px`;
    window.setTimeout(() => {
      elBody.classList.remove('collapsing');
      el.classList.remove('f-accordeon__item--slidedown');
      elBody.classList.add('collapse');
      el.classList.add('f-accordeon__item--show');
      elBody.style.display = '';
      elBody.style.height = '';
      elBody.style.transition = '';
      elBody.style.overflow = '';
    }, this._config.duration);
  }
  hide(el) {
    const elBody = el.querySelector('.f-accordeon__body');
    if (elBody.classList.contains('collapsing') || !el.classList.contains('f-accordeon__item--show')) {
      return;
    }
    elBody.style.height = `${elBody.offsetHeight}px`;
    elBody.offsetHeight;
    elBody.style.display = 'block';
    elBody.style.height = 0;
    elBody.style.overflow = 'hidden';
    elBody.style.transition = `height ${this._config.duration}ms ease`;
    elBody.classList.remove('collapse');
    el.classList.remove('f-accordeon__item--show');
    elBody.classList.add('collapsing');
    window.setTimeout(() => {
      elBody.classList.remove('collapsing');
      elBody.classList.add('collapse');
      elBody.style.display = '';
      elBody.style.height = '';
      elBody.style.transition = '';
      elBody.style.overflow = '';
    }, this._config.duration);
  }
  toggle(el) {
    el.classList.contains('f-accordeon__item--show') ? this.hide(el) : this.show(el);
  }
  init() {
    this._el.forEach((item) => {
      this.addEventListener(item);
    });
  }
}
