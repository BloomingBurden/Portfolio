import { dataGallery } from './dataGallery.js';
import { animationScrollEffect } from './moveAnimationEffect.js';
import { parallaxEffect } from './parallax.js';

const basePopup = (data) => {
    const PATHS = {
        img: './img/popup/',
        video: './video/popup/',
        other: './img/popup/popup-bg/',
    };

    const popup = `
        <header class="popup__header">
            <div class="popup__body">
                <picture>
                    <source media="(min-width: 768px)" type="image/webp" srcset="${PATHS.img + data.images[1]}.webp">
                    <source media="(min-width: 768px)" srcset="${PATHS.img + data.images[1]}.jpg">
                    <source type="image/webp" srcset="${PATHS.img + data.images[0]}.webp">
                    <img class="popup__img" src="${PATHS.img + data.images[0]}.jpg"  alt="Изображение сайта">
                </picture>
            </div>
        </header>
        <div class="popup__main">
            <div class="popup__content">
                <div class="popup__top" data-move-effects="scale, true">
                    <h2 class="popup__title">${data.title}</h2>
                    <p class="popup__text">${data.descr}</p>
                </div>
                <a href="${data.site}" target="_blank" class="popup__visit">Посетить образец сайта</a>
                <div class="popup__bottom">
                    <div class="popup__item" data-move-effects="left, true">
                        <h3 class="popup__title">Технологии: </h3>
                        <p class="popup__addition">${data.text[0]}</p>
                    </div>
                    <div class="popup__item" data-move-effects="right, true">
                        <h3 class="popup__title">Сложность: </h3>
                        <p class="popup__addition">${data.text[1]}</p>
                    </div>
                </div>
            </div>
            <div class="popup__body-img">
                <div class="popup__inner-img">
                    <picture>
                        <source type="image/webp" srcset="${PATHS.other + data.images[2]}.webp">
                        <img src="${PATHS.other + data.images[2]}.jpg" loading="lazy" alt="Фоновое изображение сайта">
                    </picture>
                </div>
            </div>
        </div>
        <footer class="popup__footer">
            <iframe src="${data.site}" frameborder="0"></iframe>
        </footer>
        <button class="popup__close">Закрыть</button>
    `;

    return popup;
};

const wrapperPopup = document.querySelector('.popup-wrapper');
const mainWrapper = document.querySelector('.wrapper');
const indexMain = document.querySelector('.index-main');


const closePopup = (element) => {
    element.style.animation = 'popupDown 0.8s ease forwards';
    document.body.removeAttribute('style');
    document.body.classList.remove('stop-scrolling');
    mainWrapper.style.transform = 'translateX(0%)';
    indexMain.removeAttribute('style');
   
    setTimeout(() => {
        element.remove();
    }, 1000);
};

const renderPopup = (section) => {
    const tmpDiv = document.createElement('section');

    tmpDiv.classList.add('popup');
    tmpDiv.innerHTML = section;
    tmpDiv.style.scrollBehavior = 'smooth';
    tmpDiv.classList.add('popup--active');
    indexMain.prepend(tmpDiv);
    indexMain.style.overflow = 'hidden';
    mainWrapper.style.transform = 'translateX(100%)';

    const closeBtn = document.querySelector('.popup__close');

    animationScrollEffect(tmpDiv);
    parallaxEffect();

    closeBtn.addEventListener('click', () => {
        closePopup(tmpDiv);
    });
};


const onClickGallery = (evt) => {
    evt.preventDefault();

    const target = evt.target.closest('[data-popup-item]');
    
    if (!target) return;

    const currentData = target.dataset.popupItem;

    if (!currentData) return;
    
    document.body.style.overflow = 'hidden';
    document.body.classList.add('stop-scrolling');

    renderPopup(basePopup(dataGallery[currentData]));
};

if (wrapperPopup) {
    wrapperPopup.addEventListener('click', onClickGallery);
}