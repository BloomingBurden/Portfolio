const gallery = document.querySelector('.gallery__inner');
let stopScrolling = false;

const onScrollWindow = () => {
    window.scrollBy(0, 1);
}


const intervalScroll = () => {
    if (document.body.classList.contains('stop-scrolling') || stopScrolling) return;
    if (window.innerWidth >= 1050) {
        setInterval(() => {
            onScrollWindow();
        }, 30)
    }
}
intervalScroll();


let firstTempArray = [];
let secondTempArray = [];
let galleryChange = false;

const changeColumnGallery = () => {
    const firstColumn = document.querySelectorAll('.gallery__one');
    const secondColumn = document.querySelectorAll('.gallery__two');

    if (window.innerWidth < 768) {

        if (galleryChange) return;

        if (firstColumn.length >= 2 || secondColumn.length >= 2) {
            firstTempArray = Array.from(firstColumn[1].children);
            secondTempArray = Array.from(secondColumn[1].children);

            firstColumn[1].style.display = 'none';
            secondColumn[1].style.display = 'none';

            firstColumn[0].append(...firstTempArray);
            secondColumn[0].append(...secondTempArray);
            galleryChange = true;
        }
    } else {
        if (!galleryChange) return;

        if (firstColumn[1].children.length === 0 || secondColumn[1].children.length === 0) {
            firstColumn[1].style.display = 'initial';
            secondColumn[1].style.display = 'initial';
            firstColumn[1].append(...firstTempArray);
            secondColumn[1].append(...secondTempArray);
            galleryChange = false;
        }
    }
}

changeColumnGallery();

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
    changeColumnGallery();
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