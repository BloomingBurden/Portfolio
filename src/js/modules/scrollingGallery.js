import { throttling } from "./utils.js";

const onScrollWindow = () => {
    window.scrollBy(0, 1);
}

if (window.innerWidth >= 1050) {
    setInterval(() => {
        onScrollWindow();
    }, 30)
}

const scrollingGallery = () => {
    const gallery = document.querySelector('.gallery');
    const bigColumn = gallery.querySelectorAll('.gallery__big');
    const smallColumn = gallery.querySelectorAll('.gallery__small');

    const getGap = () => {
        let result = {};

        for (let i = 0; i < bigColumn.length; i++) {
            const leftElems = bigColumn[i].children;
            const rightElems = smallColumn[i].children;
            const leftElemPos = leftElems[leftElems.length - 1].getBoundingClientRect().height + leftElems[leftElems.length - 1].getBoundingClientRect().top;
            const rightElemPos = rightElems[rightElems.length - 1].getBoundingClientRect().height + rightElems[rightElems.length - 1].getBoundingClientRect().top;
            const gap = Math.abs(leftElemPos - rightElemPos);

            if (leftElemPos > rightElemPos) {
                result[`elem${i}`] = { elem: smallColumn[i], gap: gap };
            } else {
                result[`elem${i}`] = { elem: bigColumn[i], gap: gap };
            }
        }

        return result;
    }

    let gap = getGap();
    let windowHeight = window.innerHeight;
    let galleryHeight = gallery.getBoundingClientRect().height;
    let prevMeaningWidth = window.innerWidth;

    const startScroll = (item,  index) => {
        windowHeight = window.innerHeight;
        galleryHeight = item.elem.getBoundingClientRect().height;
        let currentPos = bigColumn[index].getBoundingClientRect().top;

        let step = currentPos / ((galleryHeight - windowHeight) / item.gap);
        
        if (Math.abs(step) >= item.gap) {
            step = item.gap;
        }
        
        item.elem.style.transform = `translateY(${Math.abs(step)}px) translateZ(0px)`;
    };

    const reset = (item) => {
        item.style.transform = `translateY(${0}px) translateZ(0px)`;
    }

    const onScrollGallery = () => {
        let index = 0;

        for (let key in gap) {
            const galleryPos = gap[key].elem.getBoundingClientRect().top;

            if (galleryPos <= 0) {
                startScroll(gap[key], index);
            } else {
                reset(gap[key].elem);
            }

            index++;
        }
    };


    const TIMING = 10;
    const throttlingScrollGallery = throttling(onScrollGallery, TIMING);

    window.addEventListener('scroll', throttlingScrollGallery);
    window.addEventListener('resize', () => {
        if (window.innerWidth !== prevMeaningWidth) {
            prevMeaningWidth = window.innerWidth;
            for (let key in gap) {
                reset(gap[key].elem);
            }
            gap = getGap();
            windowHeight = window.innerHeight;
            galleryHeight = gallery.getBoundingClientRect().height;
        }
    })
};

export { scrollingGallery }