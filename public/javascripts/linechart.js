$(function () {
    var tableData = JSON.parse($('#linechart').attr("value"));
    var tableName = $('#chart-name').attr("value");
    // Format the multi-dimensional array into a displayable manner
    var seriesInput = tableData.slice(1, tableData.length).map(function(arr){
      return {name: arr[0], data: arr.slice(1,arr.length).map(function(elem){return elem / 1})}
    })

    $('#linechart').highcharts({
        title: {
            text: tableName,
            x: -20 //center
        },
        xAxis: {
            categories: tableData[0]
        },
        yAxis: {
            title: {
                text: 'Unit Sold'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ' units'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: seriesInput
    });
});
