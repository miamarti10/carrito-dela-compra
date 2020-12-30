// Cargo los productos del JSON en el array productList;
const productList = [];

// Array con los productos que hay en el carrito
const carritoList = [];

// Array con los productos comprados;
const rankingList = [];

// Array con el stock de cada producto
const stockList = [];

// Variable con el valor total del carrito
let sumadorTotal = 0;

const productosGrid = document.getElementById('flex-box');

const loadProducts = () => {

    document.getElementById("seleccionarProductos").style.display = "none";
    document.getElementById("divCarro").style.display = "none";
    document.getElementById("nuevoProducto").style.display = "none";
    document.getElementById("stocks").style.display = "none";

    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                productList.push(product);

                let s = {
                    id: product._id,
                    stock: product.quantity
                }

                stockList.push(s);

            });
        })
        // .then(generarListaProductos)
        .catch(error => console.log(`Ha ocurrido un error: ${error.message}`));
}

const getProductPosistion = (id) => {
    let p;

    for(pr in productList){
        if(id === productList[pr]._id){
            p = pr;
            break;
        }
    }

    return p;
}

const getProductFromID = (guid) => {
    for(obj in productList){
        if(guid === productList[obj]._id) {
            return productList[obj];
        }
    }
}

const carritoNew = (event) => {
    pr = {
        id: event.target.value,
        unidades: 1
    }

    tP.innerHTML = `Productos en el carrito: ${carritoList.length + 1}`;
    

    event.target.disabled = true; // ahora falta que despues de comprarlos se vuelvan a activar

    carritoList.push(pr);
}

const sumatorioTotal = () => {

    for(price in carritoList){
         let productoId = getProductFromID(carritoList[price].id);
         sumadorTotal += Number(productoId.price) * Number(carritoList[price].unidades);
    }

    console.log(sumadorTotal);
}

const borrarProductoCarrito = (event) => {

    let index = posicion(carritoList, event.target.alt);

    sumadorTotal = 0;

    if(index > -1) {
        carritoList.splice(index, 1);
    }

    let productosTiendaBoton = document.getElementsByTagName('button');

    for(bt in productosTiendaBoton) {
        if(productosTiendaBoton[bt].value === event.target.alt) {
            productosTiendaBoton[bt].disabled = false;
        }
    }

    verCarro();

}

const verTienda = (event) => {
    
    isActive();
    let boton = event.target;
    console.log(boton);
    boton.classList.add('active');

    while(productosGrid.firstChild) {
        productosGrid.firstChild.remove();
    }

    console.log("ok");

    document.getElementById("seleccionarProductos").style.display = "block";
    document.getElementById("divCarro").style.display = "none";
    document.getElementById("nuevoProducto").style.display = "none";
    document.getElementById("stocks").style.display = "none";



    for(p in productList) {
        const d = document.createElement('div');
        d.classList.add("element");

        const i = document.createElement('img');
        i.setAttribute("src", productList[p].picture);
        d.appendChild(i);

        const desc = document.createElement('p');
        desc.innerHTML = productList[p].name;
        d.appendChild(desc);

        const precioProducto = document.createElement('p');
        precioProducto.innerHTML = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", minimumIntegerDigits: 2}).format(productList[p].price); 
        d.appendChild(precioProducto);

        const b = document.createElement('button');
        b.innerHTML = 'Añadir al carrito';
        b.setAttribute("value", productList[p]._id);
        b.addEventListener('click', carritoNew);
        d.appendChild(b);

        document.getElementById('flex-box').appendChild(d);
    }


}

const actualizaCarrito = (event) => {
    let indice = posicion(carritoList, event.target.name);

    carritoList[indice].unidades = event.target.value;

    verCarro();

}

