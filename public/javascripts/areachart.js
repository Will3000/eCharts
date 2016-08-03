$(function () {
  var tableData = JSON.parse($('#chart').attr("value"));
  var tableName = $('#chart-name').attr("value");
  // Format the multi-dimensional array into a displayable manner
  var seriesInput = tableData.slice(1, tableData.length).map(function(arr){
    return {name: arr[0], data: arr.slice(1,arr.length).map(function(elem){return elem / 1})}
  })

  var legend_status = function(categories_arr){
    if(categories_arr.length > 5){
      return false;
    } else {
      return true;
    }
  }

  $('#areachart').highcharts({
    chart: {
      type: 'area'
    },
    title: {
      text: tableName,
      x: -20
    },
    xAxis: {
      categories: tableData[0]
    },
    yAxis: {
      title: {
        text: ''
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: legend_status(tableData[0])
    },
    series: seriesInput
  });
});
