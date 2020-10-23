let itemsRowElements = document.getElementsByClassName('itemRow');
for(let i=0; i<itemsRowElements.length; i++){
    if(i%2!=0){
        itemsRowElements[i].classList.add("itemRowWhite");
    }
}