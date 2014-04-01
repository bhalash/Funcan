/*
    GALLERY
*/

var gal = '.uber-gallery';
var row = '.uber-row';

function addGalleryID(obj) {
    // Give each gallery a unique ID.
    var count = 0;
    $(obj).each(function() {
        $(this).attr('id', 'ug-' + count);
        count++;
    }); 
}

function changeObjHeight(obj, amount) {
    // Change obj height to amount.
    $(obj).css('height', amount + 'px');
}

function changeObjWidth(obj, amount) {
    // Change obj width to amount.
    $(obj).css('width', amount + 'px');
}

function getRowWidth(obj) {
    // Sum the width of a given gallery row by measuring the outerwidth of each image.
    // row.width() returns an incorrect value.
    var sum = 0;

    $(obj).children('img').each(function() {
        sum += $(this).outerWidth();
    });

    return sum;
}

function resizeImages(obj) {
    // Resizes each 
    $(obj).children(row).each(function() {
        var sum = getRowWidth(this);
        var ratio = parseFloat($(obj).width() / sum);

        $(this).children('img').each(function() {
            var newHeight = Math.round($(this).height() * ratio);
            changeObjHeight(this, newHeight);
        });

        // Rounding errorsleave a small margin on the right side of the gallery.
        // Each row should ideally be (parent.width() - 1px).
        var diff = getRowWidth(this) - ($(obj).width() - 1);

        // Resize the last image in line to make it all fit.
        // A smaller row is made slightly larger and vice versa.
        $(this).children('img:last-child').css('width', $(this).children('img:last-child').width() - diff + 'px');
    });
}

function vertCenterObj(obj) {
    // Vertically centers the given object on screen.
    $(obj).css('margin-top', 
        $(window).height() * 0.5
        - $(obj).height()  * 0.5
    );
}

$(function() {
    addGalleryID(gal);
    resizeImages(gal);
});

$(window).resize(function() {
    resizeImages(gal);
});

