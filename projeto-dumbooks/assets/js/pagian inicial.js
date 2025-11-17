document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const dotsContainer = document.querySelector(".dots");

    // Verifica se os elementos necessários existem
    if (!track || !dotsContainer || slides.length === 0) {
        console.error("Carrossel incompleto. Verifique as classes 'carousel-track' e 'dots'.");
        return;
    }

    // Cria os dots (bolinhas) dinamicamente com base no número de slides
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active"); // O primeiro dot é ativado
        dot.dataset.index = i; // Armazena o índice do slide
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);
    let current = 0;

    /**
     * Move o carrossel para o slide dado pelo índice.
     * @param {number} index - O índice do slide a ser exibido.
     */
    function showSlide(index) {
        current = index;
        // Aplica a transformação CSS para mover o carrossel.
        // Por exemplo, para o slide 1, move -100%, para o slide 2, move -200%.
        track.style.transform = `translateX(${-index * 100}%)`;
        
        // Atualiza a classe 'active' para destacar o dot correto
        dots.forEach((dot) => dot.classList.remove("active"));
        if (dots[index]) {
            dots[index].classList.add("active");
        }
    }

    // --- 1. Navegação Manual (Dots) ---
    // Adiciona um ouvinte de evento para cada dot
    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            // Converte o data-index (string) para número
            showSlide(Number(dot.dataset.index));
        });
    });

    // --- 2. Autoplay (Transição Automática) ---
    // Configura um intervalo para trocar os slides automaticamente
    setInterval(() => {
        // Calcula o próximo slide (retorna ao 0 após o último)
        current = (current + 1) % slides.length;
        showSlide(current);
    }, 4000); // Troca a cada 4000 milissegundos (4 segundos)
});