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
    tableData[0] = [''].concat(tableData[0].slice(0, tableData.length-1));
    console.log(tableData);
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
    console.log(tableData);

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
