function imageDebugInfo() {
    // Logs debug info on each row and image therein.
    var row = 0;

    $('.row').each(function() {
        console.log(
            '.row #' 
            + row
            + '\t w: '
            + sumOuterWidth(this)
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
            var newHeight = Math.round($(this).height() * ratio);
            objHeight(this, newHeight);
        });

        // Rounding errorsleave a small margin on the right side of the gallery.
        // Each row should ideally be (parent.width() - 1px).
        var diff = sumOuterWidth(this) - (ref.width() - 1);

        // Resize the last image in line to make it all fit.
        // A smaller row is made slightly larger and vice versa.
        $(this).children('img:last-child').css(
            'width', 
            $(this).children('img:last-child').width() - diff + 'px'
        );
    });
}

function objHeight(obj, amount) {
    // Change obj height to amount.
    $(obj).css('height', amount + 'px');
}

function objWidth(obj, amount) {
    // Change obj width to amount.
    $(obj).css('width', amount + 'px');
}

function sumOuterWidth(obj) {
    // Sum the width of each image WITH consideration to padding.
    var sum = 0;

    $(obj).children('img').each(function() {
        sum += $(this).outerWidth();
    });

    return sum;
}

$(function() {
    resizeImages($('.gallery'));
});

$(window).resize(function() {
    resizeImages($('.gallery'));
});