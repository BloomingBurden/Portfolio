const aboutList = document.querySelectorAll('.about__skill');

const setAnimationOnList = () => {
    aboutList.forEach((item, i) => {
        const DELAY = 0.5 * i;

        item.classList.add('about__skill--anime');
        item.style.animationDelay = `${DELAY}s`;
    });
};

export { setAnimationOnList }