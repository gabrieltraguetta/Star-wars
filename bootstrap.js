function scrollCarousel(direction) {
  const carousel = document.getElementById('carousel');
  const scrollAmount = 180; // tamanho do "passo"

  carousel.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}