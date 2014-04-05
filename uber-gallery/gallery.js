// Gallery, row, and img classes.
// Update gallery.css if you change these!!!!
var galName     = 'uber-gallery';
var rowName     = galName + '-row';
var imgName     = galName + '-img';
var boxName     = galName + '-box';
// Maximum, minimum, and tiny row sizes. Tiny is used in mobile views.
var rowSizeMin  = 4;
var rowSizeMax  = 6;
var rowSizeTiny = 3;
// Break point before switching to mobile view.
var mobileSize  = 880;
// Include image alt text as anchor title?
var altAsTitle  = false;
// Debug. Replace anchor hyperlinks with "javascript:void(0)".
var voidHref    = true;

/*
    GALLERY
*/

function addAnchor(obj, addTitle) {
    // Turn static image into a clickable hyperlink. 
    $(obj).children('img').each(function() {
        if (!$(this).parent().is('a')) {
            // Hyperlink and title for anchor.
            var href  = (voidHref === true) ? 'href="javascript:void(0)" ' : 'href="' + $(this).attr('src') + '" ';
            var title = (addTitle === true) ? ' title="' + $(this).attr('alt') + '" ' : ' ';
            $(this).wrap('<a ' + href  + title + ' ></a>');
        }
    });
}

function addGalleryID(obj) {
    // Give each gallery a unique ID.
    var count = 0;

    $(obj).each(function () {
        $(this).attr('id', rowName + ' ' + count);
        count++;
    }); 
}

function addRow(obj) {
    // Append a row to gallery.
    // <div class="uber-row"></div>
    $(obj).append('<div class="' + rowName + '"></div>');
}

function sRandom(min,max) {
    // Return a random number between mix and max values, inclusive.
    return Math.floor(Math.random() * (max - min) + min);
}

function addGalleryRows(obj) {
    // Create an array of images, loop through, adding images to rows.
    // 1. Add a row.
    // 2. Insert images until it has between rowSizeMin and rowSizeMax.
    // 3. Insert new row and repeat.
    // 4. Don't insert a new row if only 1 or 2 images are left.
    var imgArr = $(obj).children('img').toArray();
    addRow(obj);

    $(imgArr).each(function (i) {
        // Smaller row size on smaller screens.
        var rowLength = ($(window).width() > mobileSize) ? sRandom(rowSizeMin,rowSizeMax) : rowSizeTiny;
        $('.' + rowName).last().append(imgArr[i]); 

        // Add a new row if the length exceeds our quasi-random size.
        // Do not add a new row if we are at the end of the array and only 1 or 2 images remain.
        // The effect of a single-image row is ugly and a thing to be avoided.
        if ($('.' + rowName).last().children().size() >= rowLength && (imgArr.length - 1 - i) >= 2) {
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
    $(obj).children('.' + rowName).each(function () {
        // Get total width of row through width of component images.
        var sum = getRowWidth(this);
        // Ratio between gallery width, and row width.
        var ratio = parseFloat($(obj).width() / sum);

        $(this).children('img').each(function () {
            // Change the height of the image by the ratio.
            // Add appropriate class for click events.
            var newHeight = Math.round($(this).height() * ratio);
            changeObjHeight(this, newHeight);
            $(this).attr('class', imgName);
        });

        // Rounding errors leave a small margin on the right side of the gallery.
        // Each row should ideally be (parent.width() - 1px).
        // Otherwise each row will be 1-2px too width, which causes wrapping.
        var diff = getRowWidth(this) - ($(obj).width() - 1);
        // Resize the last image in line to make it all fit.
        // A smaller row is made slightly larger and vice versa.
        $(this).children('img').last().css('width', $(this).children('img').last().width() - diff + 'px');

        // Add anchor element.
        addAnchor(this, altAsTitle);
    });
}

/*
    LIGHTBOX
*/

function addLightbox(obj) {
    // Append empty lightbox to whatever.
    // Best prepended to body.
    $(obj).prepend(
        '<div class="' + boxName + '"><div class="' + boxName + '-img"></div></div>');
    changeObjHeight('.' + boxName, $(window).height());
}

function toggleLightbox() {
    // Toggle appearance of the lightbox.
    var lb = $('.' + boxName);
    var lbDisp = (lb.css('display') === 'none') ? 'initial' : 'none';
    $(lb).css('display', lbDisp);
}

function setLightboxImg(obj) {
    // Add clicked image to lightbox.
    var lb = $('.' + boxName + '-img');
    lb.empty();
    lb.append('<img class="snusnu" src="' + $(obj).attr('src') + '" />');
    // Vertically center photo.
    changeObjHeight('.snusnu', $(window).height() * 0.9);
    vertCenterObj('.snusnu');
}

$(window).load(function() {
    $('.' + galName).each(function() { 
        addGalleryID(this);
        addGalleryRows(this);
        orderRowImages(this);
    });

    addLightbox('body');

    $('.' + imgName).click(function() {
        // Show box.
        toggleLightbox();
        setLightboxImg(this);
    });

    $('.' + boxName).click(function() {
        // Hide box (debug).
        toggleLightbox();
    });
});

$(window).resize(function() {
    $('.' + gal).each(function() { 
        orderRowImages(this);
    });
});
