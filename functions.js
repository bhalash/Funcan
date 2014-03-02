// Break point before the site switches from "desktop" mode to "mobile" mode.
bp = 1025;

function headerSize() {
    // Header container size + back overlay size.
    var a = $('header');
    var b = $('#header-screen');

    // Shrinks header size below the break point.
    if ($(window).width() > bp) {
        a.css('height', $(window).height());
    }
    else {
        a.css('height', ($(window).height() * 0.75));
    }
    
    // Black overlay that darkens the image. 
    b.css('height', a.height());
}

function headerTitlePos() {
    // Header title positon.
    var a = $('#site-title');
    var b = a.height();
    var c = $('header').height();

    // 50% header height - half of 50% the h1 height, to center vertically. 
    if ($(window).width() > bp) {
        a.css('padding-top', (c * 0.5) - (b * 0.5));
    }
    else {
        a.css('padding-top', (c * 0.5) - (b * 0.5));
    }

}

function containerSizes() {
    // Set the width of content-container.
    var a = $('#content-container');
    var b = $('#content-col-0');
    var c = $('#content-col-1');

    if ($(window).width() > bp) {
        a.css('width', '85%');
    }
    else {
        a.css('width', '100%');
    }
} 

function containerFloats() {
    // Sets floats and widths for the left and right columns.
    var a = $('#content-col-0');
    var b = $('#content-col-1');

    if ($(window).width() > bp) {
        a.css('float', 'left');
        b.css('float', 'right'); 
 
        a.css('width', '80%');
        b.css('width', '20%');
    }
    else {
        a.css('float', 'none');
        b.css('float', 'none'); 

        a.css('width', '100%');
        b.css('width', '100%');
    }
}

function clearSearch(obj) {
    // Clears the default value from inputs.
    var str = '> search';

    if (obj.value == str) {
        obj.value = '';
    }
}

function restoreSearch(obj) {
    // Restore the default value to inputs if they are empty.
    var str = '> search';

    if (obj.value == '') {
        obj.value = str;
    }
}

$(document).ready(
    function() {
        containerFloats();
        containerSizes();
        headerSize();
        headerTitlePos();
    }
);

$(window).on('resize',
    function() {
        containerFloats();
        containerSizes();
        headerSize();
        headerTitlePos();
    }
);    