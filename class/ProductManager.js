const fs = require('fs')

class ProductManager {
  

  constructor(path, id) {
    this.products = []
    this.path =  path
    this.id = id
  }

  getProducts(){
    const data = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(data)
  }
  
  addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;
    const newProduct ={
      id:this.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    }
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock
    ) {
      console.log("Error: Faltan datos");
      return;
    }
    if (this.products.some((p) => p.code === code)) {
      console.log("Error: El código del producto ya existe");
      return;
    }
    this.products.push(newProduct);
    this.id++;
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"))
  }


  getProductsById(id) {
    const products = this.getProducts();
    return products.find(product => product.id === id);
  }
  
  updateProduct(id, updates) {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(data);
      const productIndex = this.products.findIndex((x) => x.id === id);
      if (productIndex === -1) {
        console.log("El producto no existe");
        return;
      }
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updates,
        id: this.products[productIndex].id
      };
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
      return this.products[productIndex];
    } catch (error) {
      console.log("Error:", error.message);
      return;
    }
  }
    
  deleteProduct(id) {
    const products = this.getProducts();
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
      return null;
    }
    const deletedProduct = products.splice(index, 1)[0];
    fs.writeFileSync(this.path, JSON.stringify(products));
    return deletedProduct;
  }

}
const productManager = new ProductManager('./products.json');
module.exports = ProductManager

