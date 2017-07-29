let global = {
   viewportHeight: $(window).height(),
}

$(window).resize(function() {
   global.viewportHeight = $(this).height();
});
