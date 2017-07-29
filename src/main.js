let global = {
   viewportHeight: $(window).height(),
   viewportWidth: $(window).width(),
}

$(window).resize(function() {
   global.viewportHeight = $(this).height();
   global.viewportWidth = $(this).width();
});
