import { throttling } from "./utils.js";

export const onMouseRotate = (wrap, elem) => {
    if (window.innerWidth < 768) return;
    
    const wrapper = document.querySelector(wrap);

    let currentX;
    let currentY;
    let currentTarget = null

    if (!wrapper) return;

    const SCALE = wrapper.dataset.rotateScale ? wrapper.dataset.rotateScale : 1.03;
    const SPEED = wrapper.dataset.rotateSpeed ? wrapper.dataset.rotateSpeed : 50;

    const changeRotateSlider = (evt) => {
        const target = evt.target.closest(elem);
        
        if (currentTarget) {
            currentTarget.style.cssText = `transform: perspective(700px) rotateX(${currentY / SPEED}deg) rotateY(${-currentX / SPEED}deg) scale3d(${SCALE}, ${SCALE}, ${SCALE})!important; box-shadow: 0 0 20px 3px rgba(0,0,0,0.2);`
        }   
      
        if (target !== currentTarget && currentTarget || currentTarget && !target) {
            currentTarget.style.cssText = `transform: perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)!important; box-shadow: 0 0 10px 5px rgba(0,0,0,0);`;
        }

        if (!target) return;

        currentTarget = target;
        currentX = evt.clientX - target.getBoundingClientRect().left - target.getBoundingClientRect().width / 2;
        currentY = evt.clientY - target.getBoundingClientRect().top - target.getBoundingClientRect().height / 2;   
    }

    const throttleRotate = throttling(changeRotateSlider, 40);
    wrapper.addEventListener('mousemove', throttleRotate);
}