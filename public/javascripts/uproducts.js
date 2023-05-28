$(document).ready(function() {

    $.ajax({
      type: 'GET',
      url: '/api/uproducts',
      dataType: 'JSON'
    }).done(function( response ) {
  
      response.products.forEach(product => {
          $('#tbl_uproducts').append(
              `<tr>
                  <td>${product.id}
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
});