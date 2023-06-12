if (document.body.classList.contains('index-body')) {
    const previewClose = document.querySelector('.layer__start');
    const previewDocument = document.querySelector('.start');

    const setAnimationOnPreview = () => {
        const leftTitle = document.querySelectorAll('.preview__piece--left');
        const rightTitle = document.querySelectorAll('.preview__piece--right');
    
        leftTitle.forEach(item => item.style.animationName = 'titleMoveLeft');
        rightTitle.forEach(item => item.style.animationName = 'titleMoveRight');
    };
    
    document.addEventListener('mousemove', evt => {
        let layers = document.querySelector('.layers__container');
    
        layers.style.transform = `rotateX(${(evt.clientY - window.innerHeight / 2) * .01}deg) rotateY(${(evt.clientX - window.innerWidth / 2) * -.005}deg)`;
    });
    
    previewClose.addEventListener('click', evt => {
        evt.preventDefault();

        previewDocument.classList.add('start--remove');
        document.body.style = 'overflow-y: auto';

        setTimeout(() => {
            previewDocument.style.display = 'none';
            setAnimationOnPreview();
        }, 1500);
    });
}
