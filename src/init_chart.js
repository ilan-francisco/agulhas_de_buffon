var ctx = document.getElementById('myChart').getContext('2d');
var chart;

function create_chart() {
    if (chart) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: [],
            datasets: [{
                label: 'Agulhas que cruzaram a linha',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: []
            }, {
                label: 'Total de agulhas',
                backgroundColor: 'rgb(189,52,189)',
                borderColor: 'rgb(189,52,189)',
                data: []
            }]
        },

        // Configuration options go here
        options: {
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0
            },
            elements: {
                line: {
                    tension: 0
                }
            },
            responsiveAnimationDuration: 0,
            scales: {
                yAxes: [{
                    position: "left",
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Quantidade de dados'
                    },
                    id: "y-axis-0"
                }, {
                    position: "right",
                    ticks: {
                        min: 0,
                        max: 3.14,
                        stepSize: 0.5,
                        precision: 2,
                        autoSkip: true,
                        callback: function(value, index, values) {
                            return  value.toFixed(2);
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Proporção para π'
                    },
                    max: 123,
                    id: "y-axis-1"
                }]
            }
        },

    });
}