const gallery = document.querySelector('.gallery__inner');
let stopScrolling = false;

const onScrollWindow = () => {
    window.scrollBy(0, 1);
}


const intervalScroll = () => {
    if (window.innerWidth >= 1050) {
        setInterval(() => {
            if (document.body.classList.contains('stop-scrolling') || stopScrolling || document.body.classList.contains('works-page')) return;
            
            onScrollWindow();
        }, 30)
    }
}
intervalScroll();


const resetTransform = (data) => {
    data.forEach(item => {
        item.elem.style.transform = `translateY(${0}px) translateZ(0px)`;
    })

    gallery.style.height = `auto`;
}

const getData = () => {
    let data = [];

    for (let i = 0; i < gallery.children.length; i++) {
        const current = gallery.children[i];
        const height = gallery.children[i].getBoundingClientRect().height;
        const gap = gallery.getBoundingClientRect().height - height;
        
        if (height <= 10) {
            continue;
        }

        data.push({
            elem: current,
            gap: gap,
            height: height,
        });
    }
    
    data.sort((a, b) => a.gap < b.gap ? true : false);

    let maxGap = data[0].gap;

    data.forEach((item, i) => {
        if (i !== 0) {
            item.gap = maxGap - item.gap;
        }
    });

    data[0].gap = 0;

    if (window.innerHeight > data[0].height) {
        resetTransform(data);
        return false;
    }

    gallery.style.height = `${data[0].height}px`;

    return data;
}

let data = !gallery ? false : getData();


const onScrollGallery = (evt) => {
    const galleryPos = gallery.getBoundingClientRect().top;

    if (!data) return;
    
    for (let obj of data) {
        let currentPos = obj.gap / (data[0].height - window.innerHeight);

        if (galleryPos >= 0) {
            currentPos = 0;
        };
    
        obj.elem.style.transform = `translateY(${currentPos * galleryPos}px) translateZ(0px)`;
    }
};

const resetScroll = () => {
    data = getData();
}

const scrollingGallery = () => {
    if (!gallery) return;

    window.addEventListener('scroll', onScrollGallery);
    window.addEventListener('resize', resetScroll);

    if (document.body.classList.contains('index-body')) {
        gallery.addEventListener('mouseover', () => stopScrolling = true);
        gallery.addEventListener('mouseout', () => stopScrolling = false);
    }
};

export { scrollingGallery }