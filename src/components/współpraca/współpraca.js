(function(){
   let owl0 = $('.partners__wrapper.carousel0.owl-carousel');
   let owl1 = $('.partners__wrapper.carousel1.owl-carousel');

   owl0.owlCarousel({
      loop: true,
      autoWidth: true,
      center: true,
   });

   owl1.owlCarousel({
      loop: true,
      autoWidth: true,
      center: true,
   });

   $('#partners__left0').click(() => { owl0.trigger('prev.owl.carousel'); });
   $('#partners__right0').click(() => { owl0.trigger('next.owl.carousel'); });
   $('#partners__left1').click(() => { owl1.trigger('prev.owl.carousel'); });
   $('#partners__right1').click(() => { owl1.trigger('next.owl.carousel'); });
})();
