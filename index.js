const name = document.getElementById('name')
const age = document.getElementById('age')
const petHome = document.getElementById('pet-container')
const playerImg = document.getElementById('pet')
// let playerPetBaby;
const hungerMetric = document.getElementById('hunger-span')
const sleepinessMetric = document.getElementById('sleepiness-span')
const  boredomMetric = document.getElementById('boredom-span')
const feed = document.getElementById('feed')
const lights = document.getElementById('lights')
const play = document.getElementById('play')

let areLightsOn = true

class Pet {
    constructor(name, age, hunger, sleepiness, boredom, image) {
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
}

const player = new Pet ({
    isAlive: true,
    isIdle: true,
    isAnimated: false,
    age: 0,
    hunger: 0,
    sleepiness: 0,
    boredom: 0,
    image: playerImg,
})

// const playerBaby = new Pet() ({
//     isAlive: true,
//     isIdle: true,
//     isAnimated: false,
//     age: 0,
//     hunger: 0,
//     sleepiness: 0,
//     boredom: 0,
//     image: playerPetBaby,
// })

const toggleLights = () => {
    if (areLightsOn) {
        petHome.style.backgroundColor = 'dimgrey'
        areLightsOn = false
    } else {
        petHome.style.backgroundColor = 'white'
        areLightsOn = true
    }
}

const removeJello = () => {
    player.image.classList.remove('jello')
}

const addJello = () => {
    player.image.classList.add('jello')
    setTimeout(removeJello, 900)
}

lights.addEventListener('click', toggleLights)

player.image.addEventListener('click', addJello)
// playerPetBaby.addEventListener('click', jelloAnimation)

