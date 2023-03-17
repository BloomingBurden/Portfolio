const menu = document.querySelector('.menu');
const menuList = document.querySelector('.menu__list');

let widthList = Array.from(menuList.children).reduce((cur, item) => {
    return cur + item.getBoundingClientRect().width + parseFloat(window.getComputedStyle(item).marginRight);
}, 0);


let current = 0;

const onMouseDown = (evt) => {
    let startX = evt.pageX;
    evt.target.ondragstart = () => false;

    const onMouseMove = (evt) => {
        const diff = startX - evt.pageX;
        current += diff;
        startX = evt.pageX;
        menuList.style.transform = `translateX(${current}px)`;
    };

    const onMouseUp = () => {
        menu.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('pointerup', onMouseUp);
    }

    document.addEventListener('pointerup', onMouseUp);
    menu.addEventListener('pointerleave', onMouseUp);
    menu.addEventListener('mousemove', onMouseMove);
};


menu.addEventListener('pointerdown', onMouseDown);
