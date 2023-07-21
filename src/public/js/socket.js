const socket = io();
console.log('Client Connected')

socket.on('productCreated', (data) => {
    const container = document.getElementById('products')
    const newProduct = `
    <ul id='${data.id}' class="product">
        <li>
            <b>Nombre:</b> ${data.title} 
        </li>
            <li>
            <b>Descripción:</b> ${data.description}
        </li>
            <li>
            <b>Codigo:</b> ${data.code}
        </li>
            <li>
            <b>Precio:</b> ${data.price}
        </li>
            <li>
            <b>Estatus:</b> ${data.status}
        </li>
            <li>
            <b>Stock:</b> ${data.stock}
        </li>
            <li>
            <b>Categoria:</b> ${data.category}
        </li>
    </ul>
    `;

    container.innerHTML += newProduct;
});

socket.on('productDeleted', (pid) => {
    const productToRemove = document.getElementById(`${pid}`);
    productToRemove.remove();
})
