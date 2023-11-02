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
        this.animations = [
            this.jello,
            this.heartbeat,
            this.wobble,
        ];
        this.currentAnimationIdx = 0
    }

    clickToAnimate = () => {
        this.image.addEventListener('click', () => {
            if (this.currentAnimationIdx < this.animations.length) {
                const currentAnimation = this.animations[this.currentAnimationIdx];
                currentAnimation();
                this.currentAnimationIdx++;
            } else {
                this.currentAnimationIdx = 0;
                const currentAnimation = this.animations[this.currentAnimationIdx];
                currentAnimation();
            }
        });
    }
    

    jello = () => {
        if (!this.isAnimated ) {
            this.isAnimated = true
            this.image.classList.add('jello')
            setTimeout(() => {
                this.isAnimated = false;
                this.image.classList.remove('jello')
            }, 800);
        }
    }

    heartbeat = () => {
        if (!this.isAnimated) {
            this.isAnimated = true
            this.image.classList.add('heartbeat')
            setTimeout(() => {
                this.isAnimated = false;
                this.image.classList.remove('heartbeat')
            }, 800);
        }
    }

    wobble = () => {
        if (!this.isAnimated) {
            this.isAnimated = true
            this.image.classList.add('wobble')
            setTimeout(() => {
                this.isAnimated = false;
                this.image.classList.remove('wobble')
            }, 800);
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

player.clickToAnimate()

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

