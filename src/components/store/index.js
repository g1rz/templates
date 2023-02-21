class SingletonStore {
  #PAGES = {
    main: 0,
  };

  constructor() {
    if (typeof SingletonStore.instance === 'object') {
      return SingletonStore.instance;
    }
    SingletonStore.instance = this;
    return SingletonStore.instance;
  }

  getSingleton() {
    return this.#PAGES;
  }

  incSingleton(page) {
    this.#PAGES[page]++;
  }
}

export default SingletonStore;
