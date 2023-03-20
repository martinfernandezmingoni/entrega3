const ProductManager = require('./class/ProductManager.js');

const productManager = new ProductManager('./class/products.json')

productManager.getProducts()
productManager.getProductsById(1)
// Para borrar un producto podemos usar 
// productManager.deleteProduct(3)
