// Principal Slide Script
var slide_hero = new Swiper(".slide-hero", {
  effect: "fade",
  pagination: {
    el: ".slide-hero .main-area .area-explore .swiper-pagination",
  },
  autoplay: {
    delay: 6000,
  },
});

const html = document.documentElement;
const btnDropdownSelect = document.querySelector(".js-open-select-custom");
const msgNotFound = document.querySelector(".not-found");
const ballonShowMore = document.querySelector(".ballon-show-more");
const moreAbilities = document.querySelector(".more-abilities");
const areaPokemons = document.getElementById("js-list-pokemons");
const countPokemons = document.getElementById("js-count-pokemons");
const btnShowMore = document.getElementById("js-btn-show-more");

const firstLetterUpperCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function openDetailsPokemon() {
  html.classList.add("open-modal");

  let codePokemon = this.getAttribute("code-pokemon");
  let imagePokemon = this.querySelector(".thumb-img");
  let iconTypePokemon = this.querySelector(".info .icon img");
  let namePokemon = this.querySelector(".info h3");
  let codeStringPokemon = this.querySelector(".info span");

  const modalDetails = document.getElementById("js-modal-details");
  let iconTypePokemonModal = document.getElementById("js-image-type-modal");
  const imgPokemonModal = document.getElementById("js-image-pokemon-modal");
  const namePokemonModal = document.getElementById("js-name-pokemon-modal");
  const codePokemonModal = document.getElementById("js-code-pokemon-modal");
  const heightPokemonModal = document.getElementById("js-height-pokemon");
  const weightPokemonModal = document.getElementById("js-weight-pokemon");
  const mainAbPokemonModal = document.getElementById("js-main-abilities");

  modalDetails.setAttribute("typePokemonModal", this.classList[2]);
  imgPokemonModal.setAttribute("src", imagePokemon.getAttribute("src"));
  iconTypePokemonModal.setAttribute("src", iconTypePokemon.getAttribute("src"));
  namePokemonModal.textContent = namePokemon.textContent;
  codePokemonModal.textContent = codeStringPokemon.textContent;

  axios({
    method: "GET",
    url: `https://pokeapi.co/api/v2/pokemon/${codePokemon}`,
  }).then((response) => {
    const data = response.data;

    let infoPokemon = {
      mainAbilities: firstLetterUpperCase(data.abilities[0].ability.name),
      types: data.types,
      weight: data.weight,
      height: data.height,
      abilities: data.abilities,
      stats: data.stats,
      urlType: data.types[0].type.url,
    };

    const limitStatsTo100 = (number) => {
      if (number > 100) {
        return 100;
      }
    };

    const listingTypesPokemon = () => {
      const areaTypesModal = document.getElementById("js-types-pokemon");

      areaTypesModal.innerHTML = "";

      let arrayTypes = infoPokemon.types;

      arrayTypes.forEach((itemType) => {
        let itemList = document.createElement("li");
        areaTypesModal.appendChild(itemList);

        let spanList = document.createElement("span");
        spanList.classList = `tag-type ${itemType.type.name}`;
        spanList.textContent = firstLetterUpperCase(itemType.type.name);
        itemList.appendChild(spanList);
      });
    };

    heightPokemonModal.textContent = `${infoPokemon.height / 10}m`;
    weightPokemonModal.textContent = `${infoPokemon.weight / 10}kg`;
    mainAbPokemonModal.textContent = infoPokemon.mainAbilities;

    const showBtnShowMore = () => {
      ballonShowMore.innerHTML = "";

      const talents = infoPokemon.abilities.slice(1);

      talents.forEach((talent) => {
        const strongShowMore = document.createElement("strong");
        const nameAbility = talent.ability.name;

        strongShowMore.textContent = firstLetterUpperCase(nameAbility);
        ballonShowMore.appendChild(strongShowMore);
      });
    };

    if (infoPokemon.abilities.length > 1) {
      moreAbilities.classList.add("active");
      showBtnShowMore();
      moreAbilities.addEventListener("mouseenter", () => {
        ballonShowMore.classList.add("active");
      });

      moreAbilities.addEventListener("mouseleave", () => {
        ballonShowMore.classList.remove("active");
      });
      return;
    }

    const listingWeaknesses = () => {
      const areaWeak = document.getElementById("js-area-weak");

      areaWeak.innerHTML = "";

      axios({
        method: "GET",
        url: `${infoPokemon.urlType}`,
      }).then((response) => {
        const weaknesses = response.data.damage_relations.double_damage_from;

        weaknesses.forEach((itemType) => {
          let itemListWeak = document.createElement("li");
          areaWeak.appendChild(itemListWeak);

          let spanListWeak = document.createElement("span");
          spanListWeak.classList = `tag-type ${itemType.name}`;
          spanListWeak.textContent = firstLetterUpperCase(itemType.name);
          itemListWeak.appendChild(spanListWeak);
        });
      });
    };

    const statsHp = document.getElementById("js-stats-hp");
    const statsAttack = document.getElementById("js-stats-attack");
    const statsDefense = document.getElementById("js-stats-defense");
    const statsSpecialAttack = document.getElementById(
      "js-stats-special-attack"
    );
    const statsSpecialDefense = document.getElementById(
      "js-stats-special-defense"
    );
    const statsSpeed = document.getElementById("js-stats-speed");

    statsHp.style.width = `${limitStatsTo100(infoPokemon.stats[0].base_stat)}%`;
    statsAttack.style.width = `${limitStatsTo100(
      infoPokemon.stats[1].base_stat
    )}%`;
    statsDefense.style.width = `${limitStatsTo100(
      infoPokemon.stats[2].base_stat
    )}%`;
    statsSpecialAttack.style.width = `${limitStatsTo100(
      infoPokemon.stats[3].base_stat
    )}%`;
    statsSpecialDefense.style.width = `${limitStatsTo100(
      infoPokemon.stats[4].base_stat
    )}%`;
    statsSpeed.style.width = `${limitStatsTo100(
      infoPokemon.stats[5].base_stat
    )}%`;

    listingTypesPokemon();
    listingWeaknesses();
  });
}

