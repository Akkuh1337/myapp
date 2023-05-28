$(document).ready(function() {

    $.ajax({
      type: 'GET',
      url: '/api/uorders',
      dataType: 'JSON'
    }).done(function( response ) {
  
      response.orders.forEach(order => {
          $('#tbl_uorders').append(
              `<tr>
                  <td>${order.id}
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
});