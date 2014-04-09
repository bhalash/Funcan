// Gallery, row, and img classes.
// UPDATE GALLERY.CSS IF YOU CHANGE THESE!!!!
var customName     = 'uber';
var galleryName    = customName + '-gallery';
var galleryRowName = customName + '-row';
var galleryImgName = customName + '-img';
var lightboxName   = customName + '-box';
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
        $(this).attr('id', galleryRowName + ' ' + count);
        count++;
    }); 
}

function addRow(obj) {
    // Append a row to gallery.
    // <div class="uber-row"></div>
    $(obj).append('<div class="' + galleryRowName + '"></div>');
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
        $('.' + galleryRowName).last().append(imgArr[i]); 

        // Add a new row if the length exceeds our quasi-random size.
        // Do not add a new row if we are at the end of the array and only 1 or 2 images remain.
        // The effect of a single-image row is ugly and a thing to be avoided.
        if ($('.' + galleryRowName).last().children().size() >= rowLength && (imgArr.length - 1 - i) >= 2) {
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
    $(obj).children('.' + galleryRowName).each(function () {
        // Get total width of row through width of component images.
        var sum = getRowWidth(this);
        // Ratio between gallery width, and row width.
        var ratio = parseFloat($(obj).width() / sum);

        $(this).children('img').each(function () {
            // Change the height of the image by the ratio.
            // Add appropriate class for click events.
            var newHeight = Math.round($(this).height() * ratio);
            changeObjHeight(this, newHeight);
            $(this).attr('class', galleryImgName);
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
    // Best prepended to <body>.
    var divOpen = '<div class="';
    var divClose = '"></div>';

    var lightboxDiv = [
        lightboxName + '-close',
        lightboxName + '-nav',
        lightboxName + '-txt',
        lightboxName + '-img'
    ];

    // Attach lightbox to obj, and size it to the window.
    $(obj).prepend(divOpen + lightboxName + '">');
    changeObjHeight('.' + lightboxName, $(window).height());

    $('.' + lightboxName).prepend(divOpen + lightboxDiv[3] + divClose);
}

function toggleLightbox() {
    // Toggle appearance of the lightbox.
    var lightbox = $('.' + lightboxName);
    var lightboxDisp = (lightbox.css('display') === 'none') ? 'initial' : 'none';
    $(lightbox).css('display', lightboxDisp);
}

function setLightboxImg(obj) {
    // Add clicked image to lightbox.
    var lightboxImg = $('.' + lightboxName + '-img');
    lightboxImg.empty();
    lightboxImg.append('<img src="' + $(obj).attr('src') + '" />');
}

$(window).load(function() {
    $('.' + galleryName).each(function() { 
        addGalleryID(this);
        addGalleryRows(this);
        orderRowImages(this);
    });

    addLightbox('body');

    $('.' + galleryImgName).click(function() {
        toggleLightbox();
        setLightboxImg(this);
    });

    $('.uber-box-close').click(function() {
        // Hide box (debug).
        toggleLightbox();
    });

    $('body').keyup(function(key) {
        switch (key.keyCode) {
            case 27: toggleLightbox(); break;
            case 37: break;
            case 39: break;
            default: break;
        }
    });
});

$(window).resize(function() {
    $('.' + gal).each(function() { 
        orderRowImages(this);
    });
});
