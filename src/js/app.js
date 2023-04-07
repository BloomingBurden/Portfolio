import './modules/functions.js';
import './modules/menuCarousel.js';
import './modules/openPopup.js';
import './modules/transformScroll.js';
import { scrollingGallery } from './modules/scrollingGallery.js';

window.addEventListener('load', () => {
    scrollingGallery();
});
