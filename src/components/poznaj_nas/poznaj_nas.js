const getContent = () => {
   $.getJSON( '../../json/członkowie.json', function( data ) {

      let content = '';

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
   });
}

/***********************
   Kod wykonywany
***********************/

(function(){

   // Pobranie zawartości (członków).
   getContent();

})();
