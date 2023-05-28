$(document).ready(function() {

  $.ajax({
    type: 'GET',
    url: '/api/delivery_items',
    dataType: 'JSON'
  }).done(function( response ) {

    response.delivery_items.forEach(delivery_item => {
        $('#tbl_delivery_items').append(
            `<tr>
                <td><a href=${"/delivery_items/edit/" + delivery_item.id}>${delivery_item.id}</a>
                <td>${delivery_item.address}
                <td>${delivery_item.delivery_id}
                <td>${delivery_item.products_label}
                <td>${delivery_item.amount}
                <td>${delivery_item.summa}
            </tr>`
        )
    })

  });


  // Обработчик клика на кнопку "Создать"
  $('#create_delivery').click(function(e) {
    $('#create_delivery_popup').show();
  });

  // Обработчик клика на кнопку закрытия попапа
  $('#create_delivery_popup_close').click(function(e) {
    $('#create_delivery_popup').hide();
  });

  // Обработчик клика на кнопку "Отменить" в попапе
  $('#cancel_create_delivery').click(function(e) {
    $('#create_delivery_popup').hide();
  });

  // Обработчик клика на кнопку "Оформить доставку" в попапе
  $('#submit_create_delivery').click(function(e) {
    e.preventDefault();

    let data = {
      address: $('#inpaddress').val(),
      delivery_id: $('#inpid').val(),
      label: $('#inplabel').val(),
      amount: $('#inpamount').val(),
      summa: $('#inpsumma').val()
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      url: '/delivery_items/create',
      contentType: 'application/json',
      dataType: 'json'
    })
    .done(function(response) {
      if (response.msg === '') {
        alert('Доставка создана');
        window.location.reload();
      } else {
        alert(response.msg);
      }
    })
    .fail(function(error) {
      alert('Ошибка при оформлении доставки');
      console.log(error);
    });
  });

  // Обработчик клика на номер пункта
  $('.delivery-item-id').click(function(e) {
    let id = $(this).data('id');
    window.location.href = '/delivery_items/edit/' + id;
  });

  // Обработчик клика на кнопку "Сохранить изменения"
  $('#save_delivery_changes').click(function(e) {
    e.preventDefault();

    let currentURL = window.location.href;
  
    // Разбить URL на части
    let urlParts = currentURL.split('/');
  
    // Получить последний элемент в массиве, который должен быть `id`
    let id = urlParts[urlParts.length - 1];

    let data = {
      address: $('#inpaddress').val(),
      delivery_id: $('#inpid').val(),
      label: $('#inplabel').val(),
      amount: $('#inpamount').val(),
      summa: $('#inpsumma').val()
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      url: '/delivery_items/update/' + id,
      contentType: 'application/json',
      dataType: 'json'
    })
    .done(function(response) {
      if (response.msg === '') {
        alert('Изменения сохранены');
        window.location.href = '/delivery_items';
      } else {
        alert(response.msg);
      }
    })
    .fail(function(error) {
      alert('Ошибка при сохранении изменений');
      console.log(error);
    });
  });

  $('#delete_delivery').click(function(e) {
    e.preventDefault();
  
    // Получить текущий URL
    let currentURL = window.location.href;
  
    // Разбить URL на части
    let urlParts = currentURL.split('/');
  
    // Получить последний элемент в массиве, который должен быть `id`
    let id = urlParts[urlParts.length - 1];
  
    // Подставить `id` в URL для запроса удаления
    let deleteURL = '/delivery_items/delete/' + id;
  
    // Отправить AJAX-запрос на сервер для удаления доставки
    $.ajax({
      type: 'POST',
      url: deleteURL,
      dataType: 'JSON'
    })
    .done(function(response) {
      if (response.msg === '') {
        alert('Доставка удалена');
        window.location.href = '/delivery_items';
      } else {
        alert(response.msg);
      }
    })
    .fail(function(error) {
      alert('Ошибка при удалении доставки');
      console.log(error);
    });
  });
});