$(function(){

    var mychart = echarts.init(document.querySelector(".chart_right"));
    option = {
        title: {
            text: '热门品牌销售',
            subtext: '2017年11月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿达', '李宁', '新百伦', '阿迪王']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '耐克' },
                    { value: 310, name: '阿达' },
                    { value: 234, name: '李宁' },
                    { value: 135, name: '新百伦' },
                    { value: 1548, name: '阿迪王' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    mychart.setOption(option);



    var mychart1 = echarts.init(document.querySelector(".chart_left"));

    var option1 = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数']
        },
        xAxis: {
            data: ["一月", "二月", "三月", "四月", "五月", "六月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [500, 2000, 3226, 1033, 1011, 2220]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    mychart1.setOption(option1);

})