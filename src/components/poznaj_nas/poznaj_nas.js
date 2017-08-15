(function(){

   /***********************
      Funkcje
   ***********************/

   const getContent = (about) => {
      $.getJSON( './json/członkowie.json', function( data ) {

         // Utworznie zmiennej na content.
         let content = '';

         // Losowe sortowanie tablicy.
         data = shuffleArray(data);
         // Przełożenie tablicy na kod HTML.
         data.map((member) => {
            content += `
               <div class="members__member item">
                  <a class="member__img-link" href="${member.link}">
                     <img src="./img/członkowie/pomarańczowe/${member.zdjecie}" alt="Zdjęcie - ${member.imie_nazwisko}" class="member__img">
                  </a>
                  <p class="member__name">${member.imie_nazwisko}</p>
                  <p class="member__description">${member.opis}</p>
                  <div style="margin-top: auto;"></div>
               </div>
            `;
         });

         let owl = $('.owl-carousel');

         // Dodanie wygenerowanego HTML do strony.
         $('.members__wrapper').html(content).promise().then(() => {
            owl.owlCarousel({
               margin: 10,
               loop: true,
               items: 4,
               responsive : {
                  1650: {
                     items: 4,
                  },
                  1250: {
                     items: 3,
                  },
                  900: {
                     items: 2,
                  },
                  0: {
                     items: 1,
                  },
               }
            });
         });

         // Uruchomienie zdarzeń kliknięcia na strzałkach karuzeli.
         $('#members__left').click(() => { owl.trigger('prev.owl.carousel'); });
         $('#members__right').click(() => { owl.trigger('next.owl.carousel'); });
      });
   }


   /***********************
      Kod wykonywany
   ***********************/

   // Pobranie zawartości (członków).
   getContent();
})();