const verCarro = (event) => {

    isActive();
    let boton = event.target;
    console.log(boton);
    boton.classList.add('active');

    document.getElementById("divCarro").style.display = 'block';
    document.getElementById("ranking").style.display = "none";
    document.getElementById("seleccionarProductos").style.display = "none";
    document.getElementById("nuevoProducto").style.display = "none";
    document.getElementById("stocks").style.display = "none";

    while(tabla_carrito.firstChild) {
        tabla_carrito.firstChild.remove();
    }
    
    let sumadorTotal = 0;

    const cabecera_fila = document.createElement('tr');

    const cabecer_producto = document.createElement('th');
    cabecer_producto.innerHTML = 'Producto';
    cabecera_fila.appendChild(cabecer_producto);

    const cabecera_unidades = document.createElement('th');
    cabecera_unidades.innerHTML = 'Unidades';
    cabecera_fila.appendChild(cabecera_unidades);

    const cabecera_precio = document.createElement('th');
    cabecera_precio.innerHTML = 'Precio';
    cabecera_fila.appendChild(cabecera_precio);

    const cabecera_precioTotal = document.createElement('th');
    cabecera_precioTotal.innerHTML = 'Precio total';
    cabecera_fila.appendChild(cabecera_precioTotal);

    const cabecera_eliminar = document.createElement('th');
    cabecera_eliminar.innerHTML = 'Producto';
    cabecera_fila.appendChild(cabecera_eliminar);

    document.getElementById("tablaCarrito").appendChild(cabecera_fila);
        
    for(producto in carritoList) {
        let guid = carritoList[producto].id;

        let productoCarrito = getProductFromID(guid);

        const filaCarrito = document.createElement('tr');

        const columnaNombre = document.createElement('td');
        columnaNombre.innerHTML = productoCarrito.name;
        filaCarrito.appendChild(columnaNombre);

        const columnaUnidades = document.createElement('td');
        const optUnidades = document.createElement('input');
        optUnidades.setAttribute("type", "number");
        optUnidades.setAttribute("value", carritoList[producto].unidades);
        optUnidades.addEventListener('change', actualizaCarrito);
        optUnidades.setAttribute("name", carritoList[producto].id);
        optUnidades.setAttribute("min", 1);
        columnaUnidades.appendChild(optUnidades);
        filaCarrito.appendChild(columnaUnidades);

        const columnaPrecio = document.createElement('td');
        columnaPrecio.innerHTML = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", minimumIntegerDigits: 2}).format(productoCarrito.price);
        filaCarrito.appendChild(columnaPrecio);

        const columnaPrecoTotal = document.createElement('td');
        columnaPrecoTotal.innerHTML = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", minimumIntegerDigits: 2}).format(carritoList[producto].unidades * productoCarrito.price);
        filaCarrito.appendChild(columnaPrecoTotal);

        const columnaELiminar = document.createElement('td');
        
        const botonEliminar = document.createElement('img');
        botonEliminar.setAttribute("src", "data/icons/detele1.svg");
        botonEliminar.classList.add("icono");
        botonEliminar.setAttribute("alt", carritoList[producto].id);
        botonEliminar.addEventListener("click", borrarProductoCarrito);
        
        columnaELiminar.appendChild(botonEliminar);
        filaCarrito.appendChild(columnaELiminar);



        document.getElementById("tablaCarrito").appendChild(filaCarrito);
    }

    sumatorioTotal();
        
}

const listaProductos = () => {
    document.getElementById("divCarro").style.display = "none";
    document.getElementById("ranking").style.display = "none";
    document.getElementById("seleccionarProductos").style.display = 'block';
    document.getElementById("nuevoProducto").style.display = "none";
    document.getElementById("stocks").style.display = "none";
}

const existe = (lista, id) => {
    for(x in lista) {
        if(lista[x].id === id){
            return true;
        }
        
    }
    return false;
}

const posicion = (lista, id) => {
    for(x in lista) {
        if(lista[x].id === id) {
            return x;
        }
    }
}

