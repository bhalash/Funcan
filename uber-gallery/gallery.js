// Gallery, row, and img classes.
// UPDATE GALLERY.CSS IF YOU CHANGE THESE!!!!
var customClass   = '.funcan';
var galleryClass  = customClass + '-gallery';
var rowClass      = customClass + '-row';
var lightboxClass = customClass + '-lightbox';
// Lightbox div elements.
var lightboxElements = [
    lightboxClass + '-close',
    lightboxClass + '-nav',
    lightboxClass + '-txt',
    lightboxClass + '-img'
];
// Lightbox navigation/text div elements.
var lightboxNavigation = ['-left', '-right'];
// Row lengths will inclusively range between min and max.
var rowSizeMin  = 4;
var rowSizeMax  = 6;
// For mobile views. Fixed width.
var rowSizeTiny = 3;
// Break point before switching to mobile view.
var mobileSize  = 880;
// Include image alt text as anchor title?
var altAsTitle  = false;
// Debug. Replace anchor hyperlinks with "javascript:void(0)".
var voidHref    = true;
// Two-dimensional array of all gallery images on this page.
var galleryImages = [];
// Current lightbox gallery.
var clg = 0;
// Current lightbox image.
var cli = 0;

/*
 * GALLERY
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
    var row = rowClass.substring(1);
    $(obj).append('<div class="' + row + '"></div>');
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
        $(rowClass).last().append(imgArr[i]); 

        // Add a new row if the length exceeds our quasi-random size.
        // Do not add a new row if we are at the end of the array and only 1 or 2 images remain.
        // The effect of a single-image row is ugly and a thing to be avoided.
        if ($(rowClass).last().children().size() >= rowLength && (imgArr.length - 1 - i) >= 2) {
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

function updateGallery(obj) {
    // Resizes each row of images such as to evenly space their width and height. 
    var n = 0;
    $(obj).children(rowClass).each(function () {
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

function addLightbox(obj) {
    // Lightbox should be prepended to <body> in order to avoid conflicts with other CSS.
    var divOpen  = '<div class="';
    var divClose = '"></div>';

    // Attach lightbox to obj.
    $(obj).prepend(divOpen + lightboxClass.substring(1) + '">');

    $(lightboxElements).each(function(i, e) {
        // Attach all child elements to the lightbox. 
        $(lightboxClass).append(divOpen + e.substring(1) + divClose);
    });

    // Close button.
    $(lightboxElements[0]).append('<a href="javascript:void(0)">X</a>');

    $(lightboxNavigation).each(function(i, e) {
        // Navigation elements.
        $(lightboxElements[1]).append(divOpen + lightboxElements[1].substring(1) + e + divClose);
        $(lightboxElements[2]).append(divOpen + lightboxElements[2].substring(1) + e + divClose);
    });

    $(lightboxNavigation).each(function(i, e) {
        // Paragraph elements for text.
        var arrow = (i === 0) ? '&lt;' : '&gt;';
        $(lightboxElements[2] + e).append('<p>');
        $(lightboxElements[1] + e).append('<a href="javascript:void(0)">' + arrow + '</a>');
    });

    // Image div.
    $(lightboxElements[3]).append('<img src=" " alt=" " />');
}

function positionLightbox() {
    $(lightboxClass).css('height', $(window).height() + 'px');
    $(lightboxElements[0]).css('margin-left', $(window).width() - $(lightboxElements[0]).width() + 'px');
    $(lightboxElements[2]).css('margin-top', $(window).height() * 0.9 + 'px');
    $(lightboxElements[2] + ' p').css('line-height', $(window).height() * 0.1 + 'px');
}

function toggleLightbox() {
    $(lightboxClass).toggle(); 
}

function setLightboxImage(imgSrc) {
    var img = $(lightboxElements[3] + ' img');
    img.attr('src', imgSrc);

    img.load(function() {
        // Have to wait for image to load before I center it.
        // Get 0 width/height otherwise.
        shrinkLightboxImage();
        vertCenter(this);
    });
}

function shrinkLightboxImage() {
    // Firefox and Internet Explorer ignore max-width and max-height for the lightbox image.
    var img = $(lightboxElements[3] + ' img');

    if (img.width() >= $(window).width() || img.height() >= $(window).height()) {
        var wd = img.width()  - $(window).width();
        var hd = img.height() - $(window).height();

        if (wd >= hd) {
            img.css('max-width', $(window).width() * 0.97);
            img.css('height', 'auto');
        } else {
            img.css('max-height', $(window).height() * 0.97);
            img.css('width', 'auto');
        }
    }
}

function setLightboxText(txt) {
    // Set alt text display.
    var box = $(lightboxElements[2] + lightboxNavigation[0]);
    box.empty();
    box.append('<p>' + txt + '</p>');
}

function setLightboxCount(current, total) {
    // Set current / total count.
    var box = $(lightboxElements[2] + lightboxNavigation[1] + ' p');
    box.text(current + '/' + total);
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

    addGalleryID(galleryClass);

    $(galleryClass).each(function() { 
        var tmp = [];

        $(this).children('img').each(function() {
            tmp.push(this);
        });

        galleryImages.push(tmp);
        addGalleryRows(this);
        updateGallery(this);
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
        clg = parseInt($(this).closest(galleryClass).attr('id'));
        cli = parseInt($(this).attr('class'));
        updateLightbox(galleryImages[clg][cli]);
        $(lightboxClass).toggle(); 
    });

    $(lightboxElements[0] + ' a').click(function() {
        $(lightboxClass).toggle(); 
    });

    $(lightboxElements[1] + lightboxNavigation[0]).click(function() {
        decrementLightboxImage();
    });

    $(lightboxElements[1] + lightboxNavigation[1]).click(function() {
        incrementLightboxImage();
    });

    $('body').keyup(function(key) {
        switch (key.keyCode) {
            case 27: $(lightboxClass).toggle(); break;
            case 37: decrementLightboxImage(); break;
            case 39: incrementLightboxImage(); break;
            default: break;
        }
    });
});
