import { throttling } from "./utils.js";

const menu = document.querySelector('.menu');
const menuList = document.querySelector('.menu__list');


const getWidth = () => {
    const MARGIN = 40;

    let widthList = Array.from(menuList.children).reduce((cur, item) => {
        return cur + item.getBoundingClientRect().width + parseFloat(window.getComputedStyle(item).marginRight);
    }, 0);
    
    widthList -= window.innerWidth;
    
    return widthList + MARGIN;
};

let widthList = getWidth();
let currentPosX = 0;

const onMouseDown = (evt) => {
    let startX = evt.pageX;
    evt.target.ondragstart = () => false;

    const onMouseMove = (evt) => {
        const diff = startX - evt.pageX;
        currentPosX += diff;
        startX = evt.pageX;

        if (currentPosX > 0) currentPosX = 0;
        if (Math.abs(currentPosX) >= widthList) currentPosX = -widthList;
        
        menuList.style.transform = `translateX(${currentPosX}px)`;
    };

    const onMouseUp = () => {
        menu.removeEventListener('pointermove', throttlingMouseMove);
        document.removeEventListener('pointerup', onMouseUp);
    }

    const throttlingMouseMove = throttling(onMouseMove, 50);

    document.addEventListener('pointerup', onMouseUp);
    menu.addEventListener('pointerleave', onMouseUp);
    menu.addEventListener('pointermove', throttlingMouseMove);
};


menu.addEventListener('pointerdown', onMouseDown);
window.addEventListener('resize', () => {
    widthList = getWidth();
})
