"use strict";

// Cargo los productos del JSON en el array productList;
var productList = []; // Array con los productos que hay en el carrito

var carritoList = []; // Array con los productos comprados;

var rankingList = []; // Array con el stock de cada producto

var stockList = []; // Variable con el valor total del carrito

var sumadorTotal = 0;
var productosGrid = document.getElementById('flex-box');

var loadProducts = function loadProducts() {
  document.getElementById("seleccionarProductos").style.display = "none";
  document.getElementById("divCarro").style.display = "none";
  document.getElementById("nuevoProducto").style.display = "none";
  document.getElementById("stocks").style.display = "none";
  fetch('products.json').then(function (response) {
    return response.json();
  }).then(function (products) {
    products.forEach(function (product) {
      productList.push(product);
      var s = {
        id: product._id,
        stock: product.quantity
      };
      stockList.push(s);
    });
  }) // .then(generarListaProductos)
  ["catch"](function (error) {
    return console.log("Ha ocurrido un error: ".concat(error.message));
  });
};

var getProductPosistion = function getProductPosistion(id) {
  var p;

  for (pr in productList) {
    if (id === productList[pr]._id) {
      p = pr;
      break;
    }
  }

  return p;
};

var getProductFromID = function getProductFromID(guid) {
  for (obj in productList) {
    if (guid === productList[obj]._id) {
      return productList[obj];
    }
  }
};

var carritoNew = function carritoNew(event) {
  pr = {
    id: event.target.value,
    unidades: 1
  };
  tP.innerHTML = "Productos en el carrito: ".concat(carritoList.length + 1);
  event.target.disabled = true; // ahora falta que despues de comprarlos se vuelvan a activar

  carritoList.push(pr);
};

var sumatorioTotal = function sumatorioTotal() {
  for (price in carritoList) {
    var productoId = getProductFromID(carritoList[price].id);
    sumadorTotal += Number(productoId.price) * Number(carritoList[price].unidades);
  }

  console.log(sumadorTotal);
};

var borrarProductoCarrito = function borrarProductoCarrito(event) {
  var index = posicion(carritoList, event.target.alt);
  sumadorTotal = 0;

  if (index > -1) {
    carritoList.splice(index, 1);
  }

  var productosTiendaBoton = document.getElementsByTagName('button');

  for (bt in productosTiendaBoton) {
    if (productosTiendaBoton[bt].value === event.target.alt) {
      productosTiendaBoton[bt].disabled = false;
    }
  }

  verCarro();
};

var verTienda = function verTienda(event) {
  isActive();
  var boton = event.target;
  console.log(boton);
  boton.classList.add('active');

  while (productosGrid.firstChild) {
    productosGrid.firstChild.remove();
  }

  console.log("ok");
  document.getElementById("seleccionarProductos").style.display = "block";
  document.getElementById("divCarro").style.display = "none";
  document.getElementById("nuevoProducto").style.display = "none";
  document.getElementById("stocks").style.display = "none";

  for (p in productList) {
    var d = document.createElement('div');
    d.classList.add("element");
    var i = document.createElement('img');
    i.setAttribute("src", productList[p].picture);
    d.appendChild(i);
    var desc = document.createElement('p');
    desc.innerHTML = productList[p].name;
    d.appendChild(desc);
    var precioProducto = document.createElement('p');
    precioProducto.innerHTML = new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumIntegerDigits: 2
    }).format(productList[p].price);
    d.appendChild(precioProducto);
    var b = document.createElement('button');
    b.innerHTML = 'Añadir al carrito';
    b.setAttribute("value", productList[p]._id);
    b.addEventListener('click', carritoNew);
    d.appendChild(b);
    document.getElementById('flex-box').appendChild(d);
  }
};

var actualizaCarrito = function actualizaCarrito(event) {
  var indice = posicion(carritoList, event.target.name);
  carritoList[indice].unidades = event.target.value;
  verCarro();
};

