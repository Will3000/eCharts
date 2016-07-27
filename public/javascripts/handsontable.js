document.addEventListener("DOMContentLoaded", function() {

  var
    hiddenData = [
      ['', 'Time', 'Quantity Sold', 'Price', 'Remaining Quantity'],
      ['iPad', 10, 11, 12, 13],
      ['Macbook', 10, 11, 12, 13],
      ['iPhone', 10, 11, 12, 13]
    ],
    container = document.getElementById('example2'),
    hot2;

  hot2 = new Handsontable(container, {
    data: hiddenData,
    colHeaders: true,
    minSpareRows: 1
    // afterChange: function () {
    //  var tmpData = JSON.parse(JSON.stringify(hiddenData));
    // }
  });

  $('#save').click(function(){
    var tableData = JSON.stringify(hot2.getData());
    // var input = JSON.stringify({ "input": tableData });
    console.log(tableData);
    $.ajax({
      url: "http://localhost:3000/tables/new",
      type: "POST",
      data: {name: $('#tableName').val(), body: tableData},
      success: function () {
        console.log("success");
      },
      error: function (error) {
        console.log("Error: " + error);
      }
    });
  });
});
