function socialWidgetHeight() {
    // Widget width is dynamic and proportional to the div container size. 
    // Height = width.
    var soc = $('.social a');
    soc.css('height', soc.width() + 'px'); 
}

$(document).ready(
    function() {
        socialWidgetHeight();
    }
);

$(window).on('resize',
    function() {
        socialWidgetHeight();
    }
);