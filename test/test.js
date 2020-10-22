
const list = document.getElementById('productList');
const preu = document.getElementById('preu');
const boton = document.getElementById("calcula");
const unidades = document.getElementById("unidades");

const productList = () => {
    //let list = document.getElementById('productList');
    let tag = document.createElement('p');
    tag.textContent = 'producte';
    list.appendChild(tag);
}




function loadProducts(){
    fetch('products.json')
        .then(response => response.json()) //Indicamos el formato en que se desea obtener la información
        .then(products => {
            products.forEach(product => {
                const s = document.createElement('option'); // Elemento a crear de tipo option
                s.innerHTML = product.name; // Texto de entre los tags <option>
                s.setAttribute("value", product.price) // Asignamos como atrinuto el precio
                list.appendChild(s);  // Añadimos el elemento al select
            });
        })
        .catch(error => console.log('Crash : ' + error.message)) // Capturamos el error si no se puede leer JS
}

const doMaths = () => {
    let price = list.value;
    console.log(price * unidades.value);
    preu.innerHTML = price * unidades.value;
}

loadProducts();
boton.addEventListener('click', doMaths);