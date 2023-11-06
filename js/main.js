// CONSTANTS //
const METRIC_HUNGER = 'hunger'
const METRIC_SLEEPINESS = 'sleepiness'
const METRIC_BOREDOM = 'boredom'

// STATE VARIABLES //
let gameRunning = false
let time = 0
let gameInterval
let areLightsOn = true

// CACHED ELEMENTS - VIEW //
const petNameEl = document.getElementById('name-el')
const petAgeDivEl = document.getElementById('pet-age-el')
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
const messageEl = document.getElementById('message-el')
const message2El = document.getElementById('message2-el')
const resetGameButtonEl = document.getElementById('reset-game-button-el')

// OBEJECT - MODEL //
class Pet {
    // MODEL //
    constructor({name, nameEl, age, ageEl, hungerMetricEl, sleepinessMetricEl, boredomMetricEl, imageEl, textBoxEl}) {
        this.isAlive = false;
        this.isIdle = true;
        this.isAnimated = false;
        this.name = name;
        this.nameEl = nameEl;
        this.age = age;
        this.ageEl = ageEl;
        this.hungerMetricEl = hungerMetricEl;
        this.sleepinessMetricEl = sleepinessMetricEl;
        this.boredomMetricEl = boredomMetricEl;
        this.imageEl = imageEl;
        this.textBoxEl = textBoxEl;
        this.metrics = [
            { name: METRIC_HUNGER, value: 0 },
            { name: METRIC_SLEEPINESS, value: 0 },
            { name: METRIC_BOREDOM, value: 0 }
        ];
        this.ate = 0;
        this.slept= 0;
        this.played = 0;
        this.animations = [
            this.jello,
            this.heartbeat,
            this.wobble,
            this.rotate,
        ];
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

    decreaseMetric(metricName) {
        const metric = this.metrics.find(metric => metric.name === metricName)
        const randomNum = Math.floor(1 + Math.random() * 3)
        if (metric && metric.value > 0) {
            metric.value -= randomNum
            this[metricName + 'MetricEl'].innerText = metric.value
        }
    }

    countdownSleep(count) {
        if (count >= 1) {
            this.updateTextBox(count)
            setTimeout(() => {
                this.countdownSleep(count - 1)
            }, 1000)
        } else {
            this.updateTextBox("' rested '")
            toggleLights()
            this.metrics.find(metric => metric.name === METRIC_SLEEPINESS).value = 0
            this.sleepinessMetricEl.innerText = 0
        }
    }

    // VIEW //
    updateTextBox(text) {
        this.textBoxEl.textContent = text
        this.textBoxEl.classList.remove('slide-out')
        void this.textBoxEl.offsetWidth
        this.textBoxEl.classList.add('slide-out')
    }
    

    render() {
        this.imageEl.style.display = 'flex'
        this.ageEl.innerText = this.age
        this.hungerMetricEl.innerText = this.metrics[0].value
        this.sleepinessMetricEl.innerText = this.metrics[1].value
        this.boredomMetricEl.innerText = this.metrics[2].value
    }
}

const tamagotchi = new Pet({
    // MODEL //
    name: 'name',
    nameEl: petNameEl,
    age: 0,
    ageEl: petAgeEl,
    hungerMetricEl: petHungerEl,
    sleepinessMetricEl: petSleepinessEl,
    boredomMetricEl: petBoredomEl,
    imageEl: petImageEl,
    textBoxEl: petTextEl,
})

// EVENT LISTENERS //
nameInputButtonEl.addEventListener('click', nameThatTamagotchi)
nameInputEl.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        nameThatTamagotchi()
    }
})

feedButtonEl.addEventListener('click', () => {
    tamagotchi.ate++
    tamagotchi.updateTextBox("' yum '")
    tamagotchi.decreaseMetric(METRIC_HUNGER)
    console.log('ATE:', tamagotchi.ate)
})

sleepButtonEl.addEventListener('click', () => {
    toggleLights()
    if (areLightsOn === false) {
        tamagotchi.slept++
        tamagotchi.countdownSleep(3)
        console.log('SLEPT:', tamagotchi.slept)
    }
})

playButtonEl.addEventListener('click', () => {
    tamagotchi.played++
    tamagotchi.updateTextBox("' yay '")
    tamagotchi.decreaseMetric(METRIC_BOREDOM)
    console.log('PLAYED:', tamagotchi.played)
})

resetGameButtonEl.addEventListener('click', resetGame)

// FUNCTIONS - VIEW //
function toggleLights() {
    if (areLightsOn) {
        tamagotchi.textBoxEl.style.color = 'white'
        feedButtonEl.style.pointerEvents = 'none'
        sleepButtonEl.style.pointerEvents = 'none'
        playButtonEl.style.pointerEvents = 'none'
        tamagotchi.imageEl.style.pointerEvents = 'none'
        petHomeEl.style.backgroundColor = 'dimgrey'
        areLightsOn = false
    } else {
        tamagotchi.textBoxEl.style.color = 'grey'
        feedButtonEl.style.pointerEvents = 'auto'
        sleepButtonEl.style.pointerEvents = 'auto'
        playButtonEl.style.pointerEvents = 'auto'
        tamagotchi.imageEl.style.pointerEvents = 'auto'
        petHomeEl.style.backgroundColor = 'white'
        areLightsOn = true
    }
}

