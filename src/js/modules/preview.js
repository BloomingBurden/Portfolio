if (document.body.classList.contains('index-body')) {
    const previewClose = document.querySelector('.layer__start');
    const previewDocument = document.querySelector('.start');
    const indexWrapper = document.querySelector('.index-body .wrapper');

    const removePreview = () => {
        previewDocument.classList.add('start--remove');
        document.body.classList.remove('no-scrolling');
        indexWrapper.style.transform = 'translateX(0)';

        setTimeout(() => {
            previewDocument.style.display = 'none';
            setAnimationOnPreview();
        }, 1500);
    }

    const isMobile = () => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            removePreview();
        }
    }
        
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

        removePreview();
    });

    isMobile();
}
