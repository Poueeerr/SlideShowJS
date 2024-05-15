document.getElementById('imageUpload').addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    const files = event.target.files;
    const slidesContainer = document.getElementById('slides');
    const navigationContainer = document.getElementById('navigation');

    slidesContainer.innerHTML = ''; // Limpa o container de slides
    navigationContainer.innerHTML = ''; // Limpa a navegação

    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `<img src="${e.target.result}" alt="Slide Image">`;

            slidesContainer.appendChild(slide);

            const navBar = document.createElement('div');
            navBar.className = 'bar';
            navBar.addEventListener('click', () => navigateToSlide(index));
            navigationContainer.appendChild(navBar);
        };

        reader.readAsDataURL(file);
    });

    // Atualiza a largura do contêiner de slides baseado na quantidade de imagens
    slidesContainer.style.width = `${files.length * 100}%`;
}

function navigateToSlide(index) {
    const slidesContainer = document.getElementById('slides');
    slidesContainer.style.marginLeft = `-${index * 100}%`;
}

// Atualização do intervalo de slides
let contador = 0;
setInterval(function() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        contador = (contador + 1) % slides.length;
        navigateToSlide(contador);
    }
}, 3000);
