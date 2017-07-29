(function(){

	let nav = {
		$navContainer: $('.nav__container'),
		isSticky: false,
	   viewportHeight: $(window).height(),
	}

	nav.height = nav.$navContainer.height();

	// Aktywacja pól przy kliknięciu.
	$('.nav__item').click(function() {
		$('.nav__item.active').removeClass('active');
		$(this).addClass('active');
	});

	// Sticky nav.
	$(window).scroll(function() {
		(nav.viewportHeight - nav.height > $(this).scrollTop())
			? nav.$navContainer.removeClass('sticky')
			: nav.$navContainer.addClass('sticky');
	});

	// Aktualizowanie rozmiarow viewportu.
	$(window).resize(function() {
	   nav.viewportHeight = $(this).height();
	});

})();
