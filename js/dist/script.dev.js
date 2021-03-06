"use strict";

// Array de Stock
var stock = [];
var stockSelect = document.getElementById('stockUnits');
var sumarStock = document.getElementById('sumarUnidades');
var newStock = document.getElementById('addtoStock');
var stockList = document.getElementById('stockList'); // Elementos del menu option

var optionList = document.getElementById('productList'); // Elemento OPTION que contiene el desplegable con las opciones

var units = document.getElementById("unidades"); // Campo number donde se indican las unidades que se van a añadir al carrito

var operation = document.getElementById("addToCart"); // Boton que lanza la función para añadir producto al carrito
// Elementos de la tabla

var eraseButton = document.getElementsByClassName('icon');
; // Todos los elemento de la classe icon

var carritoFila = document.getElementById('cart'); // Tabla que hace de carrito de la compra

var addToStock = document.getElementById('addtoStock'); // Elementos añadir al formulario

var addProductToInventori = document.getElementById('addToSelectMenu'); // Boton que añade productos al inventario

var newProductName = document.getElementById('newProductName'); // Campo que recoge el nombre del nuevo producto

var newProductPrice = document.getElementById('newProductPrice'); // Campo que recoge el precio del nuevo producto
// Suma total de todos los productos

var sumTotal = 0;
var ticket = document.getElementById('ticket'); // Elemento h1 donde mostraremos el total
// Esta función pinta una opción en el elemento option creando una opción select
// name = nombre del producto que se va a mostrar

var addSelectOption = function addSelectOption(name, price) {
  console.log("funcion añador opc al select");
  var select = document.createElement('option'); // Elemento a crear de tipo option

  select.innerHTML = name; // Texto de entre los tags <option>

  select.setAttribute("value", price); // Asignamos como atrinuto el precio

  select.setAttribute("name", name);
  optionList.appendChild(select); // Añadimos el elemento al select

  var stSelect = document.createElement('option'); // Elemento a crear de tipo option

  stSelect.innerHTML = name; // Texto de entre los tags <option>

  stSelect.setAttribute("value", name); // Asignamos como atrinuto el precio

  stSelect.setAttribute("name", name);
  stockSelect.appendChild(stSelect);
  return;
}; // Esta función pinta una opción en el elemento option creando una opción select
// name = nombre del producto que se va a mostrar


var addProductCart = function addProductCart() {
  // Creamos el primer <tr>, fila, para el nuevo producto
  var cartRow = document.createElement('tr'); // cartRow.classList.add("itemRow");

  cartRow.classList.add('row'); // Creo un elemento columna (celda) <td> donde guardar las unidades del producto

  var productColumn = document.createElement('td');
  productColumn.innerHTML = optionList.options[optionList.selectedIndex].text; // a la nueva celda le pongo el numero de unidades seleccionadas

  cartRow.appendChild(productColumn); // añado la celda a la nueva fila
  // Unidades

  var unitsColumn = document.createElement('td');
  unitsColumn.innerHTML = units.value;
  cartRow.appendChild(unitsColumn); // Precio

  var unitPrice = document.createElement('td');
  unitPrice.innerHTML = optionList.value + " €";
  cartRow.appendChild(unitPrice); // Precio total del producto

  var totalPrice = document.createElement('td');
  totalPrice.innerHTML = optionList.value * units.value;
  cartRow.appendChild(totalPrice); // Boton de eliminar

  var removeButton = document.createElement('img');
  removeButton.setAttribute("src", "data/icons/detele1.svg");
  removeButton.classList.add("icon");
  removeButton.addEventListener('click', eraseProduct); // Al nuevo boton le añadimos un eventListener para que al click se active la funcion eraseProduct

  cartRow.appendChild(removeButton); // cartRow.classList.add('productos_carrito');

  carritoFila.appendChild(cartRow); // Añadimos la nueva fila a la tabla
  // Sumamos el precio total al sumatorio total de todos los productos
  // sumTotal += (optionList.value * units.value);

  dispplaySum(optionList.value * units.value, 'add'); //dispplaySum();
}; // Esta función recoge el precio y la operación a realizar (sumar o restar al total)
// y actualiza el html para mostrarlo por pantalla


var dispplaySum = function dispplaySum(price, operation) {
  operation === 'add' ? sumTotal += price : sumTotal -= price;
  console.log("Total a pagar: ".concat(sumTotal));
  var redondeo = Math.round(sumTotal * 100) / 100;
  ticket.innerHTML = redondeo;
}; // Esta función lee el arxivo products.json y para cada elemento
// llamam a la función addSelectOption pasandole el nombre y precio de cada
// producto y esta añade una opción al SELECT


