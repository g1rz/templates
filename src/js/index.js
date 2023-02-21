import ftabs from '../components/f-tabs/f-tabs.js';
import fpopup from '../components/f-popup/f-popup.js';
import fselect from '../components/f-select/f-select.js';
import SingletonStore from '../components/store/index.js';
// import faccordeon from '../components/f-accordeon/f-accordeon.js';

const popup = new fpopup('.open-popup');
const tab = new ftabs('.f-tabs');
const select = new fselect('.f-select');
const singleton = new SingletonStore();

function initApp() {
  popup.init();
  tab.init();
  select.init();
  singleton.getSingleton();
  // new faccordeon('.f-accordeon', {
  //   alwaysOpen: true
  // });
}

document.addEventListener('DOMContentLoaded', initApp());
