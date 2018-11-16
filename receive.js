var dom = document.getElementById("container2");
var myChart2 = echarts.init(dom);
var app = {};
option = null;
myChart2.showLoading();
$.getJSON('recgraph.json', function (json) {
    myChart2.hideLoading();
    myChart2.setOption(option = {
        title: {
            text: 'Received by',
            left: '5%'
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series : [
            {
                type: 'graph',
                edgeSymbol: ['', 'arrow'],

                data: json[0].nodes.map(function (node) {
                    return {
                        x: node.x,
                        y: node.y,
                        id: node.id,
                        name: node.label,
                        symbolSize: node.size,
                        itemStyle: {
                            normal: {
                                color: node.color
                            }
                        }
                    };
                }),
                edges: json[0].edges.map(function (edge) {
                    return {
                        source: edge.by,
                        target: edge.fromm,
                        label: {
                },
                     lineStyle: {
                          normal: {
                              width: 1,
                              curveness: 0.3,
                              opacity: 1
                          }
                        }      
                    };
                }),
                label: {
                    emphasis: {
                        position: 'bottom',
                        show: true
                    }
                },
                roam: true,
                focusNodeAdjacency: true,
                
            }
        ]
    }, true);
});;
if (option && typeof option === "object") {
    myChart2.setOption(option, true);
}


function change_rc(id){
              //console.log(data[idd]);
               $.getJSON('./recgraph.json', function (json) {
                   console.log(json[id])
              myChart2.setOption(option = {
                series : [
                    {
                        type: 'graph',
                        edgeSymbol: ['', 'arrow'],
        
                        data: json[id].nodes.map(function (node) {
                            return {
                                x: node.x,
                                y: node.y,
                                id: node.id,
                                name: node.label,
                                symbolSize: node.size,
                                itemStyle: {
                                    normal: {
                                        color: node.color
                                    }
                                }
                            };
                        }),
                        edges: json[id].edges.map(function (edge) {
                            return {
                                source: edge.by,
                                target: edge.fromm,
                                label: {
                        },
                             lineStyle: {
                                  normal: {
                                      width: 1,
                                      curveness: 0.3,
                                      opacity: 1
                                  }
                                }      
                            };
                        }),
                        label: {
                            emphasis: {
                                position: 'bottom',
                                show: true
                            }
                        },
                        roam: true,
                        focusNodeAdjacency: true,
                        
                    }
                ]});
            })}
