var yData = "";
$(function () {
  var fetchData = function(){
    $.ajax({
      url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22YHOO%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",
      type: "GET",
      success: function(data){
        yData = (data.query.results.quote.Ask)||yData;
      },
      error: function(error){
        console.log(error);
      }
    });
  };
  setInterval(function(){fetchData()}, 1000);

  Highcharts.setOptions({
    global : {
      useUTC : false
    }
  });

  // Create the chart
  $('#stock-container').highcharts('StockChart', {
    chart : {
      events : {
        load : function () {

          // set up the updating of the chart each second
          var series = this.series[0];
          setInterval(function () {
            fetchData();
            console.log(yData);
            var x = (new Date()).getTime(), // current time
            // y = Math.round(Math.random() * 100);
            y = parseFloat(yData);
            series.addPoint([x, y], true, true);
          }, 1000);
        }
      }
    },

    rangeSelector: {
      buttons: [{
        count: 1,
        type: 'minute',
        text: '1M'
      }, {
        count: 5,
        type: 'minute',
        text: '5M'
      }, {
        type: 'all',
        text: 'All'
      }],
      inputEnabled: false,
      selected: 0
    },

    title : {
      text : 'YHOO'
    },

    exporting: {
      enabled: false
    },

    series : [{
      name : 'Ask: ',
      data : (function () {
        var data = [], time = (new Date()).getTime(), i;

        for (i = -999; i <= 0; i += 1) {
          data.push([
            time + i * 1000,
            39
          ]);
        }
        return data;
      }())
    }]
  });

});
