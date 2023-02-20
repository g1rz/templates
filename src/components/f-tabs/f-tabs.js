export default class FTabs {
  constructor(target) {
    this.elTabs = typeof target === 'string' ? document.querySelector(target) : target;
    this.elButtons = this.elTabs.querySelectorAll('.f-tabs__list-btn');
    this.elPanes = this.elTabs.querySelectorAll('.f-tabs__content-item');
  }

  setAttributeRoles() {
    this.elTabs.setAttribute('role', 'tablist');
    this.elButtons.forEach((el, index) => {
      el.dataset.index = index;
      el.setAttribute('role', 'tab');
      this.elPanes[index].setAttribute('role', 'tabpanel');
    });
  }

  show(elLinkTarget) {
    const elPaneTarget = this.elPanes[elLinkTarget.dataset.index];
    const elLinkActive = this.elTabs.querySelector('.f-tabs__list-btn--active');
    const elPaneShow = this.elTabs.querySelector('.f-tabs__content-item--active');
    if (elLinkTarget === elLinkActive) {
      return;
    }
    elLinkActive ? elLinkActive.classList.remove('f-tabs__list-btn--active') : null;
    elPaneShow ? elPaneShow.classList.remove('f-tabs__content-item--active') : null;
    elLinkTarget.classList.add('f-tabs__list-btn--active');
    elPaneTarget.classList.add('f-tabs__content-item--active');
    elLinkTarget.focus();

    this.emitEvent();
  }

  emitEvent() {
    this.elTabs.dispatchEvent(new Event('tab.itc.change'));
  }

  showByIndex(index) {
    const elLinkTarget = this.elButtons[index];
    elLinkTarget ? this.show(elLinkTarget) : null;
  }

  init() {
    this.setAttributeRoles();

    this.elTabs.addEventListener('click', (e) => {
      const target = e.target.closest('.f-tabs__list-btn');
      if (target) {
        e.preventDefault();
        this.show(target);
      }
    });
  }
}
