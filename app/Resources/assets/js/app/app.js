'use strict';

import {EventPublisher, DOMReadyEvent} from 'lin3s-event-bus';
import {BenGorCookies} from 'bengor-cookies';
import svg4everybody from 'svg4everybody';
import FastClick from 'fastclick';

function initialize() {
  svg4everybody();
  new FastClick(document.body);
  new BenGorCookies({
    triggers: 'html',
    maxPageYOffset: false
  });
}

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    initialize();
    EventPublisher.publish(new DOMReadyEvent());
  });
})();
