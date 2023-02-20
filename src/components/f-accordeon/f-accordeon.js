export default class FAccordeon {
  defaultConfig = {
    alwaysOpen: true,
    duration: 350
  };

  constructor(target, config) {
    this.accordion = typeof target === 'string' ? document.querySelector(target) : target;
    this.config = Object.assign(this.defaultConfig, config);
  }
  addEventListener(item) {
    item.addEventListener('click', (e) => {
      const header = e.target.closest('.f-accordeon__header');
      if (!header) {
        return;
      }
      if (!this.config.alwaysOpen) {
        item.querySelectorAll('.f-accordeon__item--show').forEach((el) => {
          if (el.contains(header.parentElement)) {
            return;
          }
          el !== header.parentElement ? this.toggle(el) : null;
        });
      }
      this.toggle(header.parentElement);
    });
  }
  show(el) {
    const body = el.querySelector('.f-accordeon__body');
    if (body.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
      return;
    }
    body.style.display = 'block';
    const height = body.offsetHeight;
    body.style.height = 0;
    body.style.overflow = 'hidden';
    body.style.transition = `height ${this.config.duration}ms ease`;
    body.classList.add('collapsing');
    el.classList.add('f-accordeon__item--slidedown');
    body.offsetHeight;
    body.style.height = `${height}px`;
    window.setTimeout(() => {
      body.classList.remove('collapsing');
      el.classList.remove('f-accordeon__item--slidedown');
      body.classList.add('collapse');
      el.classList.add('f-accordeon__item--show');
      body.style.display = '';
      body.style.height = '';
      body.style.transition = '';
      body.style.overflow = '';
    }, this.config.duration);
  }
  hide(el) {
    const body = el.querySelector('.f-accordeon__body');
    if (body.classList.contains('collapsing') || !el.classList.contains('f-accordeon__item--show')) {
      return;
    }
    body.style.height = `${body.offsetHeight}px`;
    body.offsetHeight;
    body.style.display = 'block';
    body.style.height = 0;
    body.style.overflow = 'hidden';
    body.style.transition = `height ${this.config.duration}ms ease`;
    body.classList.remove('collapse');
    el.classList.remove('f-accordeon__item--show');
    body.classList.add('collapsing');
    window.setTimeout(() => {
      body.classList.remove('collapsing');
      body.classList.add('collapse');
      body.style.display = '';
      body.style.height = '';
      body.style.transition = '';
      body.style.overflow = '';
    }, this.config.duration);
  }
  toggle(el) {
    el.classList.contains('f-accordeon__item--show') ? this.hide(el) : this.show(el);
  }
  init() {
    this.accordion.forEach((item) => {
      this.addEventListener(item);
    });
  }
}
