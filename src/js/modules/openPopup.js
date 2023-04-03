const basePopup = (title, subtitle, images, text) => {
    const popup = `
        <section class="popup">
            <header class="popup__header">
            <div class="popup__preview">
                <h2 class="popup__title">${title}</h2>
                <p class="popup__subtitle">${subtitle}</p>
            </div>
            <div class="popup__body">
                <img src="${images[0]}" alt="Изображение сайта - моб версия" class="popup__img popup__img--mobile">
                <img src="${images[1]}" alt="Изображение сайта - планшетная версия" class="popup__img popup__img--table">
                <img src="${images[2]}" alt="Изображение сайта - компьютерная версия" class="popup__img popup__img--desktop">
            </div>
            </header>
            <div class="popup__top">
            <h3 class="popup__preview"><h3>
            <p class="popup__text"></p>
            </div>
            <ul class="popup__bottom">
            <li class="popup__item">
                <h3 class="popup__preview">Задача: </h3>
                <p class="popup__addition">${text[0]}</p>
            </li>
            <li class="popup__item">
                <h3 class="popup__preview">Технологии: </h3>
                <p class="popup__addition">${text[1]}</p>
            </li>
            <li class="popup__item">
                <h3 class="popup__preview">Проблемы: </h3>
                <p class="popup__addition">${text[2]}</p>
            </li>
            <li class="popup__item">
                <h3 class="popup__preview">Сложность: </h3>
                <p class="popup__addition">${text[3]}</p>
            </li>
            </ul>
        </section>
    `
}