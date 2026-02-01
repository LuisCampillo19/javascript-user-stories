/**
 * FILE: data_management.js
 * Purpose: Product management using Objects, Sets, and Maps.
 */

//TASK 1: Creation and Validation of Objects
const product ={
    idProduct: 1,
    nameProduct: "Guantes",
    priceProduct: 85000
};

console.log("Producto creado");
console.log(product);

function validateProduct (obj){
    const idHave = typeof obj.idProduct === 'number';
    const nameHave = typeof obj.nameProduct === 'string' && obj.nameProduct.trim() !== "";
    const priceHave = typeof obj.priceProduct === 'number' && obj.priceProduct > 0;

    if(idHave && nameHave && priceHave){
        return true;
    } else{
        return false;
    }
}

console.log(" Validación del producto");
if(validateProduct(product)){
    console.log(`El producto ${product.nameProduct} es válido`);
} else {
    console.error("El producto contiene datos incompletos o incorrectos");
}


//TASK 2: Use of Set (Uniqueness)

const numbersList = [10, 20, 30, 30, 40, 10, 50];
const uniqueNumbers = new Set(numbersList);

console.log("Set inicial: ", uniqueNumbers);

uniqueNumbers.add(60);
console.log("SEt tras agregar 60: ", uniqueNumbers);

const existTwenty = uniqueNumbers.has(20);
console.log("¿Existe el número 20: ", existTwenty);

uniqueNumbers.delete(10);
console.log("Set tras eliminar el 10: ", uniqueNumbers);


//TASK 3: Creating a Map (Association)
const mapCategory = new Map();

mapCategory.set("Perifericos", product.nameProduct);
mapCategory.set("Monitor", "Samsung");
mapCategory.set("Almacenamiento", "SSD Kingston");

console.log("Map creado: ", mapCategory);


//TASK 4: Iteration over structures
for (let key in product){
    console.log(`${key}: ${product[key]}`);
}

console.log("Métodos de objeto extra ");
console.log("Claves: ",Object.keys(product));
console.log("Valores: ", Object.values(product));
console.log("Entradas: ", Object.entries(product));


for(let number of uniqueNumbers){
    console.log(`Valor en Set: ${number}`);
}

mapCategory.forEach((value, key)=>{
    console.log(`Categoria: ${key} | Producto: ${value}`)
})