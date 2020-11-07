// botones
const botton1 = document.getElementById('b1');
const botton2 = document.getElementById('b2');
const botton3 = document.getElementById('b3');

// tabs
const tabs = document.querySelectorAll('.tabconten');

// Mostramos y ocultamos los divs que tiene el contenido
const show = (event) => {

    let id = event.target.id.slice(1);

    document.getElementById("productTab").style.display = "none";
    document.getElementById("carritoTab").style.display = "none";
    document.getElementById("stockTab").style.display = "none";

    if(event.target.id === "b1"){
        document.getElementById("productTab").style.display = "block";
    }
    else if(event.target.id === "b2") {
        document.getElementById("carritoTab").style.display = "block";
    }
    else if(event.target.id === "b3") {
        document.getElementById("stockTab").style.display = "block";
    }

}

// addEventListeners
botton1.addEventListener('click', show);
botton2.addEventListener('click', show);
botton3.addEventListener('click', show);