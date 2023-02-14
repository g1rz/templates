import ftabs from '../components/f-tabs/f-tabs.js';
import fpopup from '../components/f-popup/f-popup.js';
import faccordeon from '../components/f-accordeon/f-accordeon.js';
import fselect from '../components/f-select/f-select.js';

function initApp() {
  new ftabs('.f-tabs');
  new faccordeon('.f-accordeon', {
    alwaysOpen: true
  });
  new fselect('.f-select');
  const popup = new fpopup('.open-popup');
  popup.init();
}

document.addEventListener('DOMContentLoaded', initApp());