var loadProducts = function loadProducts() {
  fetch('./data/products.json').then(function (response) {
    return response.json();
  }) //Indicamos el formato en que se desea obtener la información
  .then(function (products) {
    products.forEach(function (product) {
      // Por cada producto del JSON llamamao a la función que pinta las opcines del SELECT 
      // y le pasamos el nombre y el precio
      addSelectOption(product.name, product.price);
      var s = {
        product: product.name,
        quantity: product.quantity,
        id: product._id,
        category: product.category
      };
      stock.push(s);
    });
    listStock();
  })["catch"](function (error) {
    return console.log('Crash : ' + error.message);
  }); // Capturamos el error si no se puede leer JS
}; // Funcion demandProduct()


var stockDemandProduct = function stockDemandProduct(productName) {
  var units = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.floor(Math.random() * 9) + 1;
  console.log("demandProduct");
  var st = {
    product: productName,
    quantity: units
  };
  console.log(st); // return st;

  loadStock(st);
}; // Pinta per pantalla stock


var listStock = function listStock() {
  while (stockList.firstChild) {
    stockList.firstChild.remove();
  }

  var stockRow = document.createElement('tr'); // Obra una cel·la

  var stockIdColumn = document.createElement('th');
  stockIdColumn.innerHTML = "ID";
  stockRow.appendChild(stockIdColumn); // Obra una cel·la

  var stockNameColumns = document.createElement('tH');
  stockNameColumns.innerHTML = "PRODUCT";
  stockRow.appendChild(stockNameColumns); // Obra una cel·la

  var stockCategoryColumn = document.createElement('th');
  stockCategoryColumn.innerHTML = "CATEGORY";
  stockRow.appendChild(stockCategoryColumn); // Obra una cel·la

  var stockUnitsColumns = document.createElement('th');
  stockUnitsColumns.innerHTML = "UNITS";
  stockRow.appendChild(stockUnitsColumns);
  stockList.appendChild(stockRow);

  for (s in stock) {
    // Obro fila de la taula
    var _stockRow = document.createElement('tr'); // Obra una cel·la


    var _stockIdColumn = document.createElement('td');

    _stockIdColumn.innerHTML = stock[s].id;

    _stockRow.appendChild(_stockIdColumn); // Obra una cel·la


    var _stockNameColumns = document.createElement('td');

    _stockNameColumns.innerHTML = stock[s].product;

    _stockRow.appendChild(_stockNameColumns); // Obra una cel·la


    var _stockCategoryColumn = document.createElement('td');

    _stockCategoryColumn.innerHTML = stock[s].category;

    _stockRow.appendChild(_stockCategoryColumn); // Obra una cel·la


    var _stockUnitsColumns = document.createElement('td');

    _stockUnitsColumns.innerHTML = stock[s].quantity;

    _stockRow.appendChild(_stockUnitsColumns);

    stockList.appendChild(_stockRow);
  }
}; // Función que loadStock()


var loadStock = function loadStock(product) {
  for (s in stock) {
    if (stock[s].product == product.product) {
      stock[s].quantity = Number(product.quantity);
    }
  }

  listStock();
}; // Función que elimina producto del carrito de la compra


var eraseProduct = function eraseProduct(event) {
  // al borrar el producto le mandamos el precio total a la funcion que mantiene el total
  // previousSibling recupera el td previo, en este caso el precio unitario*unidades
  dispplaySum(event.target.previousSibling.innerHTML, 'sustrac');
  event.target.parentNode.remove(); // parenNode recupera el nodo padre del elemento
};

operation.addEventListener('click', addProductCart); // Escuchamos el boton calcula prar mostrar el precio total

console.log(stock); //newStock.addEventListener('click', stockDemandProduct(stockSelect.value, sumarUnidades.value));
// El eventListener no funciona si lo invoco como en la linia anterior, ni idea de poqruqe preguntar a Raul

addToStock.addEventListener("click", function () {
  stockDemandProduct(stockSelect.value, sumarUnidades.value);
}); //addProductToInventori.addEventListener('click', demandProduct());
// window.onload = listStock;

loadProducts(); // Pintamos el selcector en el html con los valores del JSON

document.getElementById("addToCart").addEventListener('click', function () {
  var itemsRowElements = document.getElementsByClassName('itemRow');

  for (var i = 0; i < itemsRowElements.length; i++) {
    if (i % 2 != 0) {
      itemsRowElements[i].classList.add("itemRowWhite");
    }
  }
});

var validationLength = function validationLength(nameID, nameID2) {
  document.getElementById(nameID).addEventListener('keydown', function (e) {
    if (document.getElementById(nameID).value.length > 1) {
      document.getElementById(nameID2).style.backgroundColor = "white";
      alert("Introduce un número de máximo 2 digitos");
      document.getElementById(nameID).style.backgroundColor = "indianred";
      document.getElementById(nameID).value = 1;
    }
  });
};