function nameThatTamagotchi() {
    const input = nameInputEl.value
    tamagotchi.name = input
    tamagotchi.nameEl.innerText = tamagotchi.name.toUpperCase()
    nameInputDivEl.style.display = 'none'
    tamagotchi.nameEl.style.display = 'block'
    petAgeDivEl.style.display = 'block'
    birth()
}

function birth() {
    gameRunning = true
    isAlive = true        
    feedButtonEl.style.pointerEvents = 'auto'
    sleepButtonEl.style.pointerEvents = 'auto'
    playButtonEl.style.pointerEvents = 'auto'
    tamagotchi.imageEl.style.pointerEvents = 'auto'
    tamagotchi.render()
    init()
}

function death() {
    clearInterval(gameInterval)
    gameRunning = false
    tamagotchi.isAlive = false
    tamagotchi.imageEl.style.backgroundColor = 'black'
    feedButtonEl.style.pointerEvents = 'none'
    sleepButtonEl.style.pointerEvents = 'none'
    playButtonEl.style.pointerEvents = 'none'
    tamagotchi.imageEl.style.pointerEvents = 'none'
    tamagotchi.hungerMetricEl.innerText = '  ---'
    tamagotchi.sleepinessMetricEl.innerText = '  ---'
    tamagotchi.boredomMetricEl.innerText = '  ---'
    tamagotchi.ageEl.innerText = '  ---'
    tamagotchi.textBoxEl.classList.remove('slide-out')
    tamagotchi.textBoxEl.innerText = "' dead '"
    resetGameButtonEl.style.display = 'inline-block'

    for (let i = 0; i < tamagotchi.metrics.length; i++) {
        if (tamagotchi.metrics[i].value === 10) {
            messageEl.innerText = `${tamagotchi.name} died of ${tamagotchi.metrics[i].name}, at age ${tamagotchi.age}.`
            message2El.innerText = 
                `Ate: ${tamagotchi.ate} times
                \n Slept: ${tamagotchi.slept} times
                \n Played: ${tamagotchi.played} times
                \n Lived: ${formatTime(time)}`
        }
    }
}

function resetGame() {
    gameRunning = false
    time = 0

    tamagotchi.isAlive = false
    tamagotchi.age = 0
    tamagotchi.ate = 0
    tamagotchi.slept = 0
    tamagotchi.played = 0
    tamagotchi.metrics = [
        { name: METRIC_HUNGER, value: 0 },
        { name: METRIC_SLEEPINESS, value: 0 },
        { name: METRIC_BOREDOM, value: 0 }
    ]

    petImageEl.style.display = 'none'
    feedButtonEl.style.pointerEvents = 'auto'
    sleepButtonEl.style.pointerEvents = 'auto'
    playButtonEl.style.pointerEvents = 'auto'
    tamagotchi.imageEl.style.pointerEvents = 'auto'
    tamagotchi.ageEl.innerText = '  ---'
    tamagotchi.hungerMetricEl.innerText = '  ---'
    tamagotchi.sleepinessMetricEl.innerText = '  ---'
    tamagotchi.boredomMetricEl.innerText = '  ---'
    tamagotchi.textBoxEl.innerText = ''
    messageEl.innerText = ''
    message2El.innerText = ''
    resetGameButtonEl.style.display = 'none'
    nameInputDivEl.style.display = 'flex'
    tamagotchi.nameEl.style.display = 'none'
    petAgeDivEl.style.display = 'none'
    tamagotchi.imageEl.style.backgroundColor = 'hsl(260, 67%, 79%)'
    tamagotchi.imageEl.style.border = '1px solid hsl(259, 75%, 61%)'

    clearInterval(gameInterval)
}

// FUNCTIONS - CONTROLLER //
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    const formattedTime = 
        `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(remainingSeconds).padStart(2, '0')}s`
    return formattedTime
}

function randomChance() {
    const randomNum = Math.floor(1 + Math.random() * 3)
    if (randomNum === 3) {
        return true
    } return false
}

function init() {
    gameInterval = setInterval(() => {
        time++
        console.log(time)
    
        if (time % 60 === 0) {
                tamagotchi.increaseAge()
        }
        
        if (time % 2 === 0) {
            if (tamagotchi.metrics[0].value < 10 
            && tamagotchi.metrics[1].value < 10 
            && tamagotchi.metrics[2].value < 10) {
                tamagotchi.increaseMetric()
            } else {
                death()
            }
        }
    }, 1000)

    tamagotchi.render()
}

// ICEBOX:
// name a sick() function. where if hunder or boredom go below 0. then the tamagotchi will be sick and there will be a penalty
//make check age function in set interval
//make kid teen adult old functions which morph the tamagotchi to a larger size
