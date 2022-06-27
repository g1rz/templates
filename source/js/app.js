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
});
