export const scrollingGallery = () => {
    const gallery = document.querySelector('.gallery');
    const leftBlock = gallery.querySelector('.gallery__left');
    const rightBlock = gallery.querySelector('.gallery__right');

    const getGap = () => {
        const leftElems = leftBlock.children;
        const rightElems = rightBlock.children;
        const leftElemPos = leftElems[leftElems.length - 1].getBoundingClientRect().height + leftElems[leftElems.length - 1].getBoundingClientRect().top;
        const rightElemPos = rightElems[rightElems.length - 1].getBoundingClientRect().height + rightElems[rightElems.length - 1].getBoundingClientRect().top;
        const gap = Math.abs(leftElemPos - rightElemPos);
        
        return leftElemPos > rightElemPos ? {elem: rightBlock, gap: gap} : {elem: leftBlock, gap: gap}
    }


    let gap = getGap();
    let windowHeight = window.innerHeight;
    let galleryHeight = gallery.getBoundingClientRect().height;
    let prevMeaningWidth = window.innerWidth;

    const startScroll = () => {
        windowHeight = window.innerHeight;
        
        const currentStep = gallery.getBoundingClientRect().top;
        const step = (galleryHeight - windowHeight) / gap.gap

        gap.elem.style.transform = `translateY(${Math.abs(currentStep / step)}px) translateZ(0px)`;
    };

    const reset = () => {
        gap.elem.style.transform = `translateY(${0}px) translateZ(0px)`;
    }

    const onScrollGallery = (evt) => {
        const galleryPos = gallery.getBoundingClientRect().top;

        if (galleryPos <= 0) {
            startScroll();
        } else {
            reset();
        }
    };

    window.addEventListener('scroll', onScrollGallery);
    window.addEventListener('resize', () => {
        if (window.innerWidth !== prevMeaningWidth) {
            prevMeaningWidth = window.innerWidth;
            reset();
            gap = getGap();
            windowHeight = window.innerHeight;
            galleryHeight = gallery.getBoundingClientRect().height;
        }
    })
};