const ProductManager = require('./class/ProductManager.js');

const productManager = new ProductManager('./class/products.json')

productManager.getProducts()
productManager.getProductsById(1)
productManager.deleteProduct(3)
productManager.updateProduct(1,{title:"Everdell"})
productManager.addProduct(
    {title:"papa", description:"hola", price:2500, thumbnail:"a", code:"a", stock:1
})