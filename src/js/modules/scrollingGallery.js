import { throttling } from "./utils.js";

const gallery = document.querySelector('.gallery__inner');

const onScrollWindow = () => {
    window.scrollBy(0, 1);
}

if (window.innerWidth >= 1050) {
    setInterval(() => {
        onScrollWindow();
    }, 30)
}

const getData = () => {
    let data = {};

    for (let i = 0; i < gallery.children.length; i++) {
        const current = gallery.children[i];
        const height = Array.from(current.children).reduce((prev, elem) => {
            return prev + elem.getBoundingClientRect().height + parseFloat(window.getComputedStyle(elem).marginBottom);
        }, 0)
        const gap = gallery.getBoundingClientRect().height - height;

        data[`elem${i}`] = {
            'elem': current,
            'height': height,
            'gap': gap,
            'top': 0,
        };
    }

    return data;
}

let data = getData();

const animationScroll = () => {
    for (let key in data) {
        data[key].elem.style.transform = `translateY(${data[key].top}px) translateZ(0px)`;
    }

    requestAnimationFrame(animationScroll);
}

animationScroll();


const onScrollGallery = (evt) => {
    const galleryPos = gallery.getBoundingClientRect().top;
    
    if (galleryPos >= 0) return;

    for (let key in data) {
        const currentPos = data[key].gap / (gallery.getBoundingClientRect().height - window.innerHeight);
    
        data[key].top = -currentPos * galleryPos;
    }

};

const scrollingGallery = () => {
    window.addEventListener('scroll', onScrollGallery);
};

export { scrollingGallery }