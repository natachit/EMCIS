
            var chart = echarts.init(document.getElementById('main'));
            option = null;
            $.getJSON('./wc22.json', function (data) {
                //name = "Ryan Curtin <gth671b@mail.gatech.edu>mlpack@cc.gatech.edu"
                //onsole.log(Object.keys(data["Ryan Curtin <gth671b@mail.gatech.edu>mlpack@cc.gatech.edu"]))
                chart.setOption(option = {
                tooltip: {},
                series: [ {
                    type: 'wordCloud',
                    gridSize: 2,
                    sizeRange: [12, 50],
                    rotationRange: [-90, 90],
                    shape: 'pentagon',
                    width: 600,
                    height: 400,
                    drawOutOfBound: true,
                    textStyle: {
                        normal: {
                            color: function () {
                                return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: Object.keys(data[0]).map(function (key, index) {
                        //console.log(key, data[name][key])
                        return {
                            name: key,
                            value: data[0][key]  
                        };
                    }),
                } ]
            });});
            if (option && typeof option === "object") {
                chart.setOption(option, true);
            }
            window.onresize = chart.resize;

            function change_wc(id){
              //console.log(data[idd]);
               $.getJSON('./wc22.json', function (data) {
              chart.setOption(option = {series:[{data: Object.keys(data[id]).map(function (key, index) {
                        return {
                            name: key,
                            value: data[id][key]  
                        };
                    })}]});
            })}