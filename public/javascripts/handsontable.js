
document.addEventListener("DOMContentLoaded", function() {
  if($('#chart').length === 0){
    var tableData = [
      ['', 'Jan', 'Feb', 'March', 'April'],
      ['iPad', 2, 4, 8, 16],
      ['Macbook', 2, 4, 6, 8],
      ['iPhone', 16, 8, 4, 2]
    ]
  } else {
    var tableData = JSON.parse($('#chart').attr("value"));
    // if(!tableData[0][0] != ""){
      tableData[0] = [''].concat(tableData[0]);
    // }
  }

  var
  Data = tableData,
  container = document.getElementById('newTable'),
  hot;


  hot = new Handsontable(container, {
    data: Data,
    manualRowResize: true,
    colHeaders: true,
    rowHeaders: true,
    contextMenu: true,
    outsideClickDeselects: false,
    minSpareRows: 1,
    minSpareCols: 1,
    // afterRender: function(){
    //   $("#newTable").attr("style", "overflow: hidden");
    // },
    afterSelectionEnd: function(x1, y1, x2, y2){
      col1 = y1
      col2 = y2
      row1 = x1
      row2 = x2
    }
  });


  $("#newTable").on("dblclick", "th", function(event){
    var par = $(this).parent().parent();
    if($(this).children().children().hasClass('cornerHeader') === false){
      if(par.is("tbody")){
        hot.alter('remove_row', row1);
      } else if (par.is("thead")) {
        hot.alter('remove_col', col1);
      }
    }
  })


  $('#save').click(function(){
    var tableData = hot.getData();
    var cleanedGridData = {};

    $.each( tableData, function( rowKey, object) {
      if (!hot.isEmptyRow(rowKey)) cleanedGridData[rowKey] = object.slice(0, object.length-1);
    });


    var length = cleanedGridData[0].length;
    for(var i=0; i<length; i++){
      if(hot.isEmptyCol(i)){
        for(var j=0; j<Object.keys(cleanedGridData).length; j++){
          cleanedGridData[j].splice(i, length-i);
        }
      }
    }

    var tableName = $('#tableName').html();
    // type: $('input[name="chartType"]:checked').val()
    $.ajax({
      url: "http://localhost:3000/tables/new",
      type: "POST",
      data: {name: $('#tableName').val(), body: cleanedGridData},
      success: function () {
        console.log("success");

        $.ajax({
          url: "http://localhost:3000/tables/json",
          type: "GET",
          success: function (data){
            window.location.replace("http://localhost:3000/tables/" + data.table_id );
          },
          error: function(error){
            console.log(error);
          }
        })
      },
      error: function (error) {
        console.log("Error: " + error);
      }
    });
  });

  $('#update').click(function(){
    var tableData = hot.getData();
    var cleanedGridData = {};

    $.each( tableData, function( rowKey, object) {
      if (!hot.isEmptyRow(rowKey)) cleanedGridData[rowKey] = object.slice(0, object.length-1);
    });


    var length = cleanedGridData[0].length;
    for(var i=0; i<length; i++){
      if(hot.isEmptyCol(i)){
        for(var j=0; j<Object.keys(cleanedGridData).length; j++){
          cleanedGridData[j].splice(i, length-i);
        }
      }
    }


    // var tableName = $('#tableName').val();
    var tableName = $('#tableName').html();
    var url = $(location).attr('href');
    var id = url.substring(url.lastIndexOf('/') + 1);


    $.ajax({
      url: "http://localhost:3000/tables/" + id,
      type: "PATCH",
      data: {name: tableName, body: cleanedGridData},
      success: function () {
        console.log("success");

        $.ajax({
          url: "http://localhost:3000/tables/json",
          type: "GET",
          success: function (data){
            window.location.replace("http://localhost:3000/tables/" + id );
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
