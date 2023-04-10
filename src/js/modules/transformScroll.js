import { setAnimationOnList } from "./aboutListUp.js";

const frames = document.querySelectorAll('.about__frame');
const zVals = [];

let zSpacing = window.innerWidth >= 1440 ? -1000 : -1300;
let lastPos = zSpacing / 5;
let isTextReady = false;

const transformScroll = () => {
    let top = document.documentElement.scrollTop;
    let delta = lastPos - top;
    const spaceOpacity = window.innerWidth >= 1440 ? 1.5 : 3;

    lastPos = top;

    frames.forEach((item, i) => {
        zVals.push((i * zSpacing) + zSpacing);
        zVals[i] += delta * -5;

        let opacity = zVals[i] < Math.abs(zSpacing) / spaceOpacity ? 1 : 0;

        item.style.transform = `translateZ(${zVals[i]}px)`;
        item.style.opacity = `${opacity}`;

        if (item.classList.contains('about__frame--list')) {
            if (item.getBoundingClientRect().top + 100 <= 0) {
                if (!isTextReady) {
                    setAnimationOnList();
                }

                isTextReady = true;
            }
        }
    });
};

transformScroll();

window.addEventListener('scroll', transformScroll);