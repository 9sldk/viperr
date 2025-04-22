document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-to-cart');
    const cartCounter = document.querySelector('.cart-btn');
    let cartItems = 0;

    addButton.addEventListener('click', () => {
        cartItems++;
        cartCounter.textContent = cartItems;
        
        addButton.textContent = 'ADDED';
        setTimeout(() => {
            addButton.textContent = 'ADD TO CART';
        }, 1000);
        
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });
});
