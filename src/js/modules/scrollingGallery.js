export const scrollingGallery = () => {
    const gallery = document.querySelector('.gallery');
    const leftBlock = gallery.querySelector('.gallery__left');
    const rightBlock = gallery.querySelector('.gallery__right');


    const getGap = () => {
        const leftElems = leftBlock.children;
        const rightElems = rightBlock.children;
        const leftElemPos = leftElems[leftElems.length - 1].offsetHeight + leftElems[leftElems.length - 1].getBoundingClientRect().top;
        const rightElemPos = rightElems[rightElems.length - 1].offsetHeight + rightElems[rightElems.length - 1].getBoundingClientRect().top;
        const gap = Math.abs(leftElemPos - rightElemPos);
        
        return leftElemPos > rightElemPos ? {elem: rightBlock, gap: gap} : {elem: leftBlock, gap: gap}
    }


    let gap = getGap();
    let step = (gap.elem.getBoundingClientRect().height - window.innerHeight) / gap.gap;

    const startScroll = () => {
        const currentstep = leftBlock.getBoundingClientRect().top;

        if (currentstep <= 0) {
            gap.elem.style.transform = `translateY(${Math.abs(currentstep / step)}px) translateZ(0px)`;
        } else {
            gap.elem.style.transform = `translateY(${currentstep / step}px) translateZ(0px)`;
        }

    };

    const onScrollGallery = (evt) => {
        const galleryPos = gallery.getBoundingClientRect().top;

        if (galleryPos <= 0) {
            startScroll();
        } else {
            gap.elem.style.transform = `translateY(${0}px) translateZ(0px)`;
        }
    };

    window.addEventListener('scroll', onScrollGallery);
    window.addEventListener('resize', () => {
        gap = getGap();
        step = (gap.elem.getBoundingClientRect().height - window.innerHeight) / gap.gap;
    });
};