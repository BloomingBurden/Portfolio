if (document.body.classList.contains('works-page')) {
    const wrapper = document.querySelector('.work-inner');

    let currentX;
    let currentY;
    let currentTarget = document.querySelector('.slider__img');

    const sliderRequestAnimation = () => {
        currentTarget.style.cssText = `transform: perspective(700px) rotateX(${currentY / 15}deg) rotateY(${currentX / 15}deg) scale3d(1.05, 1.05, 1.05)!important;
                                    box-shadow: 0 0 30px 5px rgba(0,0,0,0.5);   
                                    `

        requestAnimationFrame(sliderRequestAnimation);
    }
    sliderRequestAnimation()

    const changeRotateSlider = (evt) => {
        const target = evt.target.closest('.slider__img');

        if (!target) return;


        currentTarget = target;
        currentX = evt.pageX - target.getBoundingClientRect().left - target.getBoundingClientRect().width / 2;
        currentY = evt.pageY - target.getBoundingClientRect().top - target.getBoundingClientRect().width / 2 - 80;

    }

    wrapper.addEventListener('mousemove', changeRotateSlider);
    wrapper.addEventListener('mouseout', () => {
        document.querySelectorAll('.slider__img').forEach(item => item.style.cssText = `transform: perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)!important; box-shadow: 0 0 10px 5px rgba(0,0,0,0);`)
    });
}
