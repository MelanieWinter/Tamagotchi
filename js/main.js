// CONSTANTS //

// STATE VARIABLES //
let time = 0
let gameRunning = true

// CACHED ELEMENTS - VIEW //
const petNameEl = document.getElementById('name-el')
const petAgeEl = document.getElementById('pet-age-span-el')
const petHomeEl = document.getElementById('pet-home-el')
const petImageEl = document.getElementById('pet-el')
const petHungerEl = document.getElementById('pet-hunger-span-el')
const petSleepinessEl = document.getElementById('pet-sleepiness-span-el')
const petBoredomEl = document.getElementById('pet-boredom-span-el')
const feedButtonEl = document.getElementById('feed-button-el')
const sleepButtonEl = document.getElementById('sleep-button-el')
const playButtonEl = document.getElementById('play-button-el')
const petTextEl = document.getElementById('pet-text-el')
const nameInputEl = document.getElementById('name-input-el')
const nameInputButtonEl = document.getElementById('name-input-button-el')
const nameInputDivEl = document.getElementById('name-input-div-el')

// OBEJECT - MODEL //
class Pet {

    // MODEL //
    constructor({name, nameEl, age, ageEl, homeEl, hungerMetricEl, sleepinessMetricEl, boredomMetricEl, imageEl, textBoxEl}) {
        this.isAlive = true;
        this.isIdle = true;
        this.isAnimated = false;
        this.name = name;
        this.nameEl = nameEl;
        this.age = age;
        this.ageEl = ageEl;
        this.homeEl = homeEl;
        this.hungerMetricEl = hungerMetricEl;
        this.sleepinessMetricEl = sleepinessMetricEl;
        this.boredomMetricEl = boredomMetricEl;
        this.imageEl = imageEl;
        this.textBoxEl = textBoxEl;
        this.metrics = [
            { name: 'hunger', value: 0 },
            { name: 'sleepiness', value: 0 },
            { name: 'boredom', value: 0 }
        ];
        this.animations = [
            this.jello,
            this.heartbeat,
            this.wobble,
            this.rotate,
        ];
        this.currentAnimationIdx = 0
    }

    // CONTROLLER //
    increaseAge() {
        this.age++
        this.render()
        console.log('AGE: ', this.age)
    }

    increaseMetric() {
        for (let i = 0; i < this.metrics.length; i++) {
            if(randomChance()) {
                this.metrics[i].value++
                this.render()
                console.log(`${this.metrics[i].name}`, this.metrics[i].value)
            }
        }
    }

    // VIEW //
    render() {
        this.ageEl.innerText = this.age
        this.hungerMetricEl.innerText = this.metrics[0].value
        this.sleepinessMetricEl.innerText = this.metrics[1].value
        this.boredomMetricEl.innerText = this.metrics[2].value
    }

    init () {
    }
}

const tamagotchi = new Pet({

    // MODEL //
    name: 'name',
    nameEl: petNameEl,
    age: 0,
    ageEl: petAgeEl,
    homeEl: petHomeEl,
    hungerMetricEl: petHungerEl,
    sleepinessMetricEl: petSleepinessEl,
    boredomMetricEl: petBoredomEl,
    imageEl: petImageEl,
    textBoxEl: petTextEl,
})

// EVENT LISTENERS - CONTROLLER //

// FUNCTIONS - VIEW //
function dead() {
    if(!tamagotchi.isAlive) {
        tamagotchi.imageEl.style.backgroundColor = 'black'
        feedButtonEl.style.cursor = 'not-allowed'
        sleepButtonEl.style.cursor = 'not-allowed'
        playButtonEl.style.cursor = 'not-allowed'
        tamagotchi.hungerMetricEl.innerText = '  ---'
        tamagotchi.sleepinessMetricEl.innerText = '  ---'
        tamagotchi.boredomMetricEl.innerText = '  ---'
        tamagotchi.ageEl.innerText = '  ---'
        tamagotchi.imageEl.style.cursor = 'not-allowed'
        tamagotchi.textBoxEl.innerText = "' dead '"

        // Initilize a dead tamagotchi screen with player stats
        // Dead screen will show a different message depending on how they died
        for (let i = 0; i < tamagotchi.metrics.length; i++) {
            if (tamagotchi.metrics[i].value === 10) {
                console.log(`Your tamagotchi died of ${tamagotchi.metrics[i].name}, at age ${tamagotchi.age}`)
            }
        }
        if (tamagotchi.age === 60) {
            console.log(`Your tamagotchi died at age ${tamagotchi.age}`)
        }
    }
}

// FUNCTIONS - CONTROLLER //
function randomChance() {
    const randomNum = Math.floor(1 + Math.random() * 3)
    if (randomNum === 3) {
        return true
    } return false
}

function init() {
    const game = setInterval(() => {
        time++
        console.log(time)
    
        if (time % 60 === 0) {
            if (tamagotchi.age < 60) {
                tamagotchi.increaseAge()
            } else {
                tamagotchi.isAlive = false
                gameRunning = false
                dead()
                clearInterval(game)
            }
        }
        
        if (time % 2 === 0) {
            if (tamagotchi.metrics[0].value < 10 
            && tamagotchi.metrics[1].value < 10 
            && tamagotchi.metrics[2].value < 10) {
                tamagotchi.increaseMetric()
            } else {
                tamagotchi.isAlive = false
                gameRunning = false
                dead()
                clearInterval(game)
            }
        }
    }, 1000)

    tamagotchi.init()
}

// FUNCTIONS  - VIEW //
function render() {
}

// Run init only after player has named their character in the starting screen
if (gameRunning === true) {
    init()
}

// TO COMPLETE MVP:
// Need to give ability to name functionality
// Give feed, sleep, and play buttons functionality