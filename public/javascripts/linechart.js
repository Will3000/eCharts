$(function () {
    var tableData = JSON.parse($('#chart').attr("value"));
    var tableName = $('#chart-name').attr("value");
    var seriesInput = tableData.slice(1).map(function(arr){
        return {name: arr[0], data: arr.slice(1).map(function(elem){return elem / 1})}
    })

    console.log(seriesInput);

    $('#chart').highcharts({
        title: {
            text: tableName,
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
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
