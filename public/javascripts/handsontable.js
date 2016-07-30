document.addEventListener("DOMContentLoaded", function() {
  if($('#chart').length == 0){
    var tableData = [
      ['', 'Jan', 'Feb', 'March', 'April'],
      ['iPad', 2, 4, 8, 16],
      ['Macbook', 2, 4, 6, 8],
      ['iPhone', 16, 8, 4, 2]
    ]
  } else {
    var tableData = JSON.parse($('#chart').attr("value"));
    tableData[0] = [''].concat(tableData[0].slice(0, tableData.length - 1));
  }

  var
  Data = tableData,
  container = document.getElementById('newTable'),
  hot;

  hot = new Handsontable(container, {
    // data: Data,
    colHeaders: true,
    removeRowPlugin: true,
    outsideClickDeselects: false,
    minSpareRows: 1,
    minSpareCols: 1,
    afterSelectionEnd: function(x1, y1, x2, y2){
      col1 = y1
      col2 = y2
    }
  });
  hot.loadData(Data);

  $("#newTable").on("dblclick", function(){
    hot.alter('remove_col', col1);
  })


  $('#save').click(function(){
    var tableData = hot.getData();
    var tableName = $('#tableName').val();

    $.ajax({
      url: "http://localhost:3000/tables/new",
      type: "POST",
      data: {name: $('#tableName').val(), body: tableData},
      success: function () {
        console.log("success");

        $.ajax({
          url: "http://localhost:3000/tables/json",
          type: "GET",
          success: function (data){
            window.location.replace("http://localhost:3000/tables/" + data.table_id );
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

  $('#update').click(function(){
    var tableData = hot.getData();
    var tableName = $('#tableName').val();
    var url = $(location).attr('href');
    var id = url.substring(url.lastIndexOf('/') + 1);

    console.log(tableName);
    console.log(tableData);

    $.ajax({
      url: "http://localhost:3000/tables/" + id,
      type: "PATCH",
      data: {name: tableName, body: tableData},
      success: function () {
        console.log("success");

        $.ajax({
          url: "http://localhost:3000/tables/json",
          type: "GET",
          success: function (data){
            window.location.replace("http://localhost:3000/tables/" + data.table_id );
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
