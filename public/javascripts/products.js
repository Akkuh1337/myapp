$(document).ready(function() {

  $.ajax({
    type: 'GET',
    url: '/api/products',
    dataType: 'JSON'
  }).done(function( response ) {

    response.products.forEach(product => {
        $('#tbl_products').append(
            `<tr>
                <td><a href=${"/products/edit/" + product.id}>${product.id}</a>
                <td>${product.label}
                <td>${product.price}
                <td>${product.amount}
            </tr>`
        )
    })

  });

  // Обработчик клика на кнопку "Создать"
  $('#create_product').click(function(e) {
    $('#create_product_popup').show();
  });

  // Обработчик клика на кнопку закрытия попапа
  $('#create_product_popup_close').click(function(e) {
    $('#create_product_popup').hide();
  });

  // Обработчик клика на кнопку "Отменить" в попапе
  $('#cancel_create_product').click(function(e) {
    $('#create_product_popup').hide();
  });

  // Обработчик клика на кнопку "Создать товар" в попапе
  $('#submit_create_product').click(function(e) {
    e.preventDefault();

    let data = {
      label: $('#inplabel').val(),
      price: $('#inpprice').val(),
      amount: $('#inpamount').val()
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      url: '/products/create',
      contentType: 'application/json',
      dataType: 'json'
    })
    .done(function(response) {
      if (response.msg === '') {
        alert('Товар создан');
        window.location.reload();
      } else {
        alert(response.msg);
      }
    })
    .fail(function(error) {
      alert('Ошибка при создании товара');
      console.log(error);
    });
  });

  // Обработчик клика на номер пункта
  $('.product-id').click(function(e) {
    let id = $(this).data('id');
    window.location.href = '/products/edit/' + id;
  });

  // Обработчик клика на кнопку "Сохранить изменения"
  $('#save_product_changes').click(function(e) {
    e.preventDefault();

    let currentURL = window.location.href;
  
    // Разбить URL на части
    let urlParts = currentURL.split('/');
  
    // Получить последний элемент в массиве, который должен быть `id`
    let id = urlParts[urlParts.length - 1];

    let data = {
      label: $('#inplabel').val(),
      price: $('#inpprice').val(),
      amount: $('#inpamount').val()
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      url: '/products/update/' + id,
      contentType: 'application/json',
      dataType: 'json'
    })
    .done(function(response) {
      if (response.msg === '') {
        alert('Изменения сохранены');
        window.location.href = '/products';
      } else {
        alert(response.msg);
      }
    })
    .fail(function(error) {
      alert('Ошибка при сохранении изменений');
      console.log(error);
    });
  });

  $('#delete_product').click(function(e) {
    e.preventDefault();
  
    // Получить текущий URL
    let currentURL = window.location.href;
  
    // Разбить URL на части
    let urlParts = currentURL.split('/');
  
    // Получить последний элемент в массиве, который должен быть `id`
    let id = urlParts[urlParts.length - 1];
  
    // Подставить `id` в URL для запроса удаления
    let deleteURL = '/products/delete/' + id;
  
    // Отправить AJAX-запрос на сервер для удаления доставки
    $.ajax({
      type: 'POST',
      url: deleteURL,
      dataType: 'JSON'
    })
    .done(function(response) {
      if (response.msg === '') {
        alert('Товар удален');
        window.location.href = '/products';
      } else {
        alert(response.msg);
      }
    })
    .fail(function(error) {
      alert('Ошибка при удалении товара');
      console.log(error);
    });
  });
});