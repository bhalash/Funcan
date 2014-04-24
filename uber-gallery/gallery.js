// Gallery, row, and img classes.
// UPDATE GALLERY.CSS IF YOU CHANGE THESE!!!!
var customClass     = 'funcan';
var galleryClass    = '.' + customClass + '-gallery';
var galleryRowClass = '.' + customClass + '-row';
var lightboxClass   = '.' + customClass + '-lightbox';
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
        $(galleryRowClass).last().append(imgArr[i]); 

        // Add a new row if the length exceeds our quasi-random size.
        // Do not add a new row if we are at the end of the array and only 1 or 2 images remain.
        // The effect of a single-image row is ugly and a thing to be avoided.
        if ($(galleryRowClass).last().children().size() >= rowLength && (imgArr.length - 1 - i) >= 2) {
            addRow(obj);
        }
    });
}

function vertCenter(obj) {
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
    $(obj).children(galleryRowClass).each(function () {
        // Get total width of row through width of component images.
        var sum = getRowWidth(this);
        // Ratio between gallery width, and row width.
        var ratio = parseFloat($(obj).width() / sum);

        $(this).children('img').each(function () {
            // Change the height of the image by the ratio.
            var changedHeight = Math.round($(this).height() * ratio);
            $(this).css('height', changedHeight + 'px');
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

var lbElements = [
    // The different elements of the lightbox.
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
var clg = 0;
// Current lightbox image.
var cli = 0;

// Two-dimensional array of /all/ gallery images on this page.
var galleryImages = [];

function addLightbox(obj) {
    // Lightbox should be prepended to <body> in order to avoid conflicts with other CSS.
    var divOpen = '<div class="';
    var divClose = '"></div>';

    // Attach lightbox to obj.
    $(obj).prepend(divOpen + lightboxClass + '">');

    $(lbElements).each(function(i, e) {
        // Attach all child elements to the lightbox. 
        $(lightboxClass).append(divOpen + e + divClose);
    });

    // Close button.
    $(lbElements[0]).append('<a href="javascript:void(0)">X</a>');

    $(lbNavElements).each(function(i, e) {
        // Navigation elements.
        $(lbElements[1]).append(divOpen + lbElements[1] + e + divClose);
        $(lbElements[2]).append(divOpen + lbElements[2] + e + divClose);
    });

    $(lbNavElements).each(function(index, element) {
        // Paragraph elements for text.
        var arrow = (index === 0) ? '&lt;&lt;' : '&gt;&gt;';
        $(lbElements[2] + element).append('<p>');
        $(lbElements[1] + element).append('<a href="javascript:void(0)">' + arrow + '</a>');
    });

    // Image div.
    $(lbElements[3]).append('<img src=" " alt=" " />');
}

function positionLightbox() {
    $(lightboxClass).css('height', $(window).height() + 'px');
    $(lbElements[0]).css('margin-left', $(window).width() - $(lbElements[0]).width() + 'px');
}

function toggleLightbox() {
    $(lightboxClass).toggle(); 
}

function setLightboxImage(imgSrc) {
    var img = $(lbElements[3] + ' img');
    img.attr('src', imgSrc);

    $(img).load(function() {
        // Have to wait for image to load before I center it.
        // Get 0 width/height otherwise.
        shrinkLightboxImage();
        vertCenter(this);
    });
}

function shrinkLightboxImage() {
    // Shrink image to fit if it is larger than the window.
    var img = $(lbElements[3] + ' img');

    if (img.width() >= $(window).width() || img.height() >= $(window).height()) {
        var wd = img.width()  - $(window).width();
        var hd = img.height() - $(window).height();

        if (wd >= hd) {
            img.css('max-width', '99%');
            img.css('height', 'auto');
        } else {
            img.css('max-height', '99%');
            img.css('width', 'auto');
        }
    }
}

function setLightboxText(txt) {
    // Set alt text display.
    $(lbElements[2] + lbNavElements[0] + ' p').text(txt);
}

function setLightboxCount(current, total) {
    // Set current / total count.
    $(lbElements[2] + lbNavElements[1] + ' p').text(current + '/' + total);
}

function updateLightbox(obj) {
    // Pass image to this.
    setLightboxImage(obj.src);
    setLightboxText($(obj).attr('alt'));
    setLightboxCount(parseInt($(obj).attr('class')) + 1, galleryImages[clg].length);
    positionLightbox();
}

function decrementLightboxImage() {
    cli -= (cli <= 0) ? 0 : 1; 
    updateLightbox(galleryImages[clg][cli]);
}

function incrementLightboxImage() {
    cli += (cli >= galleryImages[clg].length - 1) ? 0 : 1; 
    updateLightbox(galleryImages[clg][cli]);
}

$(window).load(function() {
    /*
     * Gallery load events.
     */

    // Give each gallery a unique ID starting from 0.
    addGalleryID(galleryClass);

    $(galleryClass).each(function() { 
        // Build muilt-dimensional array that contains every image on page.
        // [0][0] is first gallery, first image, etc.
        var tmp = [];

        $(this).children('img').each(function() {
            tmp.push(this);
        });

        galleryImages.push(tmp);
        addGalleryRows(this);
        resizeRowImages(this);
    });

    /*
     * Lightbox load events.
     */

    addLightbox('body');
    updateLightbox(galleryImages[clg][cli]);
});

$(window).load(function() {
    /*
     * Mouse click and keypress events.
     */

    $(galleryClass + ' img').click(function() {
        // Set gallery and image within the gallery. 
        clg = parseInt($(this).closest(galleryClass).attr('id'));
        cli = parseInt($(this).attr('class'));
        // Set lightbox image and then display it.
        updateLightbox(galleryImages[clg][cli]);
        toggleLightbox();
    });

    $(lbElements[0] + ' a').click(function() {
        toggleLightbox();
    });

    $(lbElements[1] + lbNavElements[0]).click(function() {
        decrementLightboxImage();
    });

    $(lbElements[1] + lbNavElements[1]).click(function() {
        incrementLightboxImage();
    });

    $('body').keyup(function(key) {
        switch (key.keyCode) {
            case 27: toggleLightbox(); break;
            case 37: decrementLightboxImage(); break;
            case 39: incrementLightboxImage(); break;
            default: break;
        }
    });
});

$(window).resize(function() {
    $(galleryClass).each(function() { 
        resizeRowImages(this);
    });

    updateLightbox(galleryImages[clg][cli]);
});
