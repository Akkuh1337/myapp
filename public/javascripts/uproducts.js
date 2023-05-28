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
});