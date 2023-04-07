const gallery = document.querySelector('.gallery__inner');
let stopScrolling = false;

const onScrollWindow = () => {
    if (document.body.classList.contains('stop-scrolling') || stopScrolling) return;
    window.scrollBy(0, 1);
}

if (window.innerWidth >= 1050) {
    setInterval(() => {
        onScrollWindow();
    }, 30)
}

let firstTempArray = [];
let secondTempArray = [];
let galleryChange = false;

const changeColumnGallery = () => {
    const firstColumn = document.querySelectorAll('.gallery__one');
    const secondColumn = document.querySelectorAll('.gallery__two');

    if (window.innerWidth <= 768) {

        if (galleryChange) return;

        if (firstColumn.length >= 2 || secondColumn.length >= 2) {
            firstTempArray = Array.from(firstColumn[1].children);
            secondTempArray = Array.from(secondColumn[1].children);
            firstColumn[0].append(...firstTempArray);
            secondColumn[0].append(...secondTempArray);
            galleryChange = true;
        }
    } else {
        if (!galleryChange) return;

        if (firstColumn[1].children.length === 0 || secondColumn[1].children.length === 0) {
            firstColumn[1].append(...firstTempArray);
            secondColumn[1].append(...secondTempArray);
            galleryChange = false;
        }
    }
}

changeColumnGallery();

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
        };
    }

    return data;
}

let data = getData();


const onScrollGallery = (evt) => {
    const galleryPos = gallery.getBoundingClientRect().top;
    
    for (let key in data) {
        let currentPos = data[key].gap / (gallery.getBoundingClientRect().height - window.innerHeight);

        if (galleryPos >= 0) {
            currentPos = 0;
        };
    
        data[key].elem.style.transform = `translateY(${-currentPos * galleryPos}px)`;
    }


};

const resetScroll = () => {
    changeColumnGallery();
    data = getData();
}

const scrollingGallery = () => {
    window.addEventListener('scroll', onScrollGallery);
    window.addEventListener('resize', resetScroll);
    gallery.addEventListener('mouseover', () => stopScrolling = true);
    gallery.addEventListener('mouseout', () => stopScrolling = false);
};

export { scrollingGallery }