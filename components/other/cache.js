export class sessionStorageCache{
constructor(){

}



//insert data into sessionStorage
insertData(key, data){
    const stringifiedData = JSON.stringify(data)
    sessionStorage.setItem(key, stringifiedData)
}

//retrieve data from sessionStorage
getData(key){
    return JSON.parse(sessionStorage.getItem(key))
}

//delete data from sessionStorage
deleteData(key){
    sessionStorage.delete(key)
}


}