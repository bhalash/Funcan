function imageDebugInfo() {
    // Logs debug info on each row and image therein.
    var row = 0;

    $('.row').each(function() {
        console.log(
            '.row #' 
            + row
            + '\t w: '
            + sumWidth(this)
        );

        row++;
    });

    console.log('');
}

function resizeImages(ref) {
    $('.row').each(function() {
        var sum = sumOuterWidth(this);
        var ratio = parseFloat(ref.width() / sum);

        $(this).children('img').each(function() {
            $(this).css('height', Math.floor($(this).height() * ratio) + 'px');
        });

        // Rounding errors will leave a small margin on the right side of the gallery.
        var diff = ref.width() - sumOuterWidth(this);

        if (diff > 0 ) {
            // Pad image width.
            // $(this).children('img:last-child').css('padding-left', diff);
        }
    });
}

function sumOuterWidth(obj) {
    // Sum the width of each image WITH consideration to padding.
    var sum = 0;

    $(obj).children('img').each(function() {
        sum += $(this).outerWidth();
    });

    return sum;
}

function sumWidth(obj) {
    // Sum the width of each image WITHOUT consideration to padding.
    var sum = 0;

    $(obj).children('img').each(function() {
        sum += $(this).width();
    });

    return sum;
}

$(function() {
    console.log($('.gallery').width());
    imageDebugInfo();
    resizeImages($('.gallery'));
    imageDebugInfo();
});

$(window).resize(function() {
    resizeImages($('.gallery'));
});