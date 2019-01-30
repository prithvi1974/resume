class Carousel {
    constructor(id,timer=5) {
        this.currentSlide = null;
        this.carousel = document.getElementById(id);
        this.slides = [];
        this.slider = null;
        this.dots = [];
        this.timer = null;
        this.timerDuration = timer;

        if(this.carousel) {
            this.slider = document.createElement("div");
            this.slider.classList.add("slider");

            let slides = this.carousel.getElementsByClassName("slide");
            for(let i=0; i<slides.length; i++) {
                this.slides.push(slides[i]);
                let dot = document.createElement("div");
                dot.classList.add("dot");
                dot.id = `dot-${i}`;
                this.dots.push(dot);
                this.dots[i].addEventListener('click',() => this.goToSlide(i));
                this.slider.appendChild(dot);
            }

            this.carousel.appendChild(this.slider);

            if(this.slides.length > 0) {
                this.currentSlide = 0;
                this.slides[0].classList.add("slide-active");
                this.dots[0].classList.add("dot-active");
            }

            this.timer = setInterval(() => this.next(), this.timerDuration);
        }
    }

    setCurrent(sno) {
        if(sno !== this.currentSlide && sno >= 0 && sno < this.slides.length) {
            if(this.currentSlide !== null) this.unsetCurrent();
            this.slides[sno].classList.add("slide-active");
            this.dots[sno].classList.add("dot-active");
            this.currentSlide = sno;
        }
    }

    unsetCurrent() {
        if(this.currentSlide !== null) {
            this.slides[this.currentSlide].classList.remove("slide-active");
            this.dots[this.currentSlide].classList.remove("dot-active");
            this.currentSlide = null;
        }
    }

    next() {
        if(this.currentSlide !== null)
            this.setCurrent(this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1);
    }

    prev() {
        if(this.currentSlide !== null)
            this.setCurrent(this.currentSlide === 0 ? this.slides.length-1 : this.currentSlide - 1)
    }

    goToSlide(i) {
        this.setCurrent(i);
        clearInterval(this.timer);
        this.timer = setInterval(() => this.next(), this.timerDuration);
    }
}
