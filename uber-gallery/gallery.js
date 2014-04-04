// Gallery div name.
var gal = 'uber-gallery';
// Gallery row name.
var row = 'uber-row';
// Minimum and maximum row size.
var rowMin = 4;
var rowMax = 6;

$('.' + row + ' img').click(function() {
    alert('yolo');
});

function addGalleryID(obj) {
    // Give each gallery a unique ID.
    var count = 0;

    $(obj).each(function () {
        $(this).attr('id', 'ug-' + count);
        count++;
    }); 
}

function addRow(obj) {
    // Append a row to gallery.
    // <div class="uber-row"></div>
    $(obj).append('<div class="' + row + '"></div>');
}

function sRandom(min,max) {
    // Return a random number between mix and max values, inclusive.
    return Math.floor(Math.random() * (max - min) + min);
}

function addGalleryRows(obj) {
    // Create an array of images, loop through, adding images to rows.
    // 1. Add a row.
    // 2. Insert images until it has between rowMin and rowMax.
    // 3. Insert new row and repeat.
    // 4. Don't insert a new row if only 1 or 2 images are left.
    var imgArr = $(obj).children('img').toArray();
    addRow(obj);

    $(imgArr).each(function (i) {
        $('.' + row).last().append(imgArr[i]); 
        // Smaller row size on smaller screens.
        var rowLength = ($(window).width() > 800) ? sRandom(rowMin,rowMax) : 3;

        if ($('.' + row).last().children().size() >= rowLength && (imgArr.length - 1 - i) >= 2) {
            addRow(obj);
        }
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

function vertCenterObj(obj) {
    // Vertically centers the given object on screen.
    $(obj).css('margin-top', $(window).height() * 0.5 - $(obj).height()  * 0.5);
}

function getRowWidth(obj) {
    // Sum the width of a given gallery row by measuring the outerWidth 
    // of each image.
    // $('.row').width() returns an incorrect value.
    var sum = 0;

    $(obj).children('img').each(function () {
        sum += $(this).outerWidth();
    });

    return sum;
}

function orderRowImages(obj) {
    // Resizes each row of images such as to evenly space their width and height. 
    $(obj).children('.' + row).each(function () {
        // Get total width of row through width of component images.
        var sum = getRowWidth(this);
        // Ratio between gallery width, and row width.
        var ratio = parseFloat($(obj).width() / sum);

        $(this).children('img').each(function () {
            // Change the height of the image by the ratio.
            var newHeight = Math.round($(this).height() * ratio);
            changeObjHeight(this, newHeight);
            // $(this).wrap('<a class="foo" href="#"></a>');
        });

        // Rounding errors leave a small margin on the right side of the gallery.
        // Each row should ideally be (parent.width() - 1px).
        // Otherwise each row will be 1-2px too width, which causes wrapping.
        var diff = getRowWidth(this) - ($(obj).width() - 1);
        // Resize the last image in line to make it all fit.
        // A smaller row is made slightly larger and vice versa.
        $(this).children('img:last-child').css(
            'width',
            $(this).children('img:last-child').width() - diff + 'px'
        );
    });
}

$(window).load(function() {
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
