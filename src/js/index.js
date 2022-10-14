import ftabs from '../components/f-tabs/f-tabs.js';
import fpopup from '../components/f-popup/f-popup.js';
import faccordeon from '../components/f-accordeon/f-accordeon.js';
import fselect from '../components/f-select/f-select.js';

function initApp() {
  new ftabs('.f-tabs');
  new fpopup('.open-popup');
  new faccordeon('.f-accordeon', {
    alwaysOpen: true
  });
  new fselect('.f-select');
}

initApp();
