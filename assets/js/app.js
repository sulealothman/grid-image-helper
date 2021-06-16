/*
** Author : Suleiman Alothman (@sulealothman)
** Grid Image Helper
** Version : 0.1
*/

const img = new Image();

function drawCanvas(url, callback, args = null) {
    img.src = url;
    img.onload = function () {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.style.backgroundImage = `url(${url})`;

        if(callback) {
            if(callback.name === 'filter') {
                callback(ctx, args)
                ctx.drawImage(img, 0, 0);
            } else {
                ctx.drawImage(img ,0, 0); 
                (args) ? callback(ctx, args) : callback(ctx);
            }
    
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            ctx.putImageData(imageData, 0, 0);
        } else {
            ctx.drawImage(img, 0, 0);
        }
        
    }
}

function filter(ctx, args) {
    ctx.filter = `brightness(${args.b}%) contrast(${args.c}%) saturate(${args.s}%)`;
}

function blackWhiteAdjustment(ctx) {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
}

function drawGridLines(ctx, args) {
    let width = canvas.width;
    let height = canvas.height;
    let sequare = args.num_squares;
    let lengthSq = width / sequare;
    for (var x = 0; x < width; x += lengthSq) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.lineWidth = args.line_width;
    }

    if (args.vertical_squares) {
        lengthSq = height / args.vertical_squares
    }
    for (var y = 0; y < height; y += lengthSq) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.lineWidth = args.line_width;
    }
    ctx.strokeStyle = args.line_color;
    ctx.stroke();
}


function downloadImage(data, filename = 'untitled.jpg') {
    var a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}
