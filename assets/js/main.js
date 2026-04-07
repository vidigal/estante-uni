document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Ícones Phosphor
    lucide = window.lucide; // Apenas para debug se fosse usar lucide, mas usaremos a tag <script src="https://unpkg.com/@phosphor-icons/web"></script>
    
    // Renderizar Favoritos
    const favoritosContainer = document.getElementById('favoritos-container');
    if (favoritosContainer && typeof estanteData !== 'undefined') {
        renderBooks(estanteData.favoritos, favoritosContainer, true);
    }

    // Renderizar Lidos Recentemente
    const recentesContainer = document.getElementById('recentes-container');
    if (recentesContainer && typeof estanteData !== 'undefined') {
        renderBooks(estanteData.lidosRecentemente, recentesContainer, false);
    }

    // Menu Mobile Toggle
    const btnMobile = document.getElementById('btn-mobile');
    const menu = document.getElementById('menu-mobile');
    if(btnMobile && menu) {
        btnMobile.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Fake Newsletter Form Submit
    const formNewsletter = document.getElementById('newsletter-form');
    if (formNewsletter) {
        formNewsletter.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletter-email');
            const btnSubmit = document.getElementById('newsletter-btn');
            const initialText = btnSubmit.innerHTML;

            if (emailInput.value) {
                // Simular request de rede
                btnSubmit.innerHTML = '<i class="ph ph-spinner animate-spin text-xl"></i>';
                btnSubmit.disabled = true;

                setTimeout(() => {
                    btnSubmit.innerHTML = '<i class="ph ph-check text-xl"></i> Inscrito!';
                    btnSubmit.classList.replace('bg-indigo-600', 'bg-emerald-600');
                    btnSubmit.classList.replace('hover:bg-indigo-500', 'hover:bg-emerald-500');
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        btnSubmit.innerHTML = initialText;
                        btnSubmit.disabled = false;
                        btnSubmit.classList.replace('bg-emerald-600', 'bg-indigo-600');
                        btnSubmit.classList.replace('hover:bg-emerald-500', 'hover:bg-indigo-500');
                    }, 3000);
                }, 1500);
            }
        });
    }
});

/**
 * Função para renderizar cards de livros
 * @param {Array} books Array de objetos de livros
 * @param {HTMLElement} container Elemento DOM onde serão inseridos
 * @param {boolean} showRating Se deve mostrar as estrelas de avaliação
 */
function renderBooks(books, container, showRating = false) {
    container.innerHTML = ''; // Limpar antes

    books.forEach(book => {
        let starsHtml = '';
        if (showRating && book.avaliacao) {
            starsHtml = `<div class="flex items-center text-amber-400 mt-2 text-sm">`;
            for (let i = 0; i < 5; i++) {
                if(i < book.avaliacao) {
                    starsHtml += `<i class="ph-fill ph-star"></i>`;
                } else {
                    starsHtml += `<i class="ph ph-star"></i>`;
                }
            }
            starsHtml += `</div>`;
        }

        const card = document.createElement('div');
        card.className = 'book-card bg-slate-800 rounded-xl overflow-hidden border border-slate-700/50 flex flex-col group cursor-pointer relative';
        
        // Elemento da Imagem
        card.innerHTML = `
            <div class="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden">
                <img src="${book.capa}" alt="Capa de ${book.titulo}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 object-top">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80"></div>
                ${book.sinopse ? `
                <div class="absolute inset-0 bg-indigo-900/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <p class="text-slate-200 text-sm italic text-center font-playfair line-clamp-6">"${book.sinopse}"</p>
                </div>
                ` : ''}
            </div>
            <div class="p-5 flex-1 flex flex-col">
                <span class="text-xs font-semibold text-indigo-400 tracking-wider uppercase mb-1">${book.genero}</span>
                <h3 class="text-lg font-bold text-slate-100 leading-tight mb-1 font-playfair group-hover:text-indigo-300 transition-colors">${book.titulo}</h3>
                <p class="text-slate-400 text-sm mb-2">${book.autor}</p>
                ${starsHtml}
                <div class="mt-auto pt-4">
                    <span class="text-xs text-slate-500 group-hover:text-indigo-400 transition-colors flex items-center gap-1 font-medium">Ver detalhes <i class="ph ph-arrow-right"></i></span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}
