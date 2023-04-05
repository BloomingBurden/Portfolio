import { dataGallery } from './dataGallery.js';

const basePopup = (data) => {
    const popup = `
        <header class="popup__header">
            <div class="popup__body">
                <picture>
                    <source media="(min-width: 768px)" type="image/webp" srcset="../img/popup/${data.images[1]}.webp">
                    <source media="(min-width: 768px)" srcset="../img/popup/${data.images[1]}.jpg">
                    <source type="image/webp" srcset="../img/popup/${data.images[0]}.webp">
                    <img class="popup__img" src="../img/popup/${data.images[0]}.jpg"  alt="Изображение сайта">
                </picture>
            </div>
        </header>
        <div class="popup__main">
            <div class="popup__content">
                <div class="popup__top">
                    <h2 class="popup__title">${data.title}</h2>
                    <p class="popup__text">${data.descr}</p>
                </div>
                <a href="#" class="popup__visit">Посетить образец сайта</a>
                <div class="popup__bottom">
                    <div class="popup__item">
                        <h3 class="popup__title">Задача: </h3>
                        <p class="popup__addition">${data.text[0]}</p>
                    </div>
                    <div class="popup__item">
                        <h3 class="popup__title">Технологии: </h3>
                        <p class="popup__addition">${data.text[1]}</p>
                    </div>
                    <div class="popup__item">
                        <h3 class="popup__title">Сложность: </h3>
                        <p class="popup__addition">${data.text[2]}</p>
                    </div>
                </div>
            </div>
            <div class="popup__body-img">
                <picture>
                    <source type="image/webp" srcset="../img/popup/${data.images[3]}.webp">
                    <img src="../img/popup/${data.images[3]}.jpg" alt="Фоновое изображение сайта">
                </picture>
            </div>
        </div>
        <footer class="popup__footer">
            <video src="../video/popup/${data.video}"></video>
        </footer>
    `;

    return popup;
};

const gallery = document.querySelector('.gallery');


const renderPopup = (section) => {
    const tmpDiv = document.createElement('section');
    tmpDiv.classList.add('popup');
    tmpDiv.innerHTML = section;
    document.body.prepend(tmpDiv);
};

const onClickGallery = (evt) => {
    evt.preventDefault();

    const target = evt.target.closest('.gallery__item');

    if (!target) return;

    const currentData = target.dataset.popupItem;

    document.body.style.overflow = 'hidden';
    document.body.classList.add('stop-scrolling');

    if (!currentData) return;

    renderPopup(basePopup(dataGallery[currentData]));
};

gallery.addEventListener('click', onClickGallery);

