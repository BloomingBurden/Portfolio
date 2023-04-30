const isWebp = () => {
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP(function (support) {
        let className = support ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
};

const onLoadWindow = () => {
    const leftTitle = document.querySelectorAll('.preview__piece--left');
    const rightTitle = document.querySelectorAll('.preview__piece--right');

    leftTitle.forEach(item => item.style.animationName = 'titleMoveLeft');
    rightTitle.forEach(item => item.style.animationName = 'titleMoveRight');
};

const clickMenu = () => {
    const button = document.querySelector('.menu__button');
    const menu = document.querySelector('.menu');
    const wrapper = document.querySelector('.wrapper');
    const preview = document.querySelector('.preview');

    button.addEventListener('click', (evt) => {
        const target = evt.target.closest('.menu__button');

        if (!target) return;

        if (menu.classList.contains('menu--opened')) {
            button.textContent = 'Меню';
            button.removeAttribute('style');
            wrapper.style.top = 0;
            if (!!preview) preview.style.top = 0;
            menu.classList.remove('menu--opened');
            menu.classList.add('menu--closed');
        } else if (menu.classList.contains('menu--closed')) {
            button.textContent = 'Закрыть';
            button.style.background = '#5918df';
            if (!!preview) preview.style.top = '-60vh';
            wrapper.style.top = '-60vh';
            menu.classList.remove('menu--closed');
            menu.classList.add('menu--opened');
        }
    });
};



window.addEventListener('load', onLoadWindow);

clickMenu();
isWebp();