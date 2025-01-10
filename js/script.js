var slide_hero=new Swiper(".slide-hero",{effect:"fade",pagination:{el:".slide-hero .main-area .area-explore .swiper-pagination"},autoplay:{delay:6e3}}),html=document.documentElement,btnDropdownSelect=document.querySelector(".js-open-select-custom"),msgNotFound=document.querySelector(".not-found"),ballonShowMore=document.querySelector(".ballon-show-more"),moreAbilities=document.querySelector(".more-abilities"),areaPokemons=document.getElementById("js-list-pokemons"),countPokemons=document.getElementById("js-count-pokemons"),btnShowMore=document.getElementById("js-btn-show-more"),firstLetterUpperCase=function(e){return e.charAt(0).toUpperCase()+e.slice(1)};function openDetailsPokemon(){html.classList.add("open-modal");var e=this.getAttribute("code-pokemon"),t=this.querySelector(".thumb-img"),n=this.querySelector(".info .icon img"),o=this.querySelector(".info h3"),a=this.querySelector(".info span"),s=document.getElementById("js-modal-details"),i=document.getElementById("js-image-type-modal"),c=document.getElementById("js-image-pokemon-modal"),l=document.getElementById("js-name-pokemon-modal"),d=document.getElementById("js-code-pokemon-modal"),r=document.getElementById("js-height-pokemon"),m=document.getElementById("js-weight-pokemon"),p=document.getElementById("js-main-abilities");s.setAttribute("typePokemonModal",this.classList[2]),c.setAttribute("src",t.getAttribute("src")),i.setAttribute("src",n.getAttribute("src")),l.textContent=o.textContent,d.textContent=a.textContent,axios({method:"GET",url:"https://pokeapi.co/api/v2/pokemon/".concat(e)}).then(function(e){function t(e){if(100<e)return 100}var o,a,e=e.data,e={mainAbilities:firstLetterUpperCase(e.abilities[0].ability.name),types:e.types,weight:e.weight,height:e.height,abilities:e.abilities,stats:e.stats,urlType:e.types[0].type.url},n=(r.textContent="".concat(e.height/10,"m"),m.textContent="".concat(e.weight/10,"kg"),p.textContent=e.mainAbilities,1<e.abilities.length&&(moreAbilities.classList.add("active"),ballonShowMore.innerHTML="",e.abilities.slice(1).forEach(function(e){var t=document.createElement("strong"),e=e.ability.name;t.textContent=firstLetterUpperCase(e),ballonShowMore.appendChild(t)}),moreAbilities.addEventListener("mouseenter",function(){ballonShowMore.classList.add("active")}),moreAbilities.addEventListener("mouseleave",function(){ballonShowMore.classList.remove("active")})),document.getElementById("js-stats-hp")),s=document.getElementById("js-stats-attack"),i=document.getElementById("js-stats-defense"),c=document.getElementById("js-stats-special-attack"),l=document.getElementById("js-stats-special-defense"),d=document.getElementById("js-stats-speed");n.style.width="".concat(t(e.stats[0].base_stat),"%"),s.style.width="".concat(t(e.stats[1].base_stat),"%"),i.style.width="".concat(t(e.stats[2].base_stat),"%"),c.style.width="".concat(t(e.stats[3].base_stat),"%"),l.style.width="".concat(t(e.stats[4].base_stat),"%"),d.style.width="".concat(t(e.stats[5].base_stat),"%"),(o=document.getElementById("js-types-pokemon")).innerHTML="",e.types.forEach(function(e){var t=document.createElement("li"),n=(o.appendChild(t),document.createElement("span"));n.classList="tag-type ".concat(e.type.name),n.textContent=firstLetterUpperCase(e.type.name),t.appendChild(n)}),(a=document.getElementById("js-area-weak")).innerHTML="",axios({method:"GET",url:"".concat(e.urlType)}).then(function(e){e.data.damage_relations.double_damage_from.forEach(function(e){var t=document.createElement("li"),n=(a.appendChild(t),document.createElement("span"));n.classList="tag-type ".concat(e.name),n.textContent=firstLetterUpperCase(e.name),t.appendChild(n)})})})}function closeDetailsPokemon(){html.classList.remove("open-modal")}btnDropdownSelect.addEventListener("click",function(){btnDropdownSelect.parentElement.classList.toggle("active")});var createCardPokemon=function(e,t,n,o){var a=document.createElement("button"),s=(a.classList="card-pokemon js-open-details-pokemon ".concat(t),a.setAttribute("code-pokemon",e),areaPokemons.appendChild(a),document.createElement("div")),i=(s.classList="image",a.appendChild(s),document.createElement("img")),o=(i.classList="thumb-img",i.setAttribute("src",o),s.appendChild(i),document.createElement("div")),s=(o.classList="info",a.appendChild(o),document.createElement("div")),i=(s.classList="text",o.appendChild(s),document.createElement("span")),a=(i.textContent=(e<10?"#00":e<100?"#0":"#").concat(e),s.appendChild(i),document.createElement("h3")),e=(a.textContent=firstLetterUpperCase(n),s.appendChild(a),document.createElement("div")),i=(e.classList="icon",o.appendChild(e),document.createElement("img"));i.setAttribute("src","./img/icon-types/".concat(t,".svg")),e.appendChild(i)},listingPokemons=function(e){axios({method:"GET",url:e}).then(function(e){var e=e.data,t=e.results;countPokemons.innerText=e.count,t.forEach(function(e){e=e.url;axios({method:"GET",url:"".concat(e)}).then(function(e){var e=e.data,e={code:e.id,nome:e.name,image:e.sprites.other.dream_world.front_default,type:e.types[0].type.name},e=(createCardPokemon(e.code,e.type,e.nome,e.image),document.querySelectorAll(".js-open-details-pokemon")),t=document.querySelectorAll(".js-close-details-pokemon");e.forEach(function(e){e.addEventListener("click",openDetailsPokemon)}),t.forEach(function(e){e.addEventListener("click",closeDetailsPokemon)})})})})},areaTypes=(listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0"),document.getElementById("js-type-area")),areaTypesMobile=document.querySelector(".dropdown-select"),bntLoadMore=(axios({method:"GET",url:"https://pokeapi.co/api/v2/type"}).then(function(e){e.data.results.forEach(function(e,t){var n,o,a;t<18&&(o=document.createElement("li"),areaTypes.appendChild(o),(n=document.createElement("button")).classList="type-filter ".concat(e.name),n.setAttribute("code-type",t+1),o.appendChild(n),(o=document.createElement("div")).classList="icon",n.appendChild(o),(a=document.createElement("img")).setAttribute("src","./img/icon-types/".concat(e.name,".svg")),o.appendChild(a),(o=document.createElement("span")).textContent="".concat(firstLetterUpperCase(e.name)),n.appendChild(o),a=document.createElement("li"),areaTypesMobile.appendChild(a),(n=document.createElement("button")).classList="type-filter ".concat(e.name),n.setAttribute("code-type",t+1),a.appendChild(n),(o=document.createElement("div")).classList="icon",n.appendChild(o),(t=document.createElement("img")).setAttribute("src","./img/icon-types/".concat(e.name,".svg")),o.appendChild(t),(a=document.createElement("span")).textContent="".concat(firstLetterUpperCase(e.name)),n.appendChild(a),document.querySelectorAll(".type-filter").forEach(function(e){e.addEventListener("click",filterByTypes)}))})}),document.getElementById("js-btn-load-more")),countPagination=9,showLoadPokemon=function(){listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=".concat(countPagination)),countPagination+=9};function filterByTypes(){var e=this.getAttribute("code-type"),t=document.querySelectorAll(".type-filter"),n=document.getElementById("js-btn-load-more");t.forEach(function(e){e.classList.remove("active")}),this.classList.add("active"),areaPokemons.innerHTML="",n.style.display="none",msgNotFound.style.display="none",inputSearch.value="";t=document.querySelector(".s-all-info-pokemons").offsetTop;window.scrollTo({top:t+288,behavior:"smooth"}),e?axios({method:"GET",url:"https://pokeapi.co/api/v2/type/".concat(e)}).then(function(e){e=e.data.pokemon;countPokemons.textContent=e.length,e.forEach(function(e){e=e.pokemon.url;axios({method:"GET",url:"".concat(e)}).then(function(e){var e=e.data,e={code:e.id,nome:e.name,image:e.sprites.other.dream_world.front_default,type:e.types[0].type.name},e=(e.image&&createCardPokemon(e.code,e.type,e.nome,e.image),document.querySelectorAll(".js-open-details-pokemon")),t=document.querySelectorAll(".js-close-details-pokemon");e.forEach(function(e){e.addEventListener("click",openDetailsPokemon)}),t.forEach(function(e){e.addEventListener("click",closeDetailsPokemon)})})})}):(areaPokemons.innerHTML="",listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0"),n.style.display="block")}bntLoadMore.addEventListener("click",showLoadPokemon);var btnSearch=document.getElementById("js-btn-search"),inputSearch=document.getElementById("js-input-search"),searchPokemon=(inputSearch.addEventListener("keyup",function(){""!==inputSearch.value?btnSearch.classList.add("active"):btnSearch.classList.remove("active")}),function(){var e=inputSearch.value.toLowerCase(),t=document.querySelectorAll(".type-filter");msgNotFound.style.display="none",t.forEach(function(e){e.classList.remove("active")}),axios({method:"GET",url:"https://pokeapi.co/api/v2/pokemon/".concat(e)}).then(function(e){areaPokemons.innerHTML="",bntLoadMore.style.display="none",countPokemons.textContent=1;var e=e.data,e={code:e.id,nome:e.name,image:e.sprites.other.dream_world.front_default,type:e.types[0].type.name},e=(createCardPokemon(e.code,e.type,e.nome,e.image),document.querySelectorAll(".js-open-details-pokemon")),t=document.querySelectorAll(".js-close-details-pokemon");e.forEach(function(e){e.addEventListener("click",openDetailsPokemon)}),t.forEach(function(e){e.addEventListener("click",closeDetailsPokemon)})}).catch(function(e){e.response&&(areaPokemons.innerHTML=""),bntLoadMore.style.display="none",countPokemons.textContent=0,msgNotFound.style.display="flex"})});inputSearch.addEventListener("keyup",function(e){"Enter"===e.code&&searchPokemon()}),btnSearch.addEventListener("click",searchPokemon);