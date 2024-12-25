// Slide script principal
var slide_hero = new Swiper(".slide-hero", {
  effect: "fade",
  pagination: {
    el: ".slide-hero .main-area .area-explore .swiper-pagination",
  },
});

const cardsPokemon = document.querySelectorAll(".js-open-details-pokemon");
const closeModal = document.querySelectorAll(".js-close-details-pokemon");
const html = document.documentElement;

const openDetailsPodemon = (card) => {
  card.addEventListener("click", () => {
    html.classList.add("open-modal");
  });
};

const targetModal = (modal) => {
  modal.addEventListener("click", () => {
    html.classList.remove("open-modal");
  });
};

cardsPokemon.forEach(openDetailsPodemon);
closeModal.forEach(targetModal);

const btnDropdownSelect = document.querySelector(".js-open-select-custom");

btnDropdownSelect.addEventListener("click", () => {
  btnDropdownSelect.parentElement.classList.toggle("active");
});

const listingPokemons = (urlApi) => {
  axios({
    method: "GET",
    url: urlApi,
  }).then((response) => {
    const countPokemons = document.getElementById("js-count-pokemons");

    const { results, next, count } = response.data;

    countPokemons.innerText = count;

    results.forEach((pokemon) => {
      const urlApiDetails = pokemon.url;

      console.log(urlApiDetails);
    });
  });
};

listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");
