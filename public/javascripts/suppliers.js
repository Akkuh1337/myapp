$(document).ready(function(){

    $.ajax({
        type: 'GET',
        url: '/api/suppliers',
        dataType: 'JSON'
    }).done(function( response ) {

        response.suppliers.forEach(supplier => {
            $('#tbl_suppliers').append(
                `<tr>
                    <td>${supplier.id}
                    <td>${supplier.label}
                    <td>${supplier.address}
                    <td>${supplier.phone_number}
                </tr>`
            )
        })

    });
})