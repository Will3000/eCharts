$(function () {
  var tableData = JSON.parse($('#areachart').attr("value"));
  var tableName = $('#chart-name').attr("value");
  // Format the multi-dimensional array into a displayable manner
  var seriesInput = tableData.slice(1, tableData.length).map(function(arr){
    return {name: arr[0], data: arr.slice(1,arr.length).map(function(elem){return elem / 1})}
  })

    $('#areachart').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: tableName
        },
        xAxis: {
            categories: tableData[0]
        },
        credits: {
            enabled: false
        },
        series: seriesInput
    });
});
