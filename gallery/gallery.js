// Pre-shrink row height.
var rowHeight = 700;
// Parent container width.
var galleryWidth = $('.gallery').width();

function galleryImgSizes() {
    $('.row').each(function() {
        var sum = ratio = 0;
        // Set each image to a universal size.
        // Images will be resized again later.
        setImgSize(this, rowHeight); 
        // Find the total length of the row with each image of the same height.
        sum = sumImgRowWidth(this);
        ratio = galleryWidth / sum;
        console.log(ratio);
        // Fudge until I lock down row length.
        setImgSize(this, ratio);
    });
}

function sumImgRowWidth(obj) {
    var a = 0;

    $(obj).children('img').each(function() {
        // Set heights universally. This will change later. 
        // Record widths.
        a += $(this).width();
    });

    console.log(a);
    return a;
}

function setImgSize(obj, size) {
    // Resize each image height down according to the ratio.
    // Width is set to 'auto' in the CSS.
    $(obj).children('img').each(function() {
        if (size < 10) {
            $(this).css('height', $(this).height() * size + 'px');
        } else {
            $(this).css('height', size + 'px');
        }
    });
}

$(function() {
    galleryImgSizes();
});

$(window).resize(function() {
    galleryImgSizes();
});