var verCarro = function verCarro(event) {
  isActive();
  var boton = event.target;
  console.log(boton);
  boton.classList.add('active');
  document.getElementById("divCarro").style.display = 'block';
  document.getElementById("ranking").style.display = "none";
  document.getElementById("seleccionarProductos").style.display = "none";
  document.getElementById("nuevoProducto").style.display = "none";
  document.getElementById("stocks").style.display = "none";

  while (tabla_carrito.firstChild) {
    tabla_carrito.firstChild.remove();
  }

  var sumadorTotal = 0;
  var cabecera_fila = document.createElement('tr');
  var cabecer_producto = document.createElement('th');
  cabecer_producto.innerHTML = 'Producto';
  cabecera_fila.appendChild(cabecer_producto);
  var cabecera_unidades = document.createElement('th');
  cabecera_unidades.innerHTML = 'Unidades';
  cabecera_fila.appendChild(cabecera_unidades);
  var cabecera_precio = document.createElement('th');
  cabecera_precio.innerHTML = 'Precio';
  cabecera_fila.appendChild(cabecera_precio);
  var cabecera_precioTotal = document.createElement('th');
  cabecera_precioTotal.innerHTML = 'Precio total';
  cabecera_fila.appendChild(cabecera_precioTotal);
  var cabecera_eliminar = document.createElement('th');
  cabecera_eliminar.innerHTML = 'Producto';
  cabecera_fila.appendChild(cabecera_eliminar);
  document.getElementById("tablaCarrito").appendChild(cabecera_fila);

  for (producto in carritoList) {
    var guid = carritoList[producto].id;
    var productoCarrito = getProductFromID(guid);
    var filaCarrito = document.createElement('tr');
    var columnaNombre = document.createElement('td');
    columnaNombre.innerHTML = productoCarrito.name;
    filaCarrito.appendChild(columnaNombre);
    var columnaUnidades = document.createElement('td');
    var optUnidades = document.createElement('input');
    optUnidades.setAttribute("type", "number");
    optUnidades.setAttribute("value", carritoList[producto].unidades);
    optUnidades.addEventListener('change', actualizaCarrito);
    optUnidades.setAttribute("name", carritoList[producto].id);
    optUnidades.setAttribute("min", 1);
    columnaUnidades.appendChild(optUnidades);
    filaCarrito.appendChild(columnaUnidades);
    var columnaPrecio = document.createElement('td');
    columnaPrecio.innerHTML = new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumIntegerDigits: 2
    }).format(productoCarrito.price);
    filaCarrito.appendChild(columnaPrecio);
    var columnaPrecoTotal = document.createElement('td');
    columnaPrecoTotal.innerHTML = new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumIntegerDigits: 2
    }).format(carritoList[producto].unidades * productoCarrito.price);
    filaCarrito.appendChild(columnaPrecoTotal);
    var columnaELiminar = document.createElement('td');
    var botonEliminar = document.createElement('img');
    botonEliminar.setAttribute("src", "data/icons/detele1.svg");
    botonEliminar.classList.add("icono");
    botonEliminar.setAttribute("alt", carritoList[producto].id);
    botonEliminar.addEventListener("click", borrarProductoCarrito);
    columnaELiminar.appendChild(botonEliminar);
    filaCarrito.appendChild(columnaELiminar);
    document.getElementById("tablaCarrito").appendChild(filaCarrito);
  }

  sumatorioTotal();
};

var listaProductos = function listaProductos() {
  document.getElementById("divCarro").style.display = "none";
  document.getElementById("ranking").style.display = "none";
  document.getElementById("seleccionarProductos").style.display = 'block';
  document.getElementById("nuevoProducto").style.display = "none";
  document.getElementById("stocks").style.display = "none";
};

var existe = function existe(lista, id) {
  for (x in lista) {
    if (lista[x].id === id) {
      return true;
    }
  }

  return false;
};

var posicion = function posicion(lista, id) {
  for (x in lista) {
    if (lista[x].id === id) {
      return x;
    }
  }
};

