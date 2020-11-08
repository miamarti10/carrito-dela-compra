// Cargo los productos del JSON en el array productList;
const productList = [];

// Array con los productos que hay en el carrito
const carritoList = [];

// Array con los productos comprados;
const rankingList = [];


const loadProducts = () => {

    document.getElementById("seleccionarProductos").style.display = "none";
    document.getElementById("divCarro").style.display = "none";
    document.getElementById("nuevoProducto").style.display = "none";

    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                productList.push(product);
            });
        })
        .then(generarListaProductos)
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

const generarListaProductos = () => {

    for(p in productList){
        const select = document.createElement('option');
        select.innerHTML = productList[p].name;
        select.setAttribute("value", productList[p]._id);
        document.getElementById("selectProductos").appendChild(select);
    }
}

const verCarro = () => {

    document.getElementById("divCarro").style.display = 'block';
    document.getElementById("ranking").style.display = "none";
    document.getElementById("seleccionarProductos").style.display = "none";
    document.getElementById("nuevoProducto").style.display = "none";

    while(tabla_carrito.firstChild) {
        tabla_carrito.firstChild.remove();
    }
    

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
        columnaUnidades.innerHTML = carritoList[producto].unidades;
        filaCarrito.appendChild(columnaUnidades);

        const columnaPrecio = document.createElement('td');
        columnaPrecio.innerHTML = productoCarrito.price;
        filaCarrito.appendChild(columnaPrecio);

        const columnaPrecoTotal = document.createElement('td');
        columnaPrecoTotal.innerHTML = carritoList[producto].unidades * productoCarrito.price;
        filaCarrito.appendChild(columnaPrecoTotal);

        const botonEliminar = document.createElement('img');
        botonEliminar.setAttribute("src", "data/icons/detele1.svg");
        botonEliminar.classList.add("icono");
        filaCarrito.appendChild(botonEliminar);

        document.getElementById("tablaCarrito").appendChild(filaCarrito);
    }
        
}

const listaProductos = () => {
    document.getElementById("divCarro").style.display = "none";
    document.getElementById("ranking").style.display = "none";
    document.getElementById("seleccionarProductos").style.display = 'block';
    document.getElementById("nuevoProducto").style.display = "none";
}

const carrito = () => {
    let pr_guid = document.getElementById("selectProductos");
    let pC = {
        id: pr_guid.value,
        unidades: document.getElementById("unidades").value
    }
    carritoList.push(pC);
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
        
    }

    carritoList.length = 0;

   // const rankingOrdenado = carritoList.sort((a, b) => b.unidades - a.unidades);

    verCarro();
}

const ranking = () => {
    document.getElementById("divCarro").style.display = "none";
    document.getElementById("seleccionarProductos").style.display = "none";
    document.getElementById("ranking").style.display = "block";
    document.getElementById("nuevoProducto").style.display = "none";

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

const verNuevoProducto = () => {
    document.getElementById("divCarro").style.display = "none";
    document.getElementById("seleccionarProductos").style.display = "none";
    document.getElementById("ranking").style.display = "none";
    document.getElementById("nuevoProducto").style.display = "block";
}

const nuevoProductID = () => {
    let id = (Math.floor(Math.random() * 999999999999999) + 1).toString();

    if(existe(productList, id)){
        id = (Math.floor(Math.random() * 99999999999999) + 1).toString();
    }

    return id;
}

const crearProducto = () => {

    const nombre = document.getElementById("nuevoProductoNombre");
    const precio = document.getElementById("nuevoProductoPrecio");
    const unidades = document.getElementById("nuevoProductoPrecio");

   // let nuevo_producto_id = (Math.floor(Math.random() * 99999999) + 1).toString();
   nuevo_producto_id = nuevoProductID();

    const nuevoP = {
        _id: nuevo_producto_id,
        name: nombre.value,
        price: precio.value,
        quantity: unidades.value
    }

    productList.push(nuevoP);

    const select_producto = document.createElement('option');
    select_producto.innerHTML = nombre.value;
    select_producto.setAttribute("value", nuevo_producto_id);
    document.getElementById("selectProductos").appendChild(select_producto);

    nombre.value = "";
    precio.value = "";
    unidades.value = "";
}

const tabla_carrito = document.getElementById("tablaCarrito");

const sumarAlCarrito = document.getElementById("sumarAlCarrito");
sumarAlCarrito.addEventListener('click', carrito);

const verCarrito = document.getElementById("verCarrito");
verCarrito.addEventListener('click', verCarro);

const verProductos = document.getElementById("verProductos");
verProductos.addEventListener('click', listaProductos);

const botonComprar = document.getElementById("botonComprar");
botonComprar.addEventListener("click", comprar);

const verRanking = document.getElementById("verRanking");
verRanking.addEventListener("click", ranking);

const altaProductos = document.getElementById("nuevosProductos");
altaProductos.addEventListener("click", verNuevoProducto);

const nuevoProducto = document.getElementById("altaProducto");
nuevoProducto.addEventListener("click", crearProducto);

window.onload = loadProducts;