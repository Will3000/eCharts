$(function () {
    var tableData = JSON.parse($('#chart').attr("value"));
    console.log("==============>");
    console.log(tableData);
    var tableName = $('#chart-name').attr("value");
    // Format the multi-dimensional array into a displayable manner
    var seriesInput = tableData.slice(1, tableData.length-1).map(function(arr){
        return {name: arr[0], data: arr.slice(1,arr.length-1).map(function(elem){return elem / 1})}
    })


    $('#chart').highcharts({
        title: {
            text: tableName,
            x: -20 //center
        },
        // subtitle: {
        //     text: 'Source: WorldClimate.com',
        //     x: -20
        // },
        xAxis: {
            categories: tableData[0].slice(0, tableData[0].length-2)
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
