import './modules/swiper-bundle.min.js';
import './modules/functions.js';
import './modules/preview.js';
import './modules/menuCarousel.js';
import './modules/openPopup.js';
import './modules/transformScroll.js';
import { bindSwipers } from './modules/bindSwipers.js';
import { scrollingGallery } from './modules/scrollingGallery.js';
import { GoMusic } from './modules/goMusic.js';
import { onMouseRotate } from './modules/sliderAnimation.js';
import { onMoveFilter } from './modules/onMoveFilter.js';


window.addEventListener('load', () => {
    scrollingGallery();
    onMouseRotate('.work-inner', '.slider__item');
    onMoveFilter();

    const audio = new GoMusic('../video/music-silent.mp3');

    if (document.body.classList.contains('works-page')) {
        setSlider();
    }
});

const setSlider = () => {
    document.querySelectorAll('.slider').forEach((item, i) => {
        window[`slider${i + 1}`] = new Swiper(item, {
            freeMode: true,
            slidesPerView: 1.75,
            direction: 'vertical',
            mousewheel: {
                sensitivity: 3,
            }
        });
    });

    bindSwipers(slider1, slider2, slider3, slider4);
}
