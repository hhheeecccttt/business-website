document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count');
    document.querySelectorAll('.btn-green').forEach(button => {
        button.addEventListener('click', () => {
            cartCount.textContent = parseInt(cartCount.textContent) + 1;
            cartCount.classList.add('bump');
            setTimeout(() => cartCount.classList.remove('bump'), 200);
        });
    });

    const dotElement = document.querySelector('.dots');
    let dotCount = 1;
    setInterval(() => {
        dotCount = (dotCount % 3) + 1;
        dotElement.textContent = '.'.repeat(dotCount);
    }, 500);

    document.getElementById('query').addEventListener('input', e => {
        console.log('searching:', e.target.value); // remove once confirmed working
        filterCards(e.target.value.trim());
    });

    const loaderContainer = document.querySelector('.loader-container');
    const deals = document.querySelector('.deals');
    const feature = document.querySelector('.feature');

    setTimeout(() => {
        loaderContainer.style.display = 'none';
        deals.style.display = 'block';
        feature.style.display = 'block';
    }, Math.floor(Math.random() * 1500) + 500);
});