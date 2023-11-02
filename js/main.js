const name = document.getElementById('name')
const age = document.getElementById('age')
const petHome = document.getElementById('pet-home')
const petImage = document.getElementById('pet')
const petHungerMetric = document.getElementById('pet-hunger-span')
const petSleepinessMetric = document.getElementById('pet-sleepiness-span')
const petBoredomMetric = document.getElementById('pet-boredom-span')
const feed = document.getElementById('feed')
const lights = document.getElementById('lights')
const play = document.getElementById('play')
const petText = document.getElementById('pet-text')

let areLightsOn = true

class Pet {
    constructor({name, age, hunger, hungerMetric, sleepiness, sleepinessMetric, boredom, boredomMetric, image, textBox}) {
        this.isAlive = true;
        this.isIdle = true;
        this.isAnimated = false;
        this.name = name;
        this.age = age;
        this.hunger = hunger;
        this.hungerMetric = hungerMetric;
        this.sleepiness = sleepiness;
        this.sleepinessMetric = sleepinessMetric;
        this.boredom = boredom;
        this.boredomMetric = boredomMetric;
        this.image = image;
        this.textBox = textBox;
        this.animations = [
            this.jello,
            this.heartbeat,
            this.wobble,
            this.rotate,
        ];
        this.currentAnimationIdx = 0;
    }

    updateTextBox = (text) => {
        this.textBox.innerText = text
        this.textBox.classList.remove('slide-out');
        void this.textBox.offsetWidth; // Force a reflow to restart the animation
        this.textBox.classList.add('slide-out');
    }

    increaseMetric = (property) => {
        const updateMetric = () => {
            this[property]++;
            this[property + 'Metric'].innerText = this[property];
            const randomDelay = Math.floor(5000 + Math.random() * 10000);
            setTimeout(updateMetric, randomDelay);
        };
        const initialDelay = Math.floor(5000 + Math.random() * 10000);
        setTimeout(updateMetric, initialDelay);
    }

    increaseHunger = () => {
        this.increaseMetric('hunger', this.hunger)
    }

    increaseSleepiness = () => {
        this.increaseMetric('sleepiness', this.sleepiness)
    }

    increaseBoredom = () => {
        this.increaseMetric('boredom', this.boredom)
    }

    decreaseMetric = (property) => {
        if (this[property] > 0) {         
            this[property]--;
            this[property + 'Metric'].innerText = this[property];
        }
    }

    feed = () => {
        feed.addEventListener('click', () => {
            this.decreaseMetric('hunger', this.hunger)
        })
    }

    // sleep = () => {
    //     lights.addEventListener('click', () => {
    //         this.decreaseMetric('sleepiness', this.sleepiness)
    //     })
    // }

    play = () => {
        play.addEventListener('click', () => {
            this.decreaseMetric('boredom', this.boredom)
        })
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
                this.currentAnimationIdx++
            }
        });
    }

    jello = () => {
        if (!this.isAnimated ) {
            this.isAnimated = true
            this.image.classList.add('jello')
            this.updateTextBox("'jiggle'")
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
            this.updateTextBox("'ouch'")
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
            this.updateTextBox("'ha ha'")
            setTimeout(() => {
                this.isAnimated = false;
                this.image.classList.remove('wobble')
            }, 800);
        }
    }

    rotate = () => {
        if (!this.isAnimated) {
            this.isAnimated = true
            this.image.classList.add('rotate')
            this.updateTextBox("'wheee'")
            setTimeout(() => {
                this.isAnimated = false;
                this.image.classList.remove('rotate')
            }, 800);
        }
    }


}

const player = new Pet({
    name: "YourPetName",
    age: 0,
    hunger: 0,
    hungerMetric: petHungerMetric,
    sleepiness: 0,
    sleepinessMetric: petSleepinessMetric,
    boredom: 0,
    boredomMetric: petBoredomMetric,
    image: petImage,
    textBox: petText,
});

player.increaseHunger()
player.increaseSleepiness()
player.increaseBoredom()

player.feed()
// player.sleep()
player.play()

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