var comprar = function comprar() {
  for (p in carritoList) {
    var product = getProductFromID(carritoList[p].id);
    var pos = getProductPosistion(carritoList[p].id);
    productList[pos].quantity -= carritoList[p].unidades;

    if (existe(rankingList, carritoList[p].id)) {
      var _pos = posicion(rankingList, carritoList[p].id);

      rankingList[_pos].unidades += Number(carritoList[p].unidades);
    } else {
      var product_r = {
        id: carritoList[p].id,
        unidades: Number(carritoList[p].unidades)
      };
      rankingList.push(product_r);
    }

    var n_stock = posicion(stockList, carritoList[p].id);

    if (stockList[n_stock].stock >= Number(carritoList[p].unidades)) {
      stockList[n_stock].stock -= Number(carritoList[p].unidades);
    }
  }

  carritoList.length = 0;
  var productosBotonCarrito = document.getElementsByTagName('button');

  for (boton in productosBotonCarrito) {
    productosBotonCarrito[boton].disabled = false;
  }

  verCarro();
};

var ranking = function ranking(event) {
  isActive();
  var boton = event.target;
  console.log(boton);
  boton.classList.add('active');
  document.getElementById("divCarro").style.display = "none";
  document.getElementById("seleccionarProductos").style.display = "none";
  document.getElementById("ranking").style.display = "block";
  document.getElementById("nuevoProducto").style.display = "none";
  document.getElementById("stocks").style.display = "none";

  while (document.getElementById("tablaRanking").firstChild) {
    document.getElementById("tablaRanking").firstChild.remove();
  }

  var cabecera_ranking = document.createElement('tr');
  var cabecera_producto = document.createElement('th');
  cabecera_producto.innerHTML = "Producto";
  cabecera_ranking.appendChild(cabecera_producto);
  var cabecera_unidades = document.createElement('th');
  cabecera_unidades.innerHTML = "Unidades";
  cabecera_ranking.appendChild(cabecera_unidades);
  document.getElementById("tablaRanking").appendChild(cabecera_ranking);
  var rankingListOrdenado = rankingList.sort(function (a, b) {
    return b.unidades - a.unidades;
  });

  for (ra in rankingListOrdenado) {
    var _p = getProductFromID(rankingListOrdenado[ra].id);

    var r_product = document.createElement('tr');
    var r_product_name = document.createElement('td');
    r_product_name.innerHTML = _p.name;
    r_product.appendChild(r_product_name);
    var r_product_units = document.createElement('td');
    r_product_units.innerHTML = rankingListOrdenado[ra].unidades;
    r_product.appendChild(r_product_units);
    document.getElementById("tablaRanking").appendChild(r_product);
  }
};

var verNuevoProducto = function verNuevoProducto(event) {
  isActive();
  var boton = event.target;
  console.log(boton);
  boton.classList.add('active');
  document.getElementById("divCarro").style.display = "none";
  document.getElementById("seleccionarProductos").style.display = "none";
  document.getElementById("ranking").style.display = "none";
  document.getElementById("nuevoProducto").style.display = "block";
  document.getElementById("stocks").style.display = "none";
};

var nuevoProductID = function nuevoProductID() {
  var id = (Math.floor(Math.random() * 999999999999999) + 1).toString();

  if (existe(productList, id)) {
    id = (Math.floor(Math.random() * 99999999999999) + 1).toString();
  }

  return id;
};

