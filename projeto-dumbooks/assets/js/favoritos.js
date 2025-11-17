document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. CONFIGURAÇÃO DOS CARROSSÉIS DE ROLAGEM ARRASTÁVEL ---
    
    const scrollContainers = document.querySelectorAll(".horizontal-scroll-container");

    scrollContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;

        // Inicia a ação de arrastar
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.classList.add('active-dragging');
            startX = e.pageX - container.offsetLeft; 
            scrollLeft = container.scrollLeft; 
        });

        // Finaliza a ação (mouse solto ou fora do container)
        ['mouseleave', 'mouseup'].forEach(event => {
            container.addEventListener(event, () => {
                isDown = false;
                container.classList.remove('active-dragging');
            });
        });

        // Realiza a rolagem
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return; 
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2; 
            container.scrollLeft = scrollLeft - walk;
        });
    });


    // --- 2. NAVEGAÇÃO ATIVA DA BARRA SUPERIOR ---

    const navButtons = document.querySelectorAll(".nav-btn");

    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove a classe 'active' de todos os botões
            navButtons.forEach(btn => btn.classList.remove("active"));
            // Adiciona a classe 'active' apenas ao botão clicado
            button.classList.add("active");
        });
    });
});