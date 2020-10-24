
const optionList = document.getElementById('productList'); // Elemento OPTION que contiene el desplegable con las opciones
const sumPrice = document.getElementById('preu'); // Sumatorio del precio unitario * unidades
const operation = document.getElementById("calcula");  // Boton que lanza la función doMaths
const units = document.getElementById("unidades"); // Campo number donde se indican las unidades que se van a añadir al carrito
const eraseButton = document.getElementsByClassName('icon');; // Todos los elemento de la classe icon
const carritoFila = document.getElementById('cart'); // Tabla que hace de carrito de la compra

// Esta función pinta una opción en el elemento option creando una opción select
// name = nombre del producto que se va a mostrar
const addSelectOption = (name, price) => {
    const select = document.createElement('option'); // Elemento a crear de tipo option
    select.innerHTML = name; // Texto de entre los tags <option>
    select.setAttribute("value", price) // Asignamos como atrinuto el precio
    select.setAttribute("name", name);
    optionList.appendChild(select);  // Añadimos el elemento al select
}

// Esta función pinta una opción en el elemento option creando una opción select
// name = nombre del producto que se va a mostrar
const addProductCart = () => {
    
    // Creamos el primer <tr>, fila, para el nuevo producto
    const cartRow = document.createElement('tr'); 
    cartRow.classList.add("itemRow");
    

    // Creo un elemento columna (celda) <td> donde guardar las unidades del producto
    const productColumn = document.createElement('td');
    productColumn.innerHTML = optionList.options[optionList.selectedIndex].text; // a la nueva celda le pongo el numero de unidades seleccionadas
    cartRow.appendChild(productColumn); // añado la celda a la nueva fila

    // Unidades
    const unitsColumn = document.createElement('td');
    unitsColumn.innerHTML = units.value;
    cartRow.appendChild(unitsColumn);

    // Precio
    const unitPrice = document.createElement('td');
    unitPrice.innerHTML = optionList.value;
    cartRow.appendChild(unitPrice);

    // Precio total del producto
    const totalPrice = document.createElement('td');
    totalPrice.innerHTML = optionList.value * units.value;
    cartRow.appendChild(totalPrice);

    // Boton de eliminar
    const removeButton = document.createElement('img');
    removeButton.setAttribute("src", "data/icons/detele1.svg");
    removeButton.classList.add("icon");
    removeButton.addEventListener('click', eraseProduct); // Al nuevo boton le añadimos un eventListener para que al click se active la funcion eraseProduct
    cartRow.appendChild(removeButton);


    carritoFila.appendChild(cartRow);  // Añadimos la nueva fila a la tabla

}


// Esta función lee el arxivo products.json y para cada elemento
// llamam a la función addSelectOption pasandole el nombre y precio de cada
// producto y esta añade una opción al SELECT
const loadProducts = () => {
    fetch('products.json')
        .then(response => response.json()) //Indicamos el formato en que se desea obtener la información
        .then(products => {
            products.forEach(product => {
                // Por cada producto del JSON llamamao a la función que pinta las opcines del SELECT 
                // y le pasamos el nombre y el precio
                addSelectOption(product.name, product.price); 
            });
        })
        .catch(error => console.log('Crash : ' + error.message)) // Capturamos el error si no se puede leer JS
}


// Coge el precio del producto y lo multiplica por las unidades seleccionadas
const doMaths = () => {
    let price = optionList.value; // Leemos el valor seleccionado en el desplegable
    let opt = optionList.options[optionList.selectedIndex]; // Leemos el valor texto (nombre del producto) seleccionado en el select

    console.log(`${units.value} unidades de ${opt.text} cuestan: ${price * units.value}`);
    sumPrice.innerHTML = price * units.value; // Pintamos el resultado en un <p>
}

// Función que elimina producto del carrito de la compra
const eraseProduct = (event) => {
    event.target.parentNode.remove(); // parenNode recupera el nodo padre del elemento
}


loadProducts(); // Pintamos el selcector en el html con los valores del JSON
operation.addEventListener('click', addProductCart); // Escuchamos el boton calcula prar mostrar el precio total
