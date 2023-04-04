import { dataGallery } from './dataGallery.js';

const basePopup = (data) => {
    const popup = `
        <header class="popup__header">
            <div class="popup__preview">
                <h2 class="popup__title">${data.title}</h2>
                <p class="popup__subtitle">${data.subtitle}</p>
            </div>
            <div class="popup__body">
                <img src="../img/popup/${data.images[0]}" alt="Изображение сайта - моб версия" class="popup__img popup__img--mobile">
                <img src="../img/popup/${data.images[1]}" alt="Изображение сайта - планшетная версия" class="popup__img popup__img--table">
                <img src="../img/popup/${data.images[2]}" alt="Изображение сайта - компьютерная версия" class="popup__img popup__img--desktop">
            </div>
        </header>
        <div class="popup__main">
            <div class="popup__top">
                <h3 class="popup__body-title">${data.preview}</h3>
                <p class="popup__text">${data.descr}</p>
            </div>
            <ul class="popup__bottom">
                <li class="popup__item">
                    <h3 class="popup__bot-title">Задача: </h3>
                    <p class="popup__addition">${data.text[0]}</p>
                </li>
                <li class="popup__item">
                    <h3 class="popup__bot-title">Технологии: </h3>
                    <p class="popup__addition">${data.text[1]}</p>
                </li>
                <li class="popup__item">
                    <h3 class="popup__bot-title">Сложность: </h3>
                    <p class="popup__addition">${data.text[2]}</p>
                </li>
            </ul>
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

