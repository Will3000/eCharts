document.addEventListener("DOMContentLoaded", function() {

  var
    hiddenData = [
      ['', 'Jan', 'Feb', 'March', 'April'],
      ['iPad', 2, 4, 8, 16],
      ['Macbook', 2, 4, 6, 8],
      ['iPhone', 16, 8, 4, 2]
    ],
    container = document.getElementById('example2'),
    hot2;

  hot2 = new Handsontable(container, {
    data: hiddenData,
    colHeaders: true,
    minSpareRows: 1
  });

  $('#save').click(function(){
    var tableData = hot2.getData();
    var tableName = $('#tableName').val();
    console.log(tableData);

    $.ajax({
      url: "http://localhost:3000/tables/new",
      type: "POST",
      data: {name: $('#tableName').val(), body: tableData},
      success: function () {
        console.log("success");
        $.ajax({
          url: "http://localhost:3000/tables",
          type: "GET",
          success: function (data){
            $("#tables").append("<li><a href=http://localhost:3000/tables/" + data.table_id[data.table_id.length - 1] + ">" + tableName + "</a> </li>");
            console.log(data);
          },
          error: function(error){{
            console.log(error);
          }}
        })
      },
      error: function (error) {
        console.log("Error: " + error);
      }
    });
  });
});
