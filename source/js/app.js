$('document').ready(function () {
  // Табы
  $('.f-tabs__list-link').click(function (event) {
    event.preventDefault();
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    var content = $(this).attr('href');
    $('.f-tabs__content-item').not(content).removeClass('active');
    $(content).addClass('active');
  });

  // Popup
  $('a[href="#f-modal"]').magnificPopup({
    type: 'inline'
  });

  // Аккордеон
  $('.f-accordion__item').click(function () {
    if (!$(this).hasClass('active')) {
      $('.f-accordion__item-content').slideUp();
      $('.f-accordion__item').removeClass('active');

      $(this).addClass('active');
      $(this).find('.f-accordion__item-content').slideDown();
    } else {
      $(this).removeClass('active');
      $(this).find('.f-accordion__item-content').slideUp();
    }
  });

  // Swiper slider
  const swiper = new Swiper('.swiper', {
    loop: true,

    pagination: {
      el: '.swiper-pagination',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});
