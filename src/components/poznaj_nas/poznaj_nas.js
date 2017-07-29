(function(){

   /***********************
      Funkcje
   ***********************/

   const getContent = (about) => {
      $.getJSON( '../../json/członkowie.json', function( data ) {

         // Utworznie zmiennej na content.
         let content = '';

         // Zapisanie ilości członków kola do tablicy.
         about.membersLength = data.length;

         // Losowe sortowanie tablicy.
         data = shuffleArray(data);

         // Przełożenie tablicy na kod HTML.
         data.map((member) => {
            content += `
               <div class="members__member">
                  <a class="member__img-link" href="${member.link}">
                     <img src="./img/członkowie/pomarańczowe/${member.zdjecie}" alt="Zdjęcie - ${member.imie_nazwisko}" class="member__img">
                  </a>
                  <p class="member__name">${member.imie_nazwisko}</p>
                  <p class="member__description">${member.opis}</p>
                  <div style="margin-top: auto;"></div>
               </div>
            `;
         });

         // Dodanie wygenerowanego HTML do strony.
         $('.members__wrapper-content').html(content);

         // Dodawanie właściwości do obiektu.
         about.memberWidth = $('.members__member').outerWidth();
         about.$membersWrapperContent = $('.members__wrapper-content');
         about.$firstMember = $('.members__member:first-of-type');
         about.$middleMembers = $('.members__member:not(:last-of-type)');

         // Zmiana rozmiarów pól w karuzeli na bazie szerokości ekranu.
         changeDimensions(about);

         // Uruchomienie zdarzeń kliknięcia na strzałkach karuzeli.
         $('#members__left').click(() => { memberMoveLeft(about) });
         $('#members__right').click(() => { memberMoveRight(about) });
      });
   }

   // Obsługa zmian rozmiarów viewportu.
   const changeDimensions = (about) => {

      // Szerokośc pola karuzeli.
      let carouselWidth = about.$membersWrapperContent.width();

      // Liczba jednocześnie widocznych członków koła.
      about.membersPerView = Math.floor(carouselWidth / about.memberWidth);

      // Margines niezbędny dla zapewnienia oczekiwanego efektu.
      let neededMargin = (carouselWidth - about.membersPerView * about.memberWidth) / ( 2 + (about.membersPerView - 1));

      // Liczba pikseli do przesuwania slidera.
      about.moveByPx = about.memberWidth + neededMargin;

      // Ustalenie pozycji na nowo.
      let leftPosition = -(about.currentIndex * (neededMargin + about.memberWidth));
      about.$membersWrapperContent.css('left', leftPosition);

      // Ustawienie marginesów.
      about.$firstMember.css('marginLeft', `${neededMargin}px`);
      about.$middleMembers.css('marginRight', `${neededMargin}px`);
   }

   // Przesunięcie karuzeli w prawo.
   const memberMoveRight = (about) => {
      if (about.currentIndex < about.membersLength - about.membersPerView) {
         about.$membersWrapperContent.animate({
            left: `-=${about.moveByPx}`,
         });
         about.currentIndex++;
      }
   }

   // Przesunięcie karuzeli w lewo.
   const memberMoveLeft = (about) => {
      if (about.currentIndex > 0) {
         about.$membersWrapperContent.animate({
            left: `+=${about.moveByPx}`,
         });
         about.currentIndex--;
      }
   }

   /***********************
      Kod wykonywany
   ***********************/

   const about = {
      membersLength: 0, // Liczba członków koła w tablicy members.
      memberWidth: 0, // Szerokośc pola z członkiem koła.
      moveByPx: 0, // Informacja o ile px przesuwac karuzelę (członek + margines).
      currentIndex: 0, // Indeks elementu z lewej strony karuzeli.
      membersPerView: 0, // Liczba osób jednocześnie widocznych.
   }

   // Pobranie zawartości (członków).
   getContent(about);

   // Uruchomienie nasłuchiwania zmiany rozmiaru ekranu.
   $(window).resize(function() {
      changeDimensions(about);
   });
})();
