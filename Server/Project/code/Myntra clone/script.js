const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
let index = 0;

// Create dots
slides.forEach((slide, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) {
    dot.classList.add('active');
  }
  dot.addEventListener('click', () => {
    goToSlide(i);
  });
  dotsContainer.appendChild(dot);
});

function goToSlide(i) {
  index = i;
  const slideWidth = slides[0].clientWidth;
  slider.style.transform = `translateX(-${slideWidth * index}px)`;

  // Update active dot
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function slide() {
  index++;
  if (index === slides.length) {
    index = 0;
  }
  goToSlide(index);
}
  setInterval(slide, 5000);
  const input = document.getElementById('input-search');

  input.addEventListener('click', function() {
      this.classList.add('clicked'); 
  });