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
});