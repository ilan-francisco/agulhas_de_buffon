const height = $("#canvas").height();
const width = $("#canvas").width();
const NEEDLE_HEIGHT = 66;
const NEEDLE_WIDTH = 2;
const used_width = width - width % (2*NEEDLE_HEIGHT);
const needle_img = document.getElementById("needle-img");

var c = document.getElementById("canvas");
c.height = height;
c.width = used_width;

function radians(degrees) {
    return degrees * (Math.PI/180);
}

function generate_result(ctx) {
    const x = Math.floor( Math.random() * used_width );
    const y = Math.floor( Math.random() * height );
    const angle = Math.floor( Math.random() * 180) - 90;

    const needle_left_x  = x - Math.cos(radians(angle)) * NEEDLE_HEIGHT/2;
    const needle_right_x = x + Math.cos(radians(angle)) * NEEDLE_HEIGHT/2;

    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(radians(angle-90));
    ctx.translate(-NEEDLE_WIDTH/2,-NEEDLE_HEIGHT/2);
    ctx.drawImage(needle_img, 0,0, NEEDLE_WIDTH, NEEDLE_HEIGHT);
    ctx.restore();

    let i;
    for (i = 0; i <= used_width; i += 2*NEEDLE_HEIGHT) {
        const line_x = i;
        if (line_x > needle_left_x &&
            line_x < needle_right_x ) {
            return 1;
        }
    }
    return 0;
}

function draw_vertical_lines() {
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0,width,height);
    ctx.beginPath();
    ctx.save();
    ctx.lineWidth = 1;

    let i;
    for (i = 0; i <= used_width; i+=2*NEEDLE_HEIGHT) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
    }
}

function generate_sample_result(n_sample) {
    var ctx = c.getContext("2d");

    draw_vertical_lines()

    let optimize = $("#check_optimize").is(":checked");
    let step_size = Math.round(n_sample / 30)
    let count_crosseds = 0;
    i = 0;
    function step() {
        if (i < n_sample) {
            count_crosseds += generate_result(ctx);
            chart.data.labels.push(++i);
            chart.data.datasets[1].data.push(i);
            chart.data.datasets[0].data.push(count_crosseds);
            chart.options.scales.yAxes[0].ticks.max = i;
            chart.options.scales.yAxes[1].ticks.max = i / count_crosseds;

            $("#pi_result").text((i / count_crosseds).toFixed(2)+" ("+i+" agulhas)");
            if (optimize) {
                if (i % step_size === 0) {
                    setTimeout(step, 0);
                } else {
                    step();
                }
                if (i%n_sample === 0) {
                    setTimeout(chart.update(), 0); //TODO aguardar resultados
                }
            } else {
                if (i % step_size === 0) {
                    chart.update();
                }
                if (i%n_sample === 0) {
                    chart.update();
                }
                setTimeout(step, 0);
            }
        }
    }

    step();
}

$("#btn-go").click( function () {
    create_chart();
    $("#pi_result_container")[0].hidden = false;
    let n_sample = parseInt($("#n_sample").val());
    generate_sample_result(n_sample);
})

$("#n_sample").on("input", function () {
    let n_sample = parseInt($("#n_sample").val());
    if (n_sample > 1000) {
        $("#check_optimize").prop('checked', true);
    }
})

draw_vertical_lines()