var crearProducto = function crearProducto(event) {
  isActive();
  var boton = event.target;
  console.log(boton);
  boton.classList.add('active');
  var nombre = document.getElementById("nuevoProductoNombre");
  var precio = document.getElementById("nuevoProductoPrecio");
  var unidades = document.getElementById("nuevoProductoPrecio"); // let nuevo_producto_id = (Math.floor(Math.random() * 99999999) + 1).toString();

  nuevo_producto_id = nuevoProductID();
  var nuevoP = {
    _id: nuevo_producto_id,
    name: nombre.value,
    price: precio.value,
    quantity: unidades.value,
    picture: "http://placehold.it/32x32"
  };
  productList.push(nuevoP);
  var st = {
    id: nuevo_producto_id,
    stock: unidades.value
  };
  stockList.push(st);
  var div_nuevo = document.createElement('div');
  div_nuevo.classList.add("element");
  var img_producto = document.createElement('img');
  img_producto.setAttribute("src", nuevoP.picture);
  div_nuevo.appendChild(img_producto);
  var descripcion_producto = document.createElement('p');
  descripcion_producto.innerHTML = nuevoP.name;
  div_nuevo.appendChild(descripcion_producto);
  var precio_producto = document.createElement('p');
  precio_producto.innerHTML = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumIntegerDigits: 2
  }).format(nuevoP.price);
  div_nuevo.appendChild(precio_producto);
  var boton_producto = document.createElement('button');
  boton_producto.innerHTML = 'Añadir al carrito';
  boton_producto.setAttribute("value", nuevoP.nuevo_producto_id);
  boton_producto.addEventListener('click', carritoNew);
  div_nuevo.appendChild(boton_producto);
  document.getElementById('flex-box').appendChild(div_nuevo);
  nombre.value = "";
  precio.value = "";
  unidades.value = "";
};

var stock = function stock(event) {
  isActive();
  var boton = event.target;
  console.log(boton);
  boton.classList.add('active');
  document.getElementById("divCarro").style.display = "none";
  document.getElementById("seleccionarProductos").style.display = "none";
  document.getElementById("ranking").style.display = "none";
  document.getElementById("nuevoProducto").style.display = "none";
  document.getElementById("stocks").style.display = "block";

  while (tablaStocks.firstChild) {
    tablaStocks.firstChild.remove();
  }

  var cabecera_stocks = document.createElement('tr');
  var cabecera_columna_producto = document.createElement('th');
  cabecera_columna_producto.innerHTML = 'Producto';
  cabecera_stocks.appendChild(cabecera_columna_producto);
  var cabecera_columna_unidades = document.createElement('th');
  cabecera_columna_unidades.innerHTML = 'Unidades';
  cabecera_stocks.appendChild(cabecera_columna_unidades);
  tablaStocks.appendChild(cabecera_stocks);
  var stock_ordenado = stockList.sort(function (a, b) {
    return b.stock - a.stock;
  });

  for (st in stock_ordenado) {
    var st_producto = getProductFromID(stock_ordenado[st].id);
    var fila_stock = document.createElement('tr');
    var col_stock_nombre = document.createElement('td');
    col_stock_nombre.innerHTML = st_producto.name;
    fila_stock.appendChild(col_stock_nombre);
    var col_stock_unidades = document.createElement('td');
    col_stock_unidades.innerHTML = stock_ordenado[st].stock;
    fila_stock.appendChild(col_stock_unidades);
    tablaStocks.appendChild(fila_stock);
  }
};

var tabla_carrito = document.getElementById("tablaCarrito");
var tablaStocks = document.getElementById("tablaStocks");
var verCarrito = document.getElementById("verCarrito");
verCarrito.addEventListener('click', verCarro);
var verProductos = document.getElementById("verProductos");
verProductos.addEventListener('click', verTienda);
var botonComprar = document.getElementById("botonComprar");
botonComprar.addEventListener("click", comprar);
var verRanking = document.getElementById("verRanking");
verRanking.addEventListener("click", ranking);
var altaProductos = document.getElementById("nuevosProductos");
altaProductos.addEventListener("click", verNuevoProducto);
var nuevoProducto = document.getElementById("altaProducto");
nuevoProducto.addEventListener("click", crearProducto);
var verStocks = document.getElementById("verStocks");
verStocks.addEventListener("click", stock);
var tP = document.getElementById("total_productos"); //Color botonera activa//

function isActive() {
  document.querySelectorAll('#botonera').forEach(function (el) {
    document.querySelectorAll('li').forEach(function (li) {
      console.log(li);
      li.classList.remove('active');
      document.querySelectorAll('button').forEach(function (button) {
        button.classList.remove('active');
      });
    });
  });
}

window.onload = loadProducts;