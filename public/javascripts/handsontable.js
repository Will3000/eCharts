document.addEventListener("DOMContentLoaded", function() {

  var
    Data = [
      ['', 'Jan', 'Feb', 'March', 'April'],
      ['iPad', 2, 4, 8, 16],
      ['Macbook', 2, 4, 6, 8],
      ['iPhone', 16, 8, 4, 2]
    ],
    container = document.getElementById('example2'),
    hot;

  hot = new Handsontable(container, {
    // data: Data,
    colHeaders: true,
    removeRowPlugin: true,
    outsideClickDeselects: false,
    minSpareRows: 1,
    minSpareCols: 1
  });
  hot.loadData(Data);

  // removeCol(index, amount)

  $('#save').click(function(){
    var tableData = hot.getData();
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
            window.location.replace("http://localhost:3000/tables/" + data.table_id[data.table_id.length - 1] );
            // $("#tables").append("<li><a href=http://localhost:3000/tables/" + data.table_id[data.table_id.length - 1] + ">" + tableName + "</a> </li>");
            // console.log(data);
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
