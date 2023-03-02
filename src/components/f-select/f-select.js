export default class FSelect {
  constructor(select) {
    this.selectsAll = document.querySelectorAll(select);
  }

  clickOnSelect(head, body) {
    head.addEventListener('click', () => {
      head.classList.toggle('f-select__head--active');
      body.classList.toggle('f-select__body--active');
    });
  }

  setCheckedName(select, title, head) {
    const labels = select.querySelectorAll('.f-select__item');
    labels.forEach((item) => {
      item.addEventListener('click', () => {
        setTimeout(() => {
          let checkedInput = select.querySelectorAll('.f-select__input:checked');
          let nameCheckedInput = [];
          checkedInput.forEach((value) => {
            nameCheckedInput.push(value.getAttribute('data-value'));
          });
          if (nameCheckedInput.length <= 0) {
            title.textContent = head.getAttribute('title');
          } else {
            title.textContent = nameCheckedInput.join(' / ');
          }
        }, 100);
      });
    });
  }

  closeAnyClick(head, body, title) {
    document.addEventListener('mouseup', (event) => {
      if (event.target != body && event.target != head && event.target != title) {
        if (event.target.classList.contains('f-select__label')) {
          return;
        } else {
          body.classList.remove('f-select__body--active');
          head.classList.remove('f-select__head--active');
        }
      }
    });
  }
  init() {
    if (this.selectsAll.length === 0) 
      return;

    this.selectsAll.forEach(el => {
      const head = el.querySelector('.f-select__head');
      const body = el.querySelector('.f-select__body');
      const title = el.querySelector('.f-select__title');

      this.clickOnSelect(head, body);
      this.setCheckedName(el, title, head);
      this.closeAnyClick(head, body, title);
    })
    console.log(this.selectsAll);
  }
}
