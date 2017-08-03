(function(){

   const toggleLogo = (nav) => {
      if (nav.viewportWidth <= 1190) {
         nav.$navContainer.css('background-color', 'transparent').css('box-shadow', 'none');
         (nav.viewportHeight - nav.height < $(window).scrollTop()) ? $('.nav__container').hide() : $('.nav__container').show();
      } else {
         nav.$navContainer.css('background-color', '#fff');
      }
   }

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
         $('.nav__item.active, .nav__item--mobile.active').removeClass('active');
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
      viewportWidth: $(window).width(),
      height: $('.nav__container').height(),
      lastActive: '',
	}

	// Aktywacja pól przy kliknięciu.
	$('.nav__item').click(function(e) {
		$('.nav__item.active').removeClass('active');
		$(this).addClass('active');
      smoothScroll(e, $(this).attr('class').split('A_')[1]);
	});

   $('.nav__item--mobile').click(function(e) {
		$('.nav__item--mobile.active').removeClass('active');
      $('.nav__container--mobile').fadeToggle();
		$(this).addClass('active');
      smoothScroll(e, $(this).attr('class').split('A_')[1]);
	});

   toggleLogo(nav);

	// Sticky nav.
	$(window).scroll(function() {

      checkActive(nav);

      if (nav.viewportHeight > $(this).scrollTop()) {
         $('.nav__burger').removeClass('orange');
      } else {
         $('.nav__burger').addClass('orange')
      }

		if (nav.viewportHeight - nav.height > $(this).scrollTop()) {
         nav.$navContainer.removeClass('sticky').css('height', '100px');
         nav.$navFiller.css('height', '0px');
      } else {
         nav.$navContainer.addClass('sticky').css('height', '80px');
         nav.$navFiller.css('height', '100px');
      }
      toggleLogo(nav);
	});

	// Aktualizowanie rozmiarow viewportu.
	$(window).resize(function() {
	   nav.viewportHeight = $(this).height();
      nav.viewportWidth = $(this).width();
      toggleLogo(nav);
	});

   $('.nav__burger').click(() => {
      $('.nav__container--mobile').fadeToggle();
   });

})();
