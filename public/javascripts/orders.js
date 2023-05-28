$(document).ready(function() {

  $.ajax({
    type: 'GET',
    url: '/api/orders',
    dataType: 'JSON'
  }).done(function( response ) {

    response.orders.forEach(order => {
        $('#tbl_orders').append(
            `<tr>
                <td><a href=${"/orders/edit/" + order.id}>${order.id}</a>
                <td>${order.order_label}
                <td>${order.client_label}
                <td>${order.date}
                <td>${order.status}
                <td>${order.amount}
            </tr>`
        )
    })

  });

  // Обработчик клика на кнопку "Создать"
  $('#create_order').click(function(e) {
    $('#create_order_popup').show();
  });

  // Обработчик клика на кнопку закрытия попапа
  $('#create_order_popup_close').click(function(e) {
    $('#create_order_popup').hide();
  });

  // Обработчик клика на кнопку "Отменить" в попапе
  $('#cancel_create_order').click(function(e) {
    $('#create_order_popup').hide();
  });


  // Обработчик клика на кнопку "Оформить доставку" в попапе
  $('#submit_create_order').click(function(e) {
    e.preventDefault();

    let data = {
      label: $('#inplabel').val(),
      name: $('#inpname').val(),
      statuses: $('#instatuses').val(),
      amount: $('#inpamount').val(),
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      url: '/orders/create',
      contentType: 'application/json',
      dataType: 'json'
    })
    .done(function(response) {
      if (response.msg === '') {
        alert('Заказ создан');
        window.location.reload();
      } else {
        alert(response.msg);
      }
    })
    .fail(function(error) {
      alert('Ошибка при оформлении заказа');
      console.log(error);
    });
  });

  // Обработчик клика на номер пункта
  $('.order-id').click(function(e) {
    let id = $(this).data('id');
    window.location.href = '/orders/edit/' + id;
  });

  // Обработчик клика на кнопку "Сохранить изменения"
  $('#save_order_changes').click(function(e) {
    e.preventDefault();

    let currentURL = window.location.href;
  
    // Разбить URL на части
    let urlParts = currentURL.split('/');
  
    // Получить последний элемент в массиве, который должен быть `id`
    let id = urlParts[urlParts.length - 1];

    let data = {
      label: $('#inplabel').val(),
      name: $('#inpname').val(),
      statuses: $('#instatuses').val(),
      amount: $('#inpamount').val(),
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      url: '/orders/update/' + id,
      contentType: 'application/json',
      dataType: 'json'
    })
    .done(function(response) {
      if (response.msg === '') {
        alert('Изменения сохранены');
        window.location.href = '/orders';
      } else {
        alert(response.msg);
      }
    })
    .fail(function(error) {
      alert('Ошибка при сохранении изменений');
      console.log(error);
    });
  });

  $('#delete_order').click(function(e) {
    e.preventDefault();
  
    // Получить текущий URL
    let currentURL = window.location.href;
  
    // Разбить URL на части
    let urlParts = currentURL.split('/');
  
    // Получить последний элемент в массиве, который должен быть `id`
    let id = urlParts[urlParts.length - 1];
  
    // Подставить `id` в URL для запроса удаления
    let deleteURL = '/orders/delete/' + id;
  
    // Отправить AJAX-запрос на сервер для удаления доставки
    $.ajax({
      type: 'POST',
      url: deleteURL,
      dataType: 'JSON'
    })
    .done(function(response) {
      if (response.msg === '') {
        alert('Заказ удален');
        window.location.href = '/orders';
      } else {
        alert(response.msg);
      }
    })
    .fail(function(error) {
      alert('Ошибка при удалении заказа');
      console.log(error);
    });
  });
});