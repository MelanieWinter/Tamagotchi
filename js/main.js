const name = document.getElementById('name')
const petAgeEl = document.getElementById('age')
const petHome = document.getElementById('pet-home')
const petImage = document.getElementById('pet')
const petHungerEl = document.getElementById('pet-hunger-span')
const petSleepinessEl = document.getElementById('pet-sleepiness-span')
const petBoredomEl = document.getElementById('pet-boredom-span')
const feed = document.getElementById('feed')
const lights = document.getElementById('lights')
const play = document.getElementById('play')
const petText = document.getElementById('pet-text')

let areLightsOn = true

class Pet {
    constructor({name, age, ageEl, home, hunger, hungerMetric, sleepiness, sleepinessMetric, boredom, boredomMetric, image, textBox}) {
        this.isAlive = true;
        this.isIdle = true;
        this.isAnimated = false;
        this.name = name;
        this.age = age;
        this.ageEl = ageEl
        this.home = home
        this.hungerMetric = hungerMetric;
        this.sleepinessMetric = sleepinessMetric;
        this.boredomMetric = boredomMetric;
        this.image = image;
        this.textBox = textBox;
        this.metrics = {
            hunger: 0,
            sleepiness: 0,
            boredom: 0,
        };
        this.animations = [
            this.jello,
            this.heartbeat,
            this.wobble,
            this.rotate,
        ];
        this.currentAnimationIdx = 0
    }

    dead = () => {
        if (this.isAlive === false) {
            this.image.style.backgroundColor = 'black'
            this.home.style.filter = 'blur(1.5rem)'
        }
    }

    increaseAge = () => {
        const  updateAge = () => {
            this.age++
            this.ageEl.innerText = this.age
            setTimeout(this.updateAge, 60000)
        }
        setTimeout(updateAge, 60000)
    }
    
    updateTextBox = (text) => {
        this.textBox.innerText = text
        this.textBox.classList.remove('slide-out')
        void this.textBox.offsetWidth
        this.textBox.classList.add('slide-out')
    }

    increaseMetric = (property) => {
        if (this.metrics[property] >= 2) {
            this.isAlive = false
            console.log(`${this.name} has died of ${property}.`)
            return
        }
        const updateMetric = () => {
            this.metrics[property]++
            this[property + 'Metric'].innerText = this.metrics[property]
            console.log('THIS: ' + property + 'Metric')
            console.log('DEBUG: ' + property + ' = ' + this.metrics[property])
            const randomDelay = Math.floor(5000 + Math.random() * 10000)
            setTimeout(updateMetric, randomDelay)
        }
        const initialDelay = Math.floor(5000 + Math.random() * 10000)
        setTimeout(updateMetric, initialDelay)
    }

    increaseHunger = () => {
            this.increaseMetric('hunger')
    }

    increaseSleepiness = () => {
        this.increaseMetric('sleepiness')
    }

    increaseBoredom = () => {
        this.increaseMetric('boredom')
    }

    decreaseMetric = (property) => {
        if (this.metrics[property] > 0) {         
            this.metrics[property]--
            this[property + 'Metric'].innerText = this.metrics[property]
        }
    }

    feed = () => {
        feed.addEventListener('click', () => {
            this.decreaseMetric('hunger', this.hunger)
        })
    }

    sleep = () => {
    let lightsAreOff = false

    const toggleLights = () => {
        if (areLightsOn) {
            petHome.style.backgroundColor = 'dimgrey'
            areLightsOn = false
            lightsAreOff = true

            const updateText = (count) => {
                if (count >= 1) {
                    this.updateTextBox(count)
                    setTimeout(() => {
                        updateText(count - 1)
                    }, 1000)
                } else {
                    this.decreaseMetric('sleepiness', this.sleepiness)
                }
            }
            updateText(3)
        } else {
            petHome.style.backgroundColor = 'white'
            areLightsOn = true
            lightsAreOff = false
        }
    }
    
    lights.addEventListener('click', toggleLights)
    }

    play = () => {
        play.addEventListener('click', () => {
            this.decreaseMetric('boredom', this.boredom)
        })
    }

    clickToAnimate = () => {
        this.image.addEventListener('click', () => {
            if (this.currentAnimationIdx < this.animations.length) {
                const currentAnimation = this.animations[this.currentAnimationIdx]
                currentAnimation()
                this.currentAnimationIdx++
            } else {
                this.currentAnimationIdx = 0
                const currentAnimation = this.animations[this.currentAnimationIdx]
                currentAnimation()
                this.currentAnimationIdx++
            }
        })
    }

    jello = () => {
        if (!this.isAnimated ) {
            this.isAnimated = true
            this.image.classList.add('jello')
            this.updateTextBox("'jiggle'")
            setTimeout(() => {
                this.isAnimated = false
                this.image.classList.remove('jello')
            }, 800)
        }
    }

    heartbeat = () => {
        if (!this.isAnimated) {
            this.isAnimated = true
            this.image.classList.add('heartbeat')
            this.updateTextBox("'ouch'")
            setTimeout(() => {
                this.isAnimated = false
                this.image.classList.remove('heartbeat')
            }, 800)
        }
    }

    wobble = () => {
        if (!this.isAnimated) {
            this.isAnimated = true
            this.image.classList.add('wobble')
            this.updateTextBox("'ha ha'")
            setTimeout(() => {
                this.isAnimated = false
                this.image.classList.remove('wobble')
            }, 800)
        }
    }

    rotate = () => {
        if (!this.isAnimated) {
            this.isAnimated = true
            this.image.classList.add('rotate')
            this.updateTextBox("'wheee'")
            setTimeout(() => {
                this.isAnimated = false
                this.image.classList.remove('rotate')
            }, 800)
        }
    }

    init = () => {
        this.increaseAge()
        this.increaseHunger()
        this.increaseSleepiness()
        this.increaseBoredom()
        this.feed()
        this.sleep()
        this.play()
        this.clickToAnimate()
        this.dead()
    }
}

const player = new Pet({
    name: "YourPetName",
    age: 0,
    ageEl: petAgeEl,
    home: petHome,
    hungerMetric: petHungerEl,
    sleepinessMetric: petSleepinessEl,
    boredomMetric: petBoredomEl,
    image: petImage,
    textBox: petText,
})

player.init()

console.log(player.isAlive)
console.log(player.hungerMetric)