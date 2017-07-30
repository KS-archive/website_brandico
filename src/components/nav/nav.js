(function(){

   const smoothScroll = (e, id) => {
      let target = $(`#${id.split(' ')[0]}`);
      $('html, body').animate({
         scrollTop: (target.offset().top - nav.height - 60)
      }, 1000);
   };

   const checkActive = (nav) => {

      // Get container scroll position
      let fromTop = $(window).scrollTop() + nav.height + 61;

      // Get id of current scroll item
      let cur = nav.$navAnchors.map(function(){
         if ($(this).offset().top < fromTop) return $(this);
      });

      // Get the id of the current element
      cur = cur[cur.length-1];

      var navClass = '.A_' + cur.attr('id');

      if (nav.lastActive !== navClass) {
         nav.lastActive = navClass;
         $('.nav__item.active').removeClass('active');
   		$(navClass).addClass('active');
      }
   }

	let nav = {
		$navContainer: $('.nav__container'),
      $navFiller: $('.nav__filler'),
      $navItems: $('.nav__content').children(),
      $navAnchors: $('#hero, #dlaczego_brandico, #poznaj_nas, #projekty, #współpraca, #jak_dołączyć'),
		isSticky: false,
	   viewportHeight: $(window).height(),
      height: $('.nav__container').height(),
      lastActive: '',
	}

	// Aktywacja pól przy kliknięciu.
	$('.nav__item').click(function(e) {
		$('.nav__item.active').removeClass('active');
		$(this).addClass('active');
      smoothScroll(e, $(this).attr('class').split('A_')[1]);
	});

	// Sticky nav.
	$(window).scroll(function() {

      checkActive(nav);

		if (nav.viewportHeight - nav.height > $(this).scrollTop()) {
         nav.$navContainer.removeClass('sticky');
         nav.$navFiller.css('height', '0px');
      } else {
         nav.$navContainer.addClass('sticky');
         nav.$navFiller.css('height', '100px');
      }
	});

	// Aktualizowanie rozmiarow viewportu.
	$(window).resize(function() {
	   nav.viewportHeight = $(this).height();
	});

})();
