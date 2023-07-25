export const parallaxEffect = () => {
    const wrapper = document.querySelector('.popup__main');
    const popup = document.querySelector('.popup');
    const item = document.querySelector('.popup__inner-img');
    let center = 0;

    const requestParallax = () => {
        item.style.transform = `translateY(${-1 * center / 1.5}px) translateZ(0)`;

        requestAnimationFrame(requestParallax);
    }

    requestParallax();

    popup.addEventListener('scroll', () => {
        if (window.innerHeight > wrapper.getBoundingClientRect().top && 0 < wrapper.getBoundingClientRect().top + wrapper.getBoundingClientRect().height) {
            center = wrapper.getBoundingClientRect().top;
        }
    });
};