// Inicjalizacja slidera.
const initializeSlider = (slider) => {

	// Ustalenie liczby slajdów na podstawie liczby teł.
	slider.slidesNumber = slider.backgrounds.length;

	// Utworzenie kropek do zmiany slajdów.
	$('.hero__controls').html(createDots(slider.slidesNumber));
	slider.$heroControl = $('.hero__control');

	// Ustawienie aktywnej kropki.
	slider.$heroControl.first().addClass('active');

	// Dodanie obserwatorów zdarzeń do kropek.
	slider.$heroControl.click((e) => {changeSlideOnClick(e, slider)});

	// Rozpoczęcie interwalu do zmiany slajdów.
	slider.interval = setInterval(() => {
		changeSlideOnInterval(slider, slider.actualSlide);
	}, slider.iterationTime);
};

// Zmiana slajdu powodowane przez kliknięcie na kropkę.
const changeSlideOnClick = (e, slider) => {

	// Ustalenie indeksu klikniętej kropki.
	let position = $(e.target).parent().children().index($(e.target));

	// Zmiana aktywnego slajdu.
	activeChange(position, slider);

	// Reset interwalu do zmiany slajdów.
	clearInterval(slider.interval);

	// Monowne rozpoczęcie interwału.
	slider.interval = setInterval(() => {
		changeSlideOnInterval(slider, slider.actualSlide);
	}, slider.iterationTime);
}

// Zmiana slajdu powodowana przez interwał.
const changeSlideOnInterval = (slider, actualSlide) => {

	// Ustalenie indeksu slajdu do wyświetlenia.
	actualSlide = (actualSlide >= (slider.slidesNumber - 1)) ? 0 : actualSlide + 1;

	// Zmiana aktywnego slajdu.
	activeChange(actualSlide, slider);
}

// Zmiana aktywnego slajdu.
const activeChange = (position, slider) => {

	// Zmiana zaznaczonej kropki.
	slider.$heroControl.removeClass('active').eq(position).addClass('active');

	// Zmiana contentu.
	slider.$heroContent.removeClass('active').eq(position).addClass('active');

	// Zmiana zdjęcia w tle.
	slider.$heroContainer.css('backgroundImage', `url(${slider.backgrounds[position]})`);

	// Zaktualizowanie indeksu aktywnego slajdu.
	slider.actualSlide = position;
}

// Tworzy kropki do zmieniania slajdów.
const createDots = (number) => {

	// Utworzenie zmiennej na content.
	let content = '';

	// Dodanie do content odpowiedniej liczby kropek.
	for (let i = 0; i < number; i++) {
		content += '<div class="hero__control"></div>';
	}

	return content;
}

/***********************
   Kod wykonywany
***********************/

(function(){

   // Obiekt konfiguracyjny slidera.
   const slider = {
      actualSlide: 0, // Numer aktualnego slajdu.
      iterationTime: 5000, // Czas między zmianą slajdów.
      backgrounds: [], // Tła dla poszczególnych slajdów.
      $heroContent: $('.hero__content'), // Zawartośc wszystkich slajdów.
      $heroContainer: $('.hero__container'), // Główny div slidera.
   };

   // Dodanie teł to tablicy.
   document.querySelectorAll('.hero__content').forEach((el) => {
      slider.backgrounds.push(el.dataset.background);
   });

   // Załadowanie pierwszego slajdu/hero.
   slider.$heroContainer.css('backgroundImage', `url(${slider.backgrounds[slider.actualSlide]})`);
   slider.$heroContent.first().addClass('active');

   // Inicjalizacja slidera jeśli istnieje więcej niż 1 tło dla hero.
   (slider.backgrounds.length > 1) ? initializeSlider(slider) : $('.hero__controls').remove();

})();