const comprar = () => {
    for(p in carritoList) {
        let product = getProductFromID(carritoList[p].id);

        let pos = getProductPosistion(carritoList[p].id);
        productList[pos].quantity -= carritoList[p].unidades;

        if(existe(rankingList, carritoList[p].id)) {
            let pos = posicion(rankingList, carritoList[p].id)
            rankingList[pos].unidades += Number(carritoList[p].unidades);
        }
        else {
            let product_r = {
                id: carritoList[p].id,
                unidades: Number(carritoList[p].unidades)
            }
            rankingList.push(product_r);
        }


        let n_stock = posicion(stockList, carritoList[p].id);

        if(stockList[n_stock].stock >= Number(carritoList[p].unidades)) {
            stockList[n_stock].stock -= Number(carritoList[p].unidades);
        }
        
    }

    carritoList.length = 0;

    let productosBotonCarrito = document.getElementsByTagName('button');

    for(boton in productosBotonCarrito) {
        productosBotonCarrito[boton].disabled = false;
    }

    verCarro();
}

const ranking = (event) => {

    isActive();
    let boton = event.target;
    console.log(boton);
    boton.classList.add('active');

    document.getElementById("divCarro").style.display = "none";
    document.getElementById("seleccionarProductos").style.display = "none";
    document.getElementById("ranking").style.display = "block";
    document.getElementById("nuevoProducto").style.display = "none";
    document.getElementById("stocks").style.display = "none";

    while(document.getElementById("tablaRanking").firstChild) {
        document.getElementById("tablaRanking").firstChild.remove();
    }

    const cabecera_ranking = document.createElement('tr');

    const cabecera_producto = document.createElement('th');
    cabecera_producto.innerHTML = "Producto";
    cabecera_ranking.appendChild(cabecera_producto);

    const cabecera_unidades = document.createElement('th');
    cabecera_unidades.innerHTML = "Unidades";
    cabecera_ranking.appendChild(cabecera_unidades);

    document.getElementById("tablaRanking").appendChild(cabecera_ranking);

    const rankingListOrdenado = rankingList.sort((a, b) => b.unidades - a.unidades);

    for(ra in rankingListOrdenado) {

        const p = getProductFromID(rankingListOrdenado[ra].id);

        let r_product = document.createElement('tr');

        let r_product_name = document.createElement('td');
        r_product_name.innerHTML = p.name;
        r_product.appendChild(r_product_name);

        let r_product_units = document.createElement('td');
        r_product_units.innerHTML = rankingListOrdenado[ra].unidades;
        r_product.appendChild(r_product_units);

        document.getElementById("tablaRanking").appendChild(r_product);
    }

}

const verNuevoProducto = (event) => {

    isActive();
    let boton = event.target;
    console.log(boton);
    boton.classList.add('active');

    document.getElementById("divCarro").style.display = "none";
    document.getElementById("seleccionarProductos").style.display = "none";
    document.getElementById("ranking").style.display = "none";
    document.getElementById("nuevoProducto").style.display = "block";
    document.getElementById("stocks").style.display = "none";
}

const nuevoProductID = () => {
    let id = (Math.floor(Math.random() * 999999999999999) + 1).toString();

    if(existe(productList, id)){
        id = (Math.floor(Math.random() * 99999999999999) + 1).toString();
    }

    return id;
}

