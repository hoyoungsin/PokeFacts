const baseUrl = "https://pokeapi.co/api/v2/"
const containerEl = document.getElementsByClassName("container")


//create pokemon modal anchors and sprite element.
function createPoke() {
    //generate random id for reference
    const pokeID = 152 - Math.floor(Math.random() * 152);
    let poke = document.createElement("a");
    poke.classList.add("pokemon")
    poke.href = "#info-modal";
    document.body.children[1].append(poke)
    let pokeSprite = document.createElement("img");
    pokeSprite.classList.add("pokeSprite")
    pokeSprite.setAttribute("id", pokeID)
    poke.append(pokeSprite)
    // console.log("pokemon")
    
    //get sprite sources into src
    function getSprite() {
        fetch(`${baseUrl}pokemon/${pokeID}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            pokeSprite.src = data.sprites.front_default;
            pokeSprite.alt = data.name;
        })
    }
    //apply sprites
    getSprite();
}

// create 40 pokemon
for(i = 0; i < 40; i++) {
    createPoke();
}

let pokemons = document.querySelectorAll(".pokemon")
pokemons.forEach((pokemon) => {
    pokemon.addEventListener("click", (e) => {
        let targetPokeID = e.target.getAttribute("id");
        // console.log(targetPokeID)
        function modalImg() {
            fetch(`${baseUrl}pokemon/${targetPokeID}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                let pokemonName = document.querySelector(".name");
                let pokemonPicture = document.querySelector(".picture");
                pokemonName.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
                pokemonPicture.src = data.sprites.front_default;
            })
        }
        // info is in a different api url
        function modalInfo() {
            fetch(`${baseUrl}pokemon-species/${targetPokeID}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                let pokemonInfo = document.querySelector(".info");
                pokemonInfo.innerHTML = data.flavor_text_entries[0].flavor_text;
            })
        }
        //call upton modal functions
        modalImg();
        modalInfo();
    })
});