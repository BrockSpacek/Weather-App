function saveToLocalStorage(city){

    let cityArr = getFromLocalStorage();

    if(!cityArr.includes(city)){
        cityArr.push(city);
    }

    localStorage.setItem('City', JSON.stringify(cityArr));

}

function getFromLocalStorage(){
    let localStorageData = localStorage.getItem('Names');

    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(city){

    let localStorageData = getFromLocalStorage();

    let cityIndex = localStorageData.indexOf(city);

    localStorageData.splice(cityIndex, 1);

    localStorage.setItem('City', JSON.stringify(localStorageData));
}



export{ saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage }