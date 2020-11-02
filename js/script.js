// Array de Stock
const stock = [];
const stockSelect = document.getElementById('stockUnits');
const sumarStock = document.getElementById('sumarUnidades');
const newStock = document.getElementById('addtoStock');
const stockList = document.getElementById('stockList');

// Elementos del menu option
const optionList = document.getElementById('productList'); // Elemento OPTION que contiene el desplegable con las opciones
const units = document.getElementById("unidades"); // Campo number donde se indican las unidades que se van a añadir al carrito
const operation = document.getElementById("addToCart");  // Boton que lanza la función para añadir producto al carrito

// Elementos de la tabla
const eraseButton = document.getElementsByClassName('icon');; // Todos los elemento de la classe icon
const carritoFila = document.getElementById('cart'); // Tabla que hace de carrito de la compra
const addToStock = document.getElementById('addtoStock');

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
    
    
    const stSelect = document.createElement('option'); // Elemento a crear de tipo option
    stSelect.innerHTML = name; // Texto de entre los tags <option>
    stSelect.setAttribute("value", name) // Asignamos como atrinuto el precio
    stSelect.setAttribute("name", name);
    stockSelect.appendChild(stSelect);
    return;
}

// Esta función pinta una opción en el elemento option creando una opción select
// name = nombre del producto que se va a mostrar
const addProductCart = () => {
    
    // Creamos el primer <tr>, fila, para el nuevo producto
    const cartRow = document.createElement('tr'); 
    // cartRow.classList.add("itemRow");
    cartRow.classList.add('row');
    

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
    unitPrice.innerHTML = optionList.value + " €";
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

    // cartRow.classList.add('productos_carrito');
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
    let redondeo = Math.round(sumTotal * 100) / 100;
    ticket.innerHTML = redondeo;
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
                let s = {
                    product: product.name,
                    quantity: product.quantity,
                    id: product._id,
                    category: product.category
                }

                stock.push(s);


                
                
            });

            listStock();
        })
        .catch(error => console.log('Crash : ' + error.message)) // Capturamos el error si no se puede leer JS
}

// Funcion demandProduct()
const stockDemandProduct = (productName, units = Math.floor(Math.random() * 9) + 1) => {

    console.log(`demandProduct`);

    let st = {
        product: productName,
        quantity: units
    };
    console.log(st);
    // return st;
    loadStock(st);

}


// Pinta per pantalla stock
const listStock = () => {


    while(stockList.firstChild){
        stockList.firstChild.remove();
    }       

    const stockRow = document.createElement('tr'); 

        // Obra una cel·la
        const stockIdColumn = document.createElement('th');
        stockIdColumn.innerHTML = "ID";
        stockRow.appendChild(stockIdColumn);

        // Obra una cel·la
        const stockNameColumns = document.createElement('tH');
        stockNameColumns.innerHTML = "PRODUCT";
        stockRow.appendChild(stockNameColumns);

        // Obra una cel·la
        const stockCategoryColumn = document.createElement('th');
        stockCategoryColumn.innerHTML = "CATEGORY";
        stockRow.appendChild(stockCategoryColumn);

        // Obra una cel·la
        const stockUnitsColumns = document.createElement('th');
        stockUnitsColumns.innerHTML = "UNITS";
        stockRow.appendChild(stockUnitsColumns);

        stockList.appendChild(stockRow);


    for(s in stock){

        // Obro fila de la taula
        const stockRow = document.createElement('tr'); 

        // Obra una cel·la
        const stockIdColumn = document.createElement('td');
        stockIdColumn.innerHTML = stock[s].id;
        stockRow.appendChild(stockIdColumn);

        // Obra una cel·la
        const stockNameColumns = document.createElement('td');
        stockNameColumns.innerHTML = stock[s].product;
        stockRow.appendChild(stockNameColumns);

        // Obra una cel·la
        const stockCategoryColumn = document.createElement('td');
        stockCategoryColumn.innerHTML = stock[s].category;
        stockRow.appendChild(stockCategoryColumn);

        // Obra una cel·la
        const stockUnitsColumns = document.createElement('td');
        stockUnitsColumns.innerHTML = stock[s].quantity;
        stockRow.appendChild(stockUnitsColumns);

        stockList.appendChild(stockRow);

    }

    
    

}

// Función que loadStock()
const loadStock = (product) => {
    for(s in stock){
        if(stock[s].product == product.product){
            stock[s].quantity = Number(product.quantity);
        }
    }

    listStock();
}

// Función que elimina producto del carrito de la compra
const eraseProduct = (event) => {
    // al borrar el producto le mandamos el precio total a la funcion que mantiene el total
    // previousSibling recupera el td previo, en este caso el precio unitario*unidades
    dispplaySum(event.target.previousSibling.innerHTML, 'sustrac'); 
    event.target.parentNode.remove(); // parenNode recupera el nodo padre del elemento
}

operation.addEventListener('click', addProductCart); // Escuchamos el boton calcula prar mostrar el precio total
console.log(stock);
//newStock.addEventListener('click', stockDemandProduct(stockSelect.value, sumarUnidades.value));

// El eventListener no funciona si lo invoco como en la linia anterior, ni idea de poqruqe preguntar a Raul
addToStock.addEventListener("click", function(){
    stockDemandProduct(stockSelect.value, sumarUnidades.value);
});

//addProductToInventori.addEventListener('click', demandProduct());

// window.onload = listStock;

loadProducts(); // Pintamos el selcector en el html con los valores del JSON

document.getElementById("addToCart").addEventListener('click', ()=>{
    let itemsRowElements = document.getElementsByClassName('itemRow');
    for(let i=0; i<itemsRowElements.length; i++){
        if(i%2!=0){
            itemsRowElements[i].classList.add("itemRowWhite");
        }
    }
});

let validationLength = (nameID, nameID2)=>{
    document.getElementById(nameID).addEventListener('keydown', (e) => {
        if(document.getElementById(nameID).value.length > 1){
            document.getElementById(nameID2).style.backgroundColor = "white";

            alert("Introduce un número de máximo 2 digitos");
            document.getElementById(nameID).style.backgroundColor = "indianred";
            document.getElementById(nameID).value = 1;
        }
    });
}