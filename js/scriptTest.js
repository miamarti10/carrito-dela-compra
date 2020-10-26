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