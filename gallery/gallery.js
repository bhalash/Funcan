function imageDebugInfo() {
    // Logs debug info on each row and image therein.
    var img = sum = row = 0;

    $('.row').each(function() {
        console.log('Row #' + row + ':\n----');

        $(this).children('img').each(function() {
            console.log(
                'img #' + img + ': '  
                + 'w: ' + $(this).width()
                + ' h: '+ $(this).height()
            );

            img++;
        });

        sum = sumImgRowWidth(this);
        console.log('Total:\tw: ' + sum + '\n');
        row++;
        img = 0;
    });
}

function resizeImages() {
    // Resizes each row (more-or-less) equally.
    // I have run up against rounding problems, so the image sizes are fudged down by 1px.
    // Two nested loops: Rows, and then images.
    // 
    // For each row:
    // 1. Resize each image to the same height.
    // 2. Determine length of the row of images.
    // 3. Determine the ratio between the row and the gallery width.
    // 4. Resize each image down by this ratio.
    $('.row').each(function() {
        var sum = ratio = 0;

        $(this).children('img').each(function() {
            sum += $(this).width();
        });

        var ratio = parseFloat($('.gallery').width() / sum);

        $(this).children('img').each(function() {
            $(this).css('height', Math.floor($(this).height() * ratio) + 'px');
        });
    });
}

$(function() {
    resizeImages();
});

$(window).resize(function() {
    resizeImages();
});