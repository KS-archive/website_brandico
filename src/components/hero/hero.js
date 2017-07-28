$(document).ready(function(){

	// Obiekt konfiguracyjny slidera.
	const slider = {
		iterationTime: 5000, // Czas między zmianą slajdów.
		backgrounds: [
			'./img/projekty/pomarańczowe/projekty_warsztaty.jpg',
			'./img/projekty/pomarańczowe/projekty_content_marketing.jpg',
			'./img/projekty/pomarańczowe/projekty_xfeb.JPG'
		], // Tła dla poszczególnych slajdów.
	};

	// Numer aktualnego slajdu.
	slider.actualSlide = 0;

	// Załadowanie pierwszego slajdu/hero.
	$('.hero__container').css('backgroundImage', `url(${slider.backgrounds[slider.actualSlide]})`);
	$('.hero__content').first().addClass('active');

	// Inicjalizacja slidera jeśli istnieje więcej niż 1 tło dla hero.
	(slider.backgrounds.length > 1) ? initializeSlider(slider) : $('.hero__controls').remove();
});

// Inicjalizacja slidera.
const initializeSlider = (slider) => {

	// Ustalenie liczby slajdów na podstawie liczby teł.
	slider.slidesNumber = slider.backgrounds.length;

	// Utworzenie kropek do zmiany slajdów.
	$('.hero__controls').html(createDots(slider.slidesNumber));

	// Ustawienie aktywnej kropki.
	$('.hero__control').first().addClass('active');

	// Dodanie obserwatorów zdarzeń do kropek.
	$('.hero__control').click((e) => {changeSlideOnClick(e, slider)});

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
	$('.hero__control').removeClass('active').eq(position).addClass('active');

	// Zmiana contentu.
	$('.hero__content').removeClass('active').eq(position).addClass('active');

	// Zmiana zdjęcia w tle.
	$('.hero__container').css('backgroundImage', `url(${slider.backgrounds[position]})`);

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
