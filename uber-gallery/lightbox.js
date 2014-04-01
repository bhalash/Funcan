
/*
    LIGHTBOX
*/

// Fetch gallery images on load.
var lbi = getGallerySrcs('.uber-gallery');
var alts = getRowAlts('.uber-row');
// Fetch gallery image attribute text.
// Current lightbox image.
var count = 0;

function getGallerySrcs(obj) {
    // Return the sources of all images in the div as an array.
    var images = [];

    $(obj + ' img').each(function() {
        images.push(this.src);
    });

    return images;
}

function getRowAlts(obj) {
    var alts = [];

    $('.uber-row').children().each(function() {
        alts.push($(this).attr('alt'));
    });

    return alts;
}

$('body').keyup(function(key) {
    // Works.
    switch (key.keyCode) {
        case 27: $('.uber-lightbox, .uber-lightbox-nav').css('display', 'none'); 
        case 37: decrementCount(); break;
        case 39: incrementCount(); break;    
        default: break;
    }
}); 

function decrementCount() {
    count -= (count <= 0) ? 0 : 1; 
    console.log(count);
}

function incrementCount() {
    count += (count >= lbi.length - 1) ? 0 : 1; 
    console.log(count);
}

$('.uber-lightbox-nav-left').click(function() {
    decrementCount();
    $('.uber-lightbox-photo').attr('src', lbi[count]);
    $('.uber-lightbox-blurb').text(alts[count]);
});

$('.uber-lightbox-nav-right').click(function() {
    incrementCount();
    $('.uber-lightbox-photo').attr('src', lbi[count]);
    $('.uber-lightbox-blurb').text(alts[count]);
});

$(function() {
    // Preload image and content for debug. 
    $('.uber-lightbox-photo').attr('src', lbi[0]);
    $('.uber-lightbox-blurb').text(alts[count]);
});