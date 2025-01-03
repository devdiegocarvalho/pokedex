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
const countPokemons = document.getElementById("js-count-pokemons");

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

// listar todos os tipos de pokemons

const areaTypes = document.getElementById("js-type-area");
const areaTypesMobile = document.querySelector(".dropdown-select");

axios({
  method: "GET",
  url: "https://pokeapi.co/api/v2/type",
}).then((response) => {
  const { results } = response.data;

  results.forEach((type, index) => {
    if (index < 18) {
      const itemType = document.createElement("li");
      areaTypes.appendChild(itemType);

      const buttonType = document.createElement("button");
      buttonType.classList = `type-filter ${type.name}`;
      buttonType.setAttribute("code-type", index + 1);
      itemType.appendChild(buttonType);

      const iconType = document.createElement("div");
      iconType.classList = "icon";
      buttonType.appendChild(iconType);

      const imgType = document.createElement("img");
      imgType.setAttribute("src", `./img/icon-types/${type.name}.svg`);
      iconType.appendChild(imgType);

      const nameType = document.createElement("span");
      nameType.textContent = `${firstLetterUperCase(type.name)}`;
      buttonType.appendChild(nameType);

      // Select Mobile

      const itemTypeMobile = document.createElement("li");
      areaTypesMobile.appendChild(itemTypeMobile);

      const buttonTypeMobile = document.createElement("button");
      buttonTypeMobile.classList = `type-filter ${type.name}`;
      buttonTypeMobile.setAttribute("code-type", index + 1);
      itemTypeMobile.appendChild(buttonTypeMobile);

      const iconTypeMobile = document.createElement("div");
      iconTypeMobile.classList = "icon";
      buttonTypeMobile.appendChild(iconTypeMobile);

      const imgTypeMobile = document.createElement("img");
      imgTypeMobile.setAttribute("src", `./img/icon-types/${type.name}.svg`);
      iconTypeMobile.appendChild(imgTypeMobile);

      const nameTypeMobile = document.createElement("span");
      nameTypeMobile.textContent = `${firstLetterUperCase(type.name)}`;
      buttonTypeMobile.appendChild(nameTypeMobile);

      const allTypes = document.querySelectorAll(".type-filter");

      allTypes.forEach((button) => {
        button.addEventListener("click", filterByTypes);
      });
    }
  });
});

// Load More

const bntLoadMore = document.getElementById("js-btn-load-more");

let countPagination = 9;

const showLoadPokemon = () => {
  listingPokemons(
    `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPagination}`
  );

  countPagination += 9;
};

bntLoadMore.addEventListener("click", showLoadPokemon);

// Type filter

function filterByTypes() {
  let idPokemon = this.getAttribute("code-type");

  const allTypes = document.querySelectorAll(".type-filter");
  const btnLoadMore = document.getElementById("js-btn-load-more");

  allTypes.forEach((type) => {
    type.classList.remove("active");
  });

  this.classList.add("active");
  areaPokemons.innerHTML = "";
  btnLoadMore.style.display = "none";

  const sectionPokemons = document.querySelector(".s-all-info-pokemons");
  const topSection = sectionPokemons.offsetTop;

  window.scrollTo({
    top: topSection + 288,
    behavior: "smooth",
  });

  if (idPokemon) {
    axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/type/${idPokemon}`,
    }).then((response) => {
      const { pokemon } = response.data;

      countPokemons.textContent = pokemon.length;

      pokemon.forEach((pok) => {
        const { url } = pok.pokemon;

        axios({
          method: "GET",
          url: `${url}`,
        }).then((response) => {
          const { id, name, sprites, types } = response.data;

          const infoCard = {
            code: id,
            nome: name,
            image: sprites.other.dream_world.front_default,
            type: types[0].type.name,
          };

          if (infoCard.image) {
            createCardPokemon(
              infoCard.code,
              infoCard.type,
              infoCard.nome,
              infoCard.image
            );
          }

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
  } else {
    areaPokemons.innerHTML = "";

    listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");

    btnLoadMore.style.display = "block";
  }
}

// Seach Pokemons

const btnSearch = document.getElementById("js-btn-search");
const inputSearch = document.getElementById("js-input-search");

const searchPokemon = () => {
  let valueInput = inputSearch.value.toLowerCase();
  const typeFilter = document.querySelectorAll(".type-filter");

  typeFilter.forEach((type) => {
    type.classList.remove("active");
  });

  axios({
    method: "GET",
    url: `https://pokeapi.co/api/v2/pokemon/${valueInput}`,
  })
    .then((response) => {
      areaPokemons.innerHTML = "";
      bntLoadMore.style.display = "none";
      countPokemons.textContent = 1;

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
      const closeModal = document.querySelectorAll(".js-close-details-pokemon");

      cardsPokemon.forEach(openDetailsPokemon);
      closeModal.forEach(targetModal);
    })
    .catch((error) => {
      if (error.response) areaPokemons.innerHTML = "";
      bntLoadMore.style.display = "none";
      countPokemons.textContent = 0;
      alert("Não foi encontra nenhum resultado com esta pesquisa!");
    });
};

inputSearch.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    searchPokemon();
  }
});

btnSearch.addEventListener("click", searchPokemon);
