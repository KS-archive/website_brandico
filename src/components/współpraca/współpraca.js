(function(){

   /***********************
      Funkcje
   ***********************/

   // Obsługa zmian rozmiarów viewportu.
   // const changeDimensions = (partners) => {
   //
   //    // Szerokośc pola karuzeli.
   //    let carouselWidth = partners.$membersWrapperContent.width();
   //
   //    // Liczba jednocześnie widocznych członków koła.
   //    partners.membersPerView = Math.floor(carouselWidth / partners.memberWidth);
   //
   //    // Margines niezbędny dla zapewnienia oczekiwanego efektu.
   //    let neededMargin = (carouselWidth - partners.membersPerView * partners.memberWidth) / ( 2 + (partners.membersPerView - 1));
   //
   //    // Liczba pikseli do przesuwania slidera.
   //    partners.moveByPx = partners.memberWidth + neededMargin;
   //
   //    // Ustalenie pozycji na nowo.
   //    let leftPosition = -(partners.currentIndex * (neededMargin + partners.memberWidth));
   //    partners.$membersWrapperContent.css('left', leftPosition);
   //
   //    // Ustawienie marginesów.
   //    partners.$firstMember.css('marginLeft', `${neededMargin}px`);
   //    partners.$middleMembers.css('marginRight', `${neededMargin}px`);
   // }

   // Przesunięcie karuzeli w prawo.
   // const memberMoveRight = (about) => {
   //    if (about.currentIndex < about.membersLength - about.membersPerView) {
   //       about.$membersWrapperContent.animate({
   //          left: `-=${about.moveByPx}`,
   //       });
   //       about.currentIndex++;
   //    }
   // }

   // Przesunięcie karuzeli w lewo.
   // const memberMoveLeft = (about) => {
   //    if (about.currentIndex > 0) {
   //       about.$membersWrapperContent.animate({
   //          left: `+=${about.moveByPx}`,
   //       });
   //       about.currentIndex--;
   //    }
   // }

   const initialize = (partners) => {
      $('.partners__wrapper-content').each(function(i, el) {
         $(this).children().each(function(index, element) {
            if (partners[i].elementWidths) {
               partners[i].elementWidths.push($(element).outerWidth());
            }
         });
      });
      console.log(partners);
   }

   /***********************
      Kod wykonywany
   ***********************/

   const partners = [
      {
         elementWidths: [],
         $partnersWrapper: $('.partners__wrapper-content:first-child'),
      },
      {
         elementWidths: [],
         $partnersWrapper: $('.partners__wrapper-content:last-child'),
      },
   ];

   // Inicjalizacja karuzeli.
   initialize(partners);

   // Uruchomienie nasłuchiwania zmiany rozmiaru ekranu.
   // $(window).resize(function() {
   //    changeDimensions(about);
   // });
})();
