import {EventPublisher, DOMReadyEventSubscriber} from 'lin3s-event-bus';

import $ from 'jquery';

function onReady() {
  $('.tabs__item').on('click', (el) => {
    const $context = $(el.currentTarget).parents('.tabs');

    $context.find('.tabs__item').removeClass('tabs__item--active');
    $context.find('.tabs__content').removeClass('tabs__content--active');

    $(el.currentTarget).addClass('tabs__item--active');
    $context.find('.tabs__content')
      .eq($(el.currentTarget).index()).addClass('tabs__content--active');
  });
}

const init = () => {
  EventPublisher.subscribe(
    new DOMReadyEventSubscriber(
      onReady
    )
  );
};

export default init();
