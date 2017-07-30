(function(){

   /***********************
      Funkcje
   ***********************/

   // Obsługa zmian rozmiarów viewportu.
   const changeDimensions = (partners) => {

      // Szerokośc pola karuzeli.
      let carouselWidth = partners[0].$partnersWrapper.width();

      // Liczba jednocześnie widocznych partnerów.
      for (let i = 0; i < 2; i++) {
         let totalWidth = 0;
         let neededMargin = 0;
         let mapping = true;
         partners[i].logosInView = 0;
         partners[i].elementWidths.map((el, index) => {
            if (index >= partners[i].leftIndex && mapping) {
               let extendWidth = totalWidth + el;
               if (extendWidth <= carouselWidth) {
                  totalWidth = extendWidth;
                  partners[i].logosInView++;
               } else {
                  mapping = false;
               }
            }
         });

         // Margines niezbędny dla zapewnienia oczekiwanego efektu.
         neededMargin = (carouselWidth - totalWidth) / ( 1 + partners[i].logosInView);

         // Liczba pikseli do przesuwania slidera.
         partners[i].moveRightByPx = partners[i].elementWidths[partners[i].leftIndex] + neededMargin;
         partners[i].moveLeftByPx = partners[i].elementWidths[partners[i].leftIndex + partners[i].logosInView] + neededMargin;

         // Ustalenie pozycji na nowo.
         let leftPosition = 0;
         for (let j = 0; j < partners[i].leftIndex; j++) {
            leftPosition += neededMargin + partners[i].elementWidths[j];
         }
         partners[i].$partnersWrapperContent.css('left', -leftPosition);

         // Ustawienie marginesów.
         $(partners[i].$firstMember).css('marginLeft', `${neededMargin}px`);
         $(partners[i].$middleMembers).css('marginRight', `${neededMargin}px`);
      }
   }

   // Przesunięcie karuzeli w prawo.
   const partnersMoveRight = (partners, index) => {
      if (partners[index].leftIndex < partners[index].elementWidths.length - partners[index].logosInView) {
         partners[index].$partnersWrapperContent.animate({
            left: `-=${partners[index].moveRightByPx}`,
         }, () => {
            partners[index].leftIndex++;
            changeDimensions(partners);
         });
      }
   }

   // Przesunięcie karuzeli w lewo.
   const partnersMoveLeft = (partners, index) => {
      if (partners[index].leftIndex > 0) {
         partners[index].$partnersWrapperContent.animate({
            left: `+=${partners[index].moveLeftByPx}`,
         }, () => {
            partners[index].leftIndex--;
            changeDimensions(partners);
         });
      }
   }

   const initialize = (partners) => {
      $('.partners__wrapper-content').each(function(i, el) {
         $(this).children().each(function(index, element) {
            if (partners[i].elementWidths) {
               partners[i].elementWidths.push($(element).outerWidth());
            }
         });
      });
      changeDimensions(partners);
      $('#partners__left0').click(() => { partnersMoveLeft(partners, 0);});
      $('#partners__right0').click(() => { partnersMoveRight(partners, 0); });
      $('#partners__left1').click(() => { partnersMoveLeft(partners, 1); });
      $('#partners__right1').click(() => { partnersMoveRight(partners, 1); });
   }

   /***********************
      Kod wykonywany
   ***********************/

   const partners = [{},{}];

   $.fn.pop = function() {
        var top = this.get(-1);
        this.splice(this.length-1,1);
        return this;
    };

   // Konstruowanie obiektu partnerów.
   for (let i = 0; i < 2; i++) {
      partners[i].elementWidths = [];
      partners[i].$partnersWrapperContent = $($('.partners__wrapper-content')[i]);
      partners[i].$partnersWrapper = $($('.partners__wrapper')[i]);
      partners[i].leftIndex = 0;
      partners[i].logosInView = 0;
      partners[i].moveLeftByPx = 0;
      partners[i].moveRightByPx = 0;
      partners[i].$firstMember = partners[i].$partnersWrapperContent.children()[0];
      partners[i].$middleMembers = partners[i].$partnersWrapperContent.children().pop();
   }

   // Inicjalizacja karuzeli.
   initialize(partners);

   // Uruchomienie nasłuchiwania zmiany rozmiaru ekranu.
   $(window).resize(function() {
      changeDimensions(partners);
   });
})();
