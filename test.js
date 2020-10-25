
// Elementos del menu option
const optionList = document.getElementById('productList'); // Elemento OPTION que contiene el desplegable con las opciones
const units = document.getElementById("unidades"); // Campo number donde se indican las unidades que se van a añadir al carrito
const operation = document.getElementById("addToCart");  // Boton que lanza la función para añadir producto al carrito

// Elementos de la tabla
const eraseButton = document.getElementsByClassName('icon');; // Todos los elemento de la classe icon
const carritoFila = document.getElementById('cart'); // Tabla que hace de carrito de la compra

// Elementos añadir al formulario
const addProductToInventori = document.getElementById('addToSelectMenu'); // Boton que añade productos al inventario
const newProductName = document.getElementById('newProductName'); // Campo que recoge el nombre del nuevo producto
const newProductPrice = document.getElementById('newProductPrice'); // Campo que recoge el precio del nuevo producto

// Suma total de todos los productos
let sumTotal = 0;
const ticket = document.getElementById('ticket'); // Elemento h1 donde mostraremos el total

// Esta función pinta una opción en el elemento option creando una opción select
// name = nombre del producto que se va a mostrar
const addSelectOption = (name, price) => {
    console.log("funcion añador opc al select");
    const select = document.createElement('option'); // Elemento a crear de tipo option
    select.innerHTML = name; // Texto de entre los tags <option>
    select.setAttribute("value", price) // Asignamos como atrinuto el precio
    select.setAttribute("name", name);
    optionList.appendChild(select);  // Añadimos el elemento al select
    return;
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

    // Sumamos el precio total al sumatorio total de todos los productos
   // sumTotal += (optionList.value * units.value);
    dispplaySum((optionList.value * units.value), 'add');
    
    //dispplaySum();

}

// Esta función recoge el precio y la operación a realizar (sumar o restar al total)
// y actualiza el html para mostrarlo por pantalla
const dispplaySum = (price, operation) => {
    (operation === 'add') ? sumTotal += price : sumTotal -= price;
    console.log(`Total a pagar: ${sumTotal}`);
    let redondeo = parseFloat(Math.round(sumTotal * 100) / 100).toFixed(2);
    ticket.innerHTML = "Total " + redondeo + " €";
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


// Función que elimina producto del carrito de la compra
const eraseProduct = (event) => {
    // al borrar el producto le mandamos el precio total a la funcion que mantiene el total
    // previousSibling recupera el td previo, en este caso el precio unitario*unidades
    dispplaySum(event.target.previousSibling.innerHTML, 'sustrac'); 
    event.target.parentNode.remove(); // parenNode recupera el nodo padre del elemento
}

operation.addEventListener('click', addProductCart); // Escuchamos el boton calcula prar mostrar el precio total

// El eventListener no funciona si lo invoco como en la linia anterior, ni idea de poqruqe preguntar a Raul
addProductToInventori.addEventListener("click", function(){
    addSelectOption(newProductName.value, newProductPrice.value);
 });


loadProducts(); // Pintamos el selcector en el html con los valores del JSON

