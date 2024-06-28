document.addEventListener('DOMContentLoaded', () => {
    const productosCarrito = document.getElementById('lista-productos-carrito');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const mostrarCarritoBtn = document.getElementById('mostrar-carrito');
    const productosCarritoContainer = document.getElementById('productos-carrito');
    const irAPagarBtn = document.getElementById('ir-a-pagar');
    const totalPrecioEl = document.getElementById('total-precio');
    const mensajeCarritoVacio = document.getElementById('mensaje-carrito-vacio'); 

    let totalPrecio = 0;

    const productos = [
        { id: 1, nombre: 'Acetaminofén + Tizanidina', concentracion: '350mg - 2mg', precio: 15160 },
        { id: 2, nombre: 'Acetaminofén', concentracion: '500mg', precio: 15160 },
        { id: 3, nombre: 'Acetaminofén + Codeina ', concentracion: '325mg - 30mg', precio: 15160 },
        { id: 4, nombre: 'Acetaminofén + Hidrocodona', concentracion: '325mg - 5mg', precio: 15160 },
        { id: 5, nombre: 'Aciclovir', concentracion: '200mg', precio: 15160 },
        { id: 6, nombre: 'Albendazol', concentracion: '200mg', precio: 15160 },
        { id: 7, nombre: 'Alcohol Polivinilico', concentracion: '1.4%', precio: 15160 },
        { id: 8, nombre: 'Amiodarona', concentracion: '200mg', precio: 15160 },
        { id: 9, nombre: 'Amitriptilina', concentracion: '25mg', precio: 15160 },
        { id: 10, nombre: 'Amlodipino', concentracion: '5mg', precio: 15160 },
        { id: 11, nombre: 'Amoxicilina', concentracion: '500mg', precio: 15160 },
        { id: 12, nombre: 'Ampicilina', concentracion: '250mg - 5ml', precio: 15160 },
        { id: 13, nombre: 'Aspirina', concentracion: '500mg', precio: 15160 },
        { id: 14, nombre: 'Atorvastatina', concentracion: '20mg', precio: 15160 },
        { id: 15, nombre: 'Atorvastatina', concentracion: '40mg', precio: 15160 },
        { id: 16, nombre: 'Azitromicina', concentracion: '200mg - 5ml', precio: 15160 },
        { id: 17, nombre: 'Beclometasona', concentracion: '250mcg', precio: 15160 },
        { id: 18, nombre: 'Bencidamina', concentracion: '3mg', precio: 15160 },
        { id: 19, nombre: 'Betahistina', concentracion: '24mg', precio: 15160 },
        { id: 20, nombre: 'Betahistina', concentracion: '8mg', precio: 15160 },
        { id: 21, nombre: 'Betametasona + Clotrimazol + Neomicina', concentracion: '40g', precio: 15160 },
        { id: 22, nombre: 'Betaduo', concentracion: '2ml', precio: 15160 },
        { id: 23, nombre: 'Betametasona', concentracion: '0.05%', precio: 15160 },
        { id: 24, nombre: 'Biperideno', concentracion: '2mg', precio: 15160 },
        { id: 25, nombre: 'Bisacodilo', concentracion: '5mg', precio: 15160 },
        { id: 26, nombre: 'Brimonidina Tartrato', concentracion: '0.2%', precio: 15160 },
        { id: 27, nombre: 'Buclizina', concentracion: '25mg', precio: 15160 },
        { id: 28, nombre: 'Calcio Carbonato', concentracion: '600mg', precio: 15160 },
        { id: 29, nombre: 'Calcio + Vitamina D', concentracion: '600mg', precio: 15160 },
        { id: 30, nombre: 'Calcitriol', concentracion: '0.25mcg', precio: 15160 },
        { id: 31, nombre: 'Loratadina', concentracion: '5mg', precio: 15160 },
        { id: 32, nombre: 'Mieltertos', concentracion: '240ml', precio: 15160 },
        { id: 33, nombre: 'Salbutamol', concentracion: '100mcg', precio: 15160 },
        { id: 34, nombre: 'Captotril', concentracion: '25mg', precio: 15160 },
        { id: 35, nombre: 'Captotril', concentracion: '50mg', precio: 15160 },
        { id: 36, nombre: 'Carvedilol', concentracion: '12.5mg', precio: 15160 },
        { id: 37, nombre: 'Carvedilol', concentracion: '25mg', precio: 15160 },
        { id: 38, nombre: 'Cefalexina', concentracion: '250mg - 5ml', precio: 15160 },
        { id: 39, nombre: 'Cetirizina', concentracion: '10mg', precio: 15160 },
    ];

    document.querySelectorAll('.column .btn-agregar').forEach(button => {
        button.addEventListener('click', (e) => {
            const productoId = parseInt(e.target.getAttribute('data-id'));
            const producto = productos.find(prod => prod.id === productoId);
            if (producto) {
                agregarAlCarrito(producto);
            }
        });
    });

    function agregarAlCarrito(producto) {
        const productoCarrito = document.createElement('div');
        productoCarrito.classList.add('carrito-item');
        productoCarrito.innerHTML = `
            <h4>${producto.nombre}</h4>
            <p>${producto.concentracion}</p>
            <p>Precio: $${producto.precio}</p>
            <button class="btn-eliminar" data-id="${producto.id}">Eliminar del Carrito</button>
        `;
        productosCarrito.appendChild(productoCarrito);

        totalPrecio += producto.precio;
        totalPrecioEl.textContent = totalPrecio;

        actualizarMensajeCarrito();

        const btnEliminar = productoCarrito.querySelector('.btn-eliminar');
        btnEliminar.addEventListener('click', () => {
            eliminarDelCarrito(producto.id, producto.precio);
            productosCarrito.removeChild(productoCarrito);
            actualizarMensajeCarrito();
        });
    }

    function eliminarDelCarrito(idProducto, precio) {
        totalPrecio -= precio;
        totalPrecioEl.textContent = totalPrecio;
        actualizarMensajeCarrito();
    }

    vaciarCarritoBtn.addEventListener('click', () => {
        productosCarrito.innerHTML = '';
        totalPrecio = 0;
        totalPrecioEl.textContent = totalPrecio;
        actualizarMensajeCarrito();
    });

    mostrarCarritoBtn.addEventListener('click', () => {
        if (productosCarritoContainer.classList.contains('mostrar')) {
            productosCarritoContainer.classList.remove('mostrar');
            mostrarCarritoBtn.style.right = '-10px';
            mostrarCarritoBtn.textContent = '🛒';
        } else {
            productosCarritoContainer.classList.add('mostrar');
            mostrarCarritoBtn.style.right = '313px';
            mostrarCarritoBtn.textContent = '❌';
        }
        mostrarCarritoBtn.classList.toggle('animacion-botones');
    });

    actualizarMensajeCarrito();

    irAPagarBtn.addEventListener('click', () => {
        const carritoItems = [];
        productosCarrito.querySelectorAll('.carrito-item').forEach(item => {
            const nombreProducto = item.querySelector('h4').innerText;
            const precioProducto = item.querySelector('p:last-of-type').innerText;
            carritoItems.push({ nombre: nombreProducto, precio: precioProducto });
        });
        sessionStorage.setItem('carritoItems', JSON.stringify(carritoItems));
        sessionStorage.setItem('totalPrecio', totalPrecio);
        window.location.href = 'validarform.html'; // Redirigir a la página de validación
    });

    function actualizarMensajeCarrito() {
        if (productosCarrito.children.length === 0) {
            mensajeCarritoVacio.style.display = 'block';
        } else {
            mensajeCarritoVacio.style.display = 'none';
        }
    }
});
