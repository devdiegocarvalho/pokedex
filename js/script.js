var slide_hero=new Swiper(".slide-hero",{effect:"fade",pagination:{el:".slide-hero .main-area .area-explore .swiper-pagination"}}),cardsPokemon=document.querySelectorAll(".js-open-details-pokemon"),closeModal=document.querySelectorAll(".js-close-details-pokemon"),html=document.documentElement,openDetailsPodemon=function(e){e.addEventListener("click",function(){html.classList.add("open-modal")})},targetModal=function(e){e.addEventListener("click",function(){html.classList.remove("open-modal")})},btnDropdownSelect=(cardsPokemon.forEach(openDetailsPodemon),closeModal.forEach(targetModal),document.querySelector(".js-open-select-custom")),listingPokemons=(btnDropdownSelect.addEventListener("click",function(){btnDropdownSelect.parentElement.classList.toggle("active")}),function(e){axios({method:"GET",url:e}).then(function(e){var o=document.getElementById("js-count-pokemons"),e=e.data,n=e.results;o.innerText=e.count,n.forEach(function(e){e=e.url;console.log(e)})})});listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");