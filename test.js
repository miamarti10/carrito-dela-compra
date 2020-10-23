
const optionList = document.getElementById('productList'); // Elemento OPTION que contiene el desplegable con las opciones
const sumPrice = document.getElementById('preu'); // Sumatorio del precio unitario * unidades
const operation = document.getElementById("calcula");  // Boton que lanza la función doMaths
const units = document.getElementById("unidades"); // Campo number donde se indican las unidades que se van a añadir al carrito

// Esta función pinta una opción en el elemento option creando una opción select
// name = nombre del producto que se va a mostrar
const addSelectOption = (name, price) => {
    const select = document.createElement('option'); // Elemento a crear de tipo option
    select.innerHTML = name; // Texto de entre los tags <option>
    select.setAttribute("value", price) // Asignamos como atrinuto el precio
    select.setAttribute("name", name);
    optionList.appendChild(select);  // Añadimos el elemento al select
}


// Esta función lee el arxivo products.json y para cada elemento
// llamam a la función addSelectOption pasandole el nombre y precio de cada
// producto y esta añade una opción al SELECT
const loadProducts = () => {
    fetch('./data/products.json')
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


loadProducts(); // Pintamos el selcector en el html con los valores del JSON
operation.addEventListener('click', doMaths); // Escuchamos el boton calcula prar mostrar el precio total