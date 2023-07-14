export const onMoveFilter = () => {
    if (window.innerWidth < 768) return;

    var container = document.querySelector('.preview');
    var imageOne = document.querySelector('.preview__rect');
    let currentCircle = 10;
    let mouseX = null;
    let mouseY = null;

    const circleMoveRequest = () => {
        imageOne.style.clipPath = `circle(${currentCircle}px at ${mouseX}px ${mouseY}px)`;
        requestAnimationFrame(circleMoveRequest);
    }

    circleMoveRequest();
    
    container.addEventListener('mousemove', function(event) {
      var rect = container.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
      
      currentCircle = Math.floor((mouseX + mouseY) / 3);
    });

    container.addEventListener('mouseout', function(event) {   
        currentCircle = 0;
    });
}