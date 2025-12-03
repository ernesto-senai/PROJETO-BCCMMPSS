document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  
  // Verificação de segurança: se não achar o carrossel, para o script para não dar erro
  if (!track) return;

  const slides = Array.from(track.children);
  const dotsContainer = document.querySelector(".dots");

  // Limpa dots antigos
  if (dotsContainer) dotsContainer.innerHTML = "";

  // Cria os dots
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.dataset.index = i;
    if (dotsContainer) dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer ? Array.from(dotsContainer.children) : [];
  let current = 0;

  function showSlide(index) {
    current = index;
    // Move o track para a esquerda baseado no index (0%, -100%, -200%...)
    track.style.transform = `translateX(${-index * 100}%)`;
    
    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  // Evento de clique nos dots
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.index));
    });
  });

  // Autoplay (muda a cada 4 segundos)
  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 4000);
});