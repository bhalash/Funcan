/*
    GALLERY
*/

var gal = 'uber-gallery';
var row = 'uber-row';

function addGalleryID(obj) {
    // Give each gallery a unique ID.
    var count = 0;
    $(obj).each(function() {
        $(this).attr('id', 'ug-' + count);
        count++;
    }); 
}

function addGalleryRows(obj) {
    // Adds quasi-random row sizes to a gallery.
    // You can hand tune the row length if you wish, but I found 2-5 images is good.
    var rowNum = 0;
    var imgNum = $(obj).children('img').length;
    var imgArr = $(obj).children('img').toArray();
    var rowDiv = '<div class="' + row + '"></div>';
    
    $(obj).prepend(rowDiv);
    for (var i = 0; i <= 4; i ++) {
        $(imgArr[i]).appendTo('.' + row); 
    }
    
    // $('</div>').insertAfter(imgArr[3]);
    
    // do {
    //     length -= smallRandom(2,5);
    // } while (length > 0);

    // if (length % 2 != 0) {
    //     console.log('nope');
    // }
}

function smallRandom(min,max) {
    // Return a random number between mix and max values, inclusive.
    return Math.floor(Math.random() * (max - min) + min);
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
    // Sum the width of a given gallery row by measuring the outerWidth of each image.
    // $('.row').width() returns an incorrect value.
    var sum = 0;

    $(obj).children('img').each(function() {
        sum += $(this).outerWidth();
    });

    return sum;
}

function orderRowImages(obj) {
    // Resizes each row of images such as to evenly space their width and height. 
    $(obj).children('.' + row).each(function() {
        var sum = getRowWidth(this);
        var ratio = parseFloat($(obj).width() / sum);

        $(this).children('img').each(function() {
            var newHeight = Math.round($(this).height() * ratio);
            changeObjHeight(this, newHeight);
        });

        // Rounding errors leave a small margin on the right side of the gallery.
        // Each row should ideally be (parent.width() - 1px).
        // Otherwise each row will be a pixel or two too width, which causes wrapping.
        var diff = getRowWidth(this) - ($(obj).width() - 1);
        // Resize the last image in line to make it all fit.
        // A smaller row is made slightly larger and vice versa.
        $(this).children('img:last-child').css('width', $(this).children('img:last-child').width() - diff + 'px');
    });
}

function vertCenterObj(obj) {
    // Vertically centers the given object on screen.
    $(obj).css('margin-top', $(window).height() * 0.5 - $(obj).height()  * 0.5);
}

$(function() {
    $('.' + gal).each(function() { 
        addGalleryID(this);
        addGalleryRows(this);
        orderRowImages(this);
    });
});

$(window).resize(function() {
    $('.' + gal).each(function() { 
        orderRowImages(this);
    });
});

