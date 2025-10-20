// Este código se ejecutará una vez que todo el contenido del DOM (Document Object Model) haya sido cargado.
// Esto asegura que podemos acceder a los elementos HTML de forma segura.
document.addEventListener('DOMContentLoaded', () => {

    // 1. Funcionalidad para el botón "PROCEDER AL PAGO"
    // Obtenemos una referencia al botón usando su ID
    const proceedToPaymentButton = document.getElementById('proceedToPayment');

    // Verificamos si el botón existe en la página (solo estará en pedidos.html)
    if (proceedToPaymentButton) {
        // Añadimos un "escuchador de eventos" (event listener) para cuando se haga clic en el botón
        proceedToPaymentButton.addEventListener('click', (event) => {
            // event.preventDefault() es útil para formularios para evitar que la página se recargue,
            // aunque en este caso una redirección es lo que queremos. Podría ser útil para futuras validaciones.
            // event.preventDefault();

            // Aquí es donde podrías añadir lógica para validar el formulario de pago/envío
            // Por ahora, simplemente redirigimos a la página de confirmación.

            // Redirigimos al usuario a la página de confirmación del pedido
            // Asegúrate de que 'confirmacion-pedido.html' sea la ruta correcta a tu archivo
            window.location.href = 'gracias.html';
        });
    }

    // 2. Funcionalidad para los botones de método de pago (opcional, para visualización)
    // Obtenemos todos los botones con la clase 'btn-payment'
    const paymentButtons = document.querySelectorAll('.btn-payment');

    // Iteramos sobre cada botón de pago para añadirles un escuchador de clic
    paymentButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Primero, removemos la clase 'active' de todos los botones
            paymentButtons.forEach(btn => btn.classList.remove('active'));
            // Luego, añadimos la clase 'active' al botón que fue clicado
            button.classList.add('active');
        });
    });


    // 3. Funcionalidad para el botón "REGRESAR" (en pedidos.html y confirmacion-pedido.html)
    // Obtenemos todos los botones con la clase 'btn-return'
    const returnButtons = document.querySelectorAll('.btn-return');

    returnButtons.forEach(button => {
        button.addEventListener('click', () => {
            // history.back() regresa a la página anterior en el historial del navegador
            window.history.back();
        });
    });


    // 4. Funcionalidad para los campos de cantidad (en pedidos.html)
    // Esto es para que el "TOTAL" se actualice automáticamente
    const quantityInput = document.getElementById('quantity');
    const priceSpan = document.querySelector('.order-info-card .option-group .price');
    const totalSpan = document.querySelector('.order-info-card .option-group .total');

    if (quantityInput && priceSpan && totalSpan) {
        // Función para actualizar el total
        const updateOrderTotal = () => {
            const priceText = priceSpan.textContent; // Obtiene "$30.00"
            const priceValue = parseFloat(priceText.replace('$', '')); // Convierte a número (30.00)
            const quantity = parseInt(quantityInput.value); // Obtiene la cantidad (1)

            if (!isNaN(priceValue) && !isNaN(quantity)) {
                const newTotal = priceValue * quantity;
                totalSpan.textContent = `$${newTotal.toFixed(2)}`; // Actualiza el total con 2 decimales
            }
        };

        // Escucha cambios en el campo de cantidad
        quantityInput.addEventListener('input', updateOrderTotal);

        // Llama a la función una vez al cargar la página para establecer el total inicial
        updateOrderTotal();
    }


    // 5. Funcionalidad para el botón "RECOGER EN TIENDA" (en pedidos.html)
    const pickupButton = document.querySelector('.btn-pickup');
    const addressInput = document.getElementById('address');

    if (pickupButton && addressInput) {
        pickupButton.addEventListener('click', () => {
            // Deshabilita el campo de dirección y lo vacía si se selecciona "Recoger en tienda"
            addressInput.value = 'RECOGER EN TIENDA';
            addressInput.disabled = true; // Deshabilita la edición
            // También puedes cambiar el estilo o indicar que la dirección no es necesaria
            // Si el botón se vuelve un toggle, necesitarías más lógica para re-habilitar el campo.
        });
    }

}); // Fin de DOMContentLoaded
const cartCount = document.querySelector('.cart-count');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        // Incrementa el contador
        let count = parseInt(cartCount.textContent);
        cartCount.textContent = count + 1;

        // Agrega la clase para animación
        cartCount.classList.add('bounce');

        // Quita la clase después de que termine la animación
        setTimeout(() => {
            cartCount.classList.remove('bounce');
        }, 400);
    });
});
