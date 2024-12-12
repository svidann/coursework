document.addEventListener('DOMContentLoaded', () => {

    const initSlider = ({ 
        sliderContainerSelector, 
        sliderWrapperSelector, 
        slidesSelector, 
        dotsWrapperSelector, 
        dotActiveClass, 
        dotUnActiveClass,
        gap, 
        timeout 
    }) => {
        const sliderContainer = document.querySelector(sliderContainerSelector);
        const sliderWrapper = document.querySelector(sliderWrapperSelector);
        const slides = document.querySelectorAll(slidesSelector);
        const dotsWrapper = document.querySelector(dotsWrapperSelector);

        const sliderWidth = sliderContainer.clientWidth; 
        const slideWidth = slides[0]?.clientWidth; 
        const slidesCount = slides.length;
        const countSlidesOnVisible = Math.floor(sliderWidth / slideWidth); 

        const maxSlideIndex = Math.ceil(slidesCount / countSlidesOnVisible); 
        let slideIndex = -1; 

        const dots = createDots(); 

        if (slideWidth && slidesCount) { 
            sliderWrapper.style.width = `${(slidesCount * (slideWidth + gap)) - gap}px`; 
        }

        setInterval(() => {
            slide();
        }, timeout);

        slide();

        function slide () {
            if (slideIndex < maxSlideIndex - 1) {
                slideIndex++;
            } else {
                slideIndex = 0;
            }
            
            dots.forEach(dot => {
                dot.classList.remove(dotActiveClass);
                dot.classList.add(dotUnActiveClass);
            });

            dots[slideIndex].classList.add(dotActiveClass);
            dots[slideIndex].classList.remove(dotUnActiveClass);

            sliderWrapper.style.transform = `translateX(-${(slideIndex * (slideWidth + gap)) * countSlidesOnVisible}px)`;
        }

        function createDots () {
            const dots = [];

            for (let i = 0; i < maxSlideIndex; i++) {
                const dot = document.createElement('div');
                
                dot.classList.add(dotUnActiveClass);
                dotsWrapper.appendChild(dot);
                
                dot.addEventListener('click', () => {
                    slideIndex = i - 1;
                    slide();
                });

                dots.push(dot);
            }

            return dots;
        }
    }

    initSlider({
        sliderContainerSelector: '#slider-container', 
        sliderWrapperSelector: '#slider-wrapper', 
        slidesSelector: '#slider-wrapper .reviews_item', 
        dotsWrapperSelector: '#dots-wrapper', 
        dotActiveClass: 'reviews_slider_item-active', 
        dotUnActiveClass: 'reviews_slider_item-disabled', 
        gap: 20, 
        timeout: 3000 
    })
});
