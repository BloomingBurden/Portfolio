const frames = document.querySelectorAll('.about__frame');
const zVals = [];

let zSpacing = -1500;
let lastPos = zSpacing / 5;


const transformScroll = () => {
    let top = document.documentElement.scrollTop;
    let delta = lastPos - top;
    const spaceOpacity = window.innerWidth < 768 ? 3 : 2;

    lastPos = top;

    frames.forEach((item, i) => {
        zVals.push((i * zSpacing) + zSpacing);
        zVals[i] += delta * -5;

        let opacity = zVals[i] < Math.abs(zSpacing) / spaceOpacity ? 1 : 0;

        item.style.transform = `translateZ(${zVals[i]}px)`;
        item.style.opacity = `${opacity}`;
    });
};

transformScroll();

window.addEventListener('scroll', transformScroll);