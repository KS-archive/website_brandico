(function(){

   /***********************
      Funkcje
   ***********************/

   const getContent = (slider) => {
      $.getJSON( '../../json/projekty.json', function( data ) {

         for (let i=0; i < 2; i++) {
            let content = '';
            let dots = '';
            let projects = (i) ? data.zakończone : data.cykliczne;

            projects = shuffleArray(projects);

            projects.map((project) => {
               content += `
                  <div class="project__content" style="background-image: url(./img/projekty/pomarańczowe/${project.zdjęcie});">
                     <div class="project__name">${project.nazwa}</div>
                     <div class="project__line"></div>
                     <div class="project__description">${project.opis}</div>
                  </div>
               `;
               dots += '<div class="project__dot"></div>';
            });

            $(`#project${i}`).html(content);
            $(`#project${i}_dots`).html(dots);
         }

         initializeSlider(projects);
      });
   }

   // Inicjalizacja slidera.
   const initializeSlider = (projects) => {

      // Przypisanie kolekcji elementów do obiektu projektu.
      projects.$projectContentLeft = $('#project0 .project__content');
      projects.$projectContentRight = $('#project1 .project__content');
      projects.$projectDotsLeft = $('#project0_dots .project__dot');
      projects.$projectDotsRight = $('#project1_dots .project__dot');

   	// Ustawienie aktywnej kropki.
   	projects.$projectDotsLeft.first().addClass('active');
      projects.$projectDotsRight.first().addClass('active');
      projects.$projectContentLeft.first().addClass('active');
      projects.$projectContentRight.first().addClass('active');

   	// Dodanie obserwatorów zdarzeń do kropek.
   	projects.$projectDotsLeft.click((e) => {changeSProjectOnClick(e, projects, 0)});
      projects.$projectDotsRight.click((e) => {changeSProjectOnClick(e, projects, 1)});
   };

   // Zmiana slajdu powodowane przez kliknięcie na kropkę.
   const changeSProjectOnClick = (e, projects, which) => {

   	// Ustalenie indeksu klikniętej kropki.
   	let position = $(e.target).parent().children().index($(e.target));

   	// Zmiana aktywnego slajdu.
      if (which) {
         projects.$projectDotsRight.removeClass('active').eq(position).addClass('active');
      	 projects.$projectContentRight.removeClass('active').eq(position).addClass('active');
      } else {
         projects.$projectDotsLeft.removeClass('active').eq(position).addClass('active');
      	projects.$projectContentLeft.removeClass('active').eq(position).addClass('active');
      }
   }

   /***********************
      Kod wykonywany
   ***********************/

   const projects = {};

	getContent(projects);

})();
