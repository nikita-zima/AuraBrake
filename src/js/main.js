$(document).ready(function() {

  $("header, .intro-section, #nav-mobile").on("click","a", function (event) {
    event.preventDefault();
    let id  = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1000);
  });



  $(".hamburger-btn, .hamburger-btn-desktop").click(function() {
    $(".mobile-sidebar-navigation").addClass("sidebar-open");
    $("body").css("overflow", "hidden");
  });
  $(".close-navigation").click(function() {
    $(".mobile-sidebar-navigation").removeClass("sidebar-open");
    $("body").css("overflow", "unset");
  });
  $(".nav-mobile").click(function() {
    $(".mobile-sidebar-navigation").removeClass("sidebar-open");
    $("body").css("overflow", "unset");
  });


  $('#contact-form').submit(function(e) {

    const $form = $(this);
    // чистим ошибки
    $form.find('.error').remove();
    // проверяем поле с именем пользователя
    if ($form.find('input[name=number]').val() === '') {
      // добавляем текст ошибки
      $form.find('input[name=number]')
        .after('<div class="error">Введите номер телефона</div>');
      // прерываем дальнейшую обработку
      return false;
    }

    const values  = $form.serializeArray();
    const data = {};
    $.each(values, function(i, field){
      data[this.name] = this.value;
    });

    let message;
    if (!data.name && !data.comment) {
      message = 'Новая заявка 🥳' +
        '\n\n<strong>Номер телефона:</strong> ' + data.number
    } else {
      message = 'Новое сообщение 🥳 \n\n<strong>' +
        'Имя:</strong> ' + data.name +
        '\n<strong>Номер телефона:</strong> ' + data.number +
        '\n<strong>Комментарий:</strong> ' + data.comment
    }

    axios.post('https://api.telegram.org/bot1224170480:AAFifXjTgaPcgf41H5m7Nuq6lARG098ocl0/sendMessage', {
      chat_id: "-370533611",
      text: message,
      parse_mode: 'HTML'
    }).catch(error => {
      console.error(error);
    });

    // success
    $form[0].reset();
    $form.find('button')
      .before('<div class="success">Спасибо! Мы скоро свяжемся с вами</div>');
    $("#btnSubmit").attr("disabled", true);

    // отключаем действие по умолчанию
    gtag_report_conversion();
    return false;
  });


});



var swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

function scrollToContacts(event) {
  event.preventDefault();
  const elem = document.getElementById("contacts");
  elem.scrollIntoView({block: "start", behavior: "smooth"});
}