const crearProducto = (event) => {

    isActive();
    let boton = event.target;
    console.log(boton);
    boton.classList.add('active');

    const nombre = document.getElementById("nuevoProductoNombre");
    const precio = document.getElementById("nuevoProductoPrecio");
    const unidades = document.getElementById("nuevoProductoPrecio");

   // let nuevo_producto_id = (Math.floor(Math.random() * 99999999) + 1).toString();
   nuevo_producto_id = nuevoProductID();

    const nuevoP = {
        _id: nuevo_producto_id,
        name: nombre.value,
        price: precio.value,
        quantity: unidades.value,
        picture: "http://placehold.it/32x32"
    }

    productList.push(nuevoP);

    const st = {
        id: nuevo_producto_id,
        stock: unidades.value
    }

    stockList.push(st);

    const div_nuevo = document.createElement('div');
    div_nuevo.classList.add("element");

    const img_producto = document.createElement('img');
    img_producto.setAttribute("src", nuevoP.picture);
    div_nuevo.appendChild(img_producto);

    const descripcion_producto = document.createElement('p');
    descripcion_producto.innerHTML = nuevoP.name;
    div_nuevo.appendChild(descripcion_producto);

    const precio_producto = document.createElement('p');
    precio_producto.innerHTML = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", minimumIntegerDigits: 2}).format(nuevoP.price);
    div_nuevo.appendChild(precio_producto);
    
    const boton_producto = document.createElement('button');
    boton_producto.innerHTML = 'Añadir al carrito';
    boton_producto.setAttribute("value", nuevoP.nuevo_producto_id);
    boton_producto.addEventListener('click', carritoNew);
    div_nuevo.appendChild(boton_producto);

    document.getElementById('flex-box').appendChild(div_nuevo);    

    nombre.value = "";
    precio.value = "";
    unidades.value = "";
}

const stock = (event) => {

    isActive();
    let boton = event.target;
    console.log(boton);
    boton.classList.add('active');

    document.getElementById("divCarro").style.display = "none";
    document.getElementById("seleccionarProductos").style.display = "none";
    document.getElementById("ranking").style.display = "none";
    document.getElementById("nuevoProducto").style.display = "none";
    document.getElementById("stocks").style.display = "block";


    while(tablaStocks.firstChild) {
        tablaStocks.firstChild.remove();
    }

    const cabecera_stocks = document.createElement('tr');

    const cabecera_columna_producto = document.createElement('th');
    cabecera_columna_producto.innerHTML = 'Producto';
    cabecera_stocks.appendChild(cabecera_columna_producto);

    const cabecera_columna_unidades = document.createElement('th');
    cabecera_columna_unidades.innerHTML = 'Unidades';
    cabecera_stocks.appendChild(cabecera_columna_unidades);

    tablaStocks.appendChild(cabecera_stocks);

    let stock_ordenado = stockList.sort((a, b) => b.stock - a.stock);

    for(st in stock_ordenado) {
        let st_producto = getProductFromID(stock_ordenado[st].id);

        const fila_stock = document.createElement('tr');

        const col_stock_nombre = document.createElement('td');
        col_stock_nombre.innerHTML = st_producto.name;
        fila_stock.appendChild(col_stock_nombre);

        const col_stock_unidades = document.createElement('td');
        col_stock_unidades.innerHTML = stock_ordenado[st].stock;
        fila_stock.appendChild(col_stock_unidades);

        tablaStocks.appendChild(fila_stock);
    }
}

const tabla_carrito = document.getElementById("tablaCarrito");
const tablaStocks = document.getElementById("tablaStocks");

const verCarrito = document.getElementById("verCarrito");
verCarrito.addEventListener('click', verCarro);

const verProductos = document.getElementById("verProductos");
verProductos.addEventListener('click', verTienda);

const botonComprar = document.getElementById("botonComprar");
botonComprar.addEventListener("click", comprar);

const verRanking = document.getElementById("verRanking");
verRanking.addEventListener("click", ranking);

const altaProductos = document.getElementById("nuevosProductos");
altaProductos.addEventListener("click", verNuevoProducto);

const nuevoProducto = document.getElementById("altaProducto");
nuevoProducto.addEventListener("click", crearProducto);

const verStocks = document.getElementById("verStocks");
verStocks.addEventListener("click", stock);

let tP = document.getElementById("total_productos");


//Color botonera activa//

function isActive() {
    document
  .querySelectorAll('#botonera')
  .forEach(function(el) {
    document.querySelectorAll('li').forEach(function(li){
        console.log(li);
        li.classList.remove('active');
        document.querySelectorAll('button').forEach(function(button){
            button.classList.remove('active');
        })
    })
  })
}

window.onload = loadProducts;

