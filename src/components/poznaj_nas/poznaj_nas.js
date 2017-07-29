const getContent = (about) => {
   $.getJSON( '../../json/członkowie.json', function( data ) {

      let content = '';
      about.members = data;

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

      $('.members__wrapper-content').html(content);

      // Zmiana rozmiarów pól w karuzeli na bazie szerokości ekranu.
      changeDimensions();
   });
}

const changeDimensions = () => {
   let carouselWidth = $('.members__wrapper-content').width();
   let memberWidth = $('.members__member').outerWidth();
   let membersPerView = Math.floor(carouselWidth / memberWidth);
   let neededMargin = (carouselWidth - membersPerView * memberWidth) / ( 2 + (membersPerView - 1));
   $('.members__member:first-of-type').css('marginLeft', `${neededMargin}px`);
   $('.members__member:not(:last-of-type)').css('marginRight', `${neededMargin}px`);
}

/***********************
   Kod wykonywany
***********************/

(function(){

   const about = {
      members: [], // Kolokcja członków koła.
   }

   // Pobranie zawartości (członków).
   getContent(about);

   $(window).resize(function() {
      changeDimensions();
   });
})();
