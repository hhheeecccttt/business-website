document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.btn-green');
    const cartCount = document.getElementById('cart-count');

    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            let current = parseInt(cartCount.textContent);
            cartCount.textContent = current + 1;
            cartCount.classList.add('bump');
            setTimeout(() => {
                cartCount.classList.remove('bump');
            }, 200);
        });
    });

    let dotCount = 1;
    const dotElement = document.querySelector(".dots");
    function pulseDots() {
        dotCount = (dotCount % 3) + 1;
        dotElement.textContent = " .".repeat(dotCount);
    }
    
    setInterval(pulseDots, 500);
    
    const loaderContainer = document.querySelector('.loader-container');
    const deals = document.querySelector('.deals');
    const feature = document.querySelector('.feature');

    setTimeout(() => {
        loaderContainer.style.display = 'none';
        deals.style.display = 'block';
        feature.style.display = 'block';
    }, Math.floor(Math.random() * (4500 - 2000 + 1)) + 2000);
});