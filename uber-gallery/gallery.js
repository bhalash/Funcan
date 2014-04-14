// Gallery, row, and img classes.
// UPDATE GALLERY.CSS IF YOU CHANGE THESE!!!!
var customClass     = 'funcan';
var galleryClass    = customClass + '-gallery';
var galleryRowClass = customClass + '-row';
var lightboxClass   = customClass + '-lightbox';
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
    var element = 0;

    $(obj).each(function() {
        $(this).attr('id', element++);
    }); 
}

function addRow(obj) {
    // Append a row to gallery.
    // <div class="uber-row"></div>
    $(obj).append('<div class="' + galleryRowClass + '"></div>');
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
        $('.' + galleryRowClass).last().append(imgArr[i]); 

        // Add a new row if the length exceeds our quasi-random size.
        // Do not add a new row if we are at the end of the array and only 1 or 2 images remain.
        // The effect of a single-image row is ugly and a thing to be avoided.
        if ($('.' + galleryRowClass).last().children().size() >= rowLength && (imgArr.length - 1 - i) >= 2) {
            addRow(obj);
        }
    });
}

function newHeight(obj, amount) {
    // Change obj height to amount.
    $(obj).css('height', amount + 'px');
}

function newWidth(obj, amount) {
    // Change obj width to amount.
    $(obj).css('width', amount + 'px');
}

function center(obj) {
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

function resizeRowImages(obj) {
    // Resizes each row of images such as to evenly space their width and height. 
    var n = 0;
    $(obj).children('.' + galleryRowClass).each(function () {
        // Get total width of row through width of component images.
        var sum = getRowWidth(this);
        // Ratio between gallery width, and row width.
        var ratio = parseFloat($(obj).width() / sum);

        $(this).children('img').each(function () {
            // Change the height of the image by the ratio.
            // Add appropriate class for click events.
            var changedHeight = Math.round($(this).height() * ratio);
            newHeight(this, changedHeight);
            $(this).attr('class', n++);
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

// The different elements of the lightbox.
var lbElements = [
    lightboxClass + '-close',
    lightboxClass + '-nav',
    lightboxClass + '-txt',
    lightboxClass + '-img'
];

var lbNavElements = [
    '-left',
    '-right'
];

// Current lightbox gallery.
var cg = 0;
// Current lightbox image.
var ci  = 0;

// Two-dimensional array of /all/ gallery images on this page.
var galleryImages = [];

function addLightbox(obj) {
    // Lightbox should be prepended to <body> in order to avoid conflicts with other CSS.
    var dOpen = '<div class="';
    var dClose = '"></div>';

    // Attach lightbox to obj.
    $(obj).prepend(dOpen + lightboxClass + '">');

    // Attach all child elements to the lightbox. 
    $(lbElements).each(function(index, element) {
        $('.' + lightboxClass).append(dOpen + element + dClose);
    });

    // Navigation elements.
    $(lbNavElements).each(function(index, element) {
        $('.' + lbElements[1]).append(dOpen + lbElements[1] + element + dClose);
        $('.' + lbElements[2]).append(dOpen + lbElements[2] + element + dClose);
    });

    // Paragraph elements for text.
    $(lbNavElements).each(function(index, element) {
        $('.' + lbElements[2] + element).append('<p>');
    });

    // Image div.
    $('.' + lbElements[3]).append('<img src=" " alt=" " />');
}

function positionLightbox() {
    newHeight('.' + lightboxClass, $(window).height());
    $('.' + lbElements[0]).css('margin-left', $(window).width() - $('.' + lbElements[0]).width() + 'px');
    $('.' + lbElements[2]).css('top', $(window).height() * 0.85 + 'px'); 
}

function toggleLightbox() {
    // Toggle appearance of the lightbox.
    var a = $('.' + lightboxClass);
    var b = (a.css('display') === 'none') ? 'initial' : 'none';
    a.css('b', display);
}

function setLightboxImg(a) {
    // Set selected image in the lightbox.
    $('.' + lbElements[3] + ' img').attr('src', a);
}

function setLightboxText(a) {
    // Set visually reported alt text.
    $('.' + lbElements[2] + lbNavElements[0] + ' p').text(a);
}

function setLightboxCount(a, b) {
    // Set visually reported count.
    $('.' + lbElements[2] + lbNavElements[1] + ' p').text(a + '/' + b);
}

function updateLightbox(obj) {
    setLightboxImg(obj.src);
    setLightboxText($(obj).attr('alt'));
    setLightboxCount($(obj).attr('class'), galleryImages[cg].length);
}

function decrementLightboxImage() {
    ci -= (ci <= 0) ? 0 : 1; 
    updateLightbox(galleryImages[cg][ci]);
}

function incrementLightboxImage() {
    ci += (ci >= galleryImages[cg].length - 1) ? 0 : 1; 
    updateLightbox(galleryImages[cg][ci]);
}

$(window).load(function() {
    /*
        Gallery ordering.
    */

    // Give each gallery a unique ID starting from 0.
    addGalleryID('.' + galleryClass);

    $('.' + galleryClass).each(function() { 
        // Push each image in this gallery to a temporary array.
        var tmp = [];

        $(this).children('img').each(function() {
            tmp.push(this);
        });

        // Push temp array to multi-dimensional array of all images.
        galleryImages.push(tmp);
        // Add rows to the gallery.
        addGalleryRows(this);
        // Resize each row to gallery width. 
        resizeRowImages(this);
    });

    /*
        Lightbox ordering.
    */

    addLightbox('body');
    positionLightbox();
});

$(window).load(function() {
    /*
        Mouse click and keypress events.
    */

    $('.' + galleryClass + ' img').click(function() {
        // Set gallery and image within the gallery. 
        cg = parseInt($(this).closest('.' + galleryClass).attr('id'));
        ci   = parseInt($(this).attr('class'));
        // Set lightbox image and then display it.
        updateLightbox(galleryImages[cg][ci]);
        toggleLightbox();
    });

    $('.' + lbElements[0]).click(function() {
        // Hide lightbox when close button is clicked.
        toggleLightbox();
    });

    $('.' + lbElements[1] + lbNavElements[0]).click(function() {
        decrementLightboxImage();
    });

    $('.' + lbElements[1] + lbNavElements[1]).click(function() {
        incrementLightboxImage();
    });

    $('body').keyup(function(key) {
        switch (key.keyCode) {
            // Escape.
            case 27: toggleLightbox(); break;
            // Left arrow.
            case 37: decrementLightboxImage(); break;
            // Right arrow.
            case 39: incrementLightboxImage(); break;
            default: break;
        }
    });
});

$(window).resize(function() {
    $('.' + gal).each(function() { 
        resizeRowImages(this);
    });

    positionLightbox();
});
