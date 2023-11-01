const name = document.getElementById('name')
const age = document.getElementById('age')
const petHome = document.getElementById('pet-container')
const playerImg = document.getElementById('pet')
const hungerMetric = document.getElementById('hunger-span')
const sleepinessMetric = document.getElementById('sleepiness-span')
const  boredomMetric = document.getElementById('boredom-span')
const feed = document.getElementById('feed')
const lights = document.getElementById('lights')
const play = document.getElementById('play')

let areLightsOn = true

// const playerImg = document.getElementById('pet')

class Pet {
    constructor({name, age, hunger, sleepiness, boredom, image}) {
        this.isAlive = true;
        this.isIdle = true;
        this.isAnimated = false;
        this.name = name;
        this.age = age;
        this.hunger = hunger;
        this.sleepiness = sleepiness;
        this.boredom = boredom;
        this.image = image;
    }

    clickToJello() {
        this.image.addEventListener('click', this.jello);
    }

    jello() {
        if (!this.isAnimated) {
            this.isAnimated = true;
            playerImg.classList.add('jello');
            setTimeout(() => {
                this.isAnimated = false;
                playerImg.classList.remove('jello');
            }, 900);
        }
    }
}

const player = new Pet({
    name: "YourPetName",
    age: 0,
    hunger: 0,
    sleepiness: 0,
    boredom: 0,
    image: playerImg
});

player.clickToJello();

console.log(player.image)

// Pet.clickToJello = () => {
//     Pet.image.addEventListener('click', this.addJello)
// }

// Pet.jello = () => {
//     if (!isAnimated) {
//         isAnimated = true
//         this.image.classList.add('jello')
//         setTimeout(isAnimated = false, 900)
//         setTimeout(this.image.classList.remove('jello'), 900)
//     } 
// }

const toggleLights = () => {
    if (areLightsOn) {
        petHome.style.backgroundColor = 'dimgrey'
        areLightsOn = false
    } else {
        petHome.style.backgroundColor = 'white'
        areLightsOn = true
    }
}

lights.addEventListener('click', toggleLights)