function closeDetailsPokemon() {
  html.classList.remove("open-modal");
}

btnDropdownSelect.addEventListener("click", () => {
  btnDropdownSelect.parentElement.classList.toggle("active");
});

const createCardPokemon = (code, type, nome, imagePoke) => {
  const card = document.createElement("button");
  card.classList = `card-pokemon js-open-details-pokemon ${type}`;
  card.setAttribute("code-pokemon", code);
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
  namePokemon.textContent = firstLetterUpperCase(nome);
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

        cardsPokemon.forEach((card) => {
          card.addEventListener("click", openDetailsPokemon);
        });
        closeModal.forEach((card) => {
          card.addEventListener("click", closeDetailsPokemon);
        });
      });
    });
  });
};

listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");

// List All Types of Pokemons

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
      nameType.textContent = `${firstLetterUpperCase(type.name)}`;
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
      nameTypeMobile.textContent = `${firstLetterUpperCase(type.name)}`;
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

// Type Filter

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
  msgNotFound.style.display = "none";
  inputSearch.value = "";

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

          cardsPokemon.forEach((card) => {
            card.addEventListener("click", openDetailsPokemon);
          });
          closeModal.forEach((card) => {
            card.addEventListener("click", closeDetailsPokemon);
          });
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

inputSearch.addEventListener("keyup", () => {
  if (inputSearch.value !== "") {
    btnSearch.classList.add("active");
    return;
  }

  btnSearch.classList.remove("active");
});

const searchPokemon = () => {
  let valueInput = inputSearch.value.toLowerCase();
  const typeFilter = document.querySelectorAll(".type-filter");
  msgNotFound.style.display = "none";

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

      cardsPokemon.forEach((card) => {
        card.addEventListener("click", openDetailsPokemon);
      });
      closeModal.forEach((card) => {
        card.addEventListener("click", closeDetailsPokemon);
      });
    })
    .catch((error) => {
      if (error.response) areaPokemons.innerHTML = "";
      bntLoadMore.style.display = "none";
      countPokemons.textContent = 0;
      msgNotFound.style.display = "flex";
    });
};

inputSearch.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    searchPokemon();
  }
});

btnSearch.addEventListener("click", searchPokemon);
