'use strict';

import {EventPublisher, DOMReadyEvent} from 'lin3s-event-bus';
import svg4everybody from 'svg4everybody';
import FastClick from 'fastclick';
import Prism from 'prismjs';

import './tabs';

function initialize() {
  svg4everybody();
  new FastClick(document.body);
}

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    initialize();
    EventPublisher.publish(new DOMReadyEvent());
  });
})();
