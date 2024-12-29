// Slide script principal
var slide_hero = new Swiper(".slide-hero", {
  effect: "fade",
  pagination: {
    el: ".slide-hero .main-area .area-explore .swiper-pagination",
  },
});

const html = document.documentElement;
const btnDropdownSelect = document.querySelector(".js-open-select-custom");
const areaPokemons = document.getElementById("js-list-pokemons");

const firstLetterUperCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const openDetailsPokemon = (card) => {
  card.addEventListener("click", () => {
    html.classList.add("open-modal");
  });
};

const targetModal = (modal) => {
  modal.addEventListener("click", () => {
    html.classList.remove("open-modal");
  });
};

btnDropdownSelect.addEventListener("click", () => {
  btnDropdownSelect.parentElement.classList.toggle("active");
});

const createCardPokemon = (code, type, nome, imagePoke) => {
  const card = document.createElement("button");
  card.classList = `card-pokemon js-open-details-pokemon ${type}`;
  areaPokemons.appendChild(card);

  const image = document.createElement("div");
  image.classList = "image";
  card.appendChild(image);

  const imageSrc = document.createElement("img");
  imageSrc.classList = "thumb-img";
  imageSrc.setAttribute("src", imagePoke);
  image.appendChild(imageSrc);

  const infoCardPokemon = document.createElement("div");
  infoCardPokemon.classList = "info";
  card.appendChild(infoCardPokemon);

  const infoTextPokemon = document.createElement("div");
  infoTextPokemon.classList = "text";
  infoCardPokemon.appendChild(infoTextPokemon);

  const codePokemon = document.createElement("span");
  codePokemon.textContent =
    code < 10 ? `#00${code}` : code < 100 ? `#0${code}` : `#${code}`;
  infoTextPokemon.appendChild(codePokemon);

  const namePokemon = document.createElement("h3");
  namePokemon.textContent = firstLetterUperCase(nome);
  infoTextPokemon.appendChild(namePokemon);

  const areaIcon = document.createElement("div");
  areaIcon.classList = "icon";
  infoCardPokemon.appendChild(areaIcon);

  const imgType = document.createElement("img");
  imgType.setAttribute("src", `./img/icon-types/${type}.svg`);
  areaIcon.appendChild(imgType);
};

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

      axios({
        method: "GET",
        url: `${urlApiDetails}`,
      }).then((response) => {
        const { id, name, sprites, types } = response.data;

        const infoCard = {
          code: id,
          nome: name,
          image: sprites.other.dream_world.front_default,
          type: types[0].type.name,
        };

        createCardPokemon(
          infoCard.code,
          infoCard.type,
          infoCard.nome,
          infoCard.image
        );

        const cardsPokemon = document.querySelectorAll(
          ".js-open-details-pokemon"
        );
        const closeModal = document.querySelectorAll(
          ".js-close-details-pokemon"
        );

        cardsPokemon.forEach(openDetailsPokemon);
        closeModal.forEach(targetModal);
      });
    });
  });
};

listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");
