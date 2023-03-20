const express = require('express')
const fs = require('fs')


const port = 9090
const app = express()



app.use(express.urlencoded({extended: true}))


app.get('/products', async (req, res) => {
    const {ordering, price_low = 0, price_high = 100, country, orderBy } = parseInt( req.query );

    let limit = parseInt(req.query.limit) || 3;
    if (isNaN(limit) || limit <= 0) {
    return res.status(400).json({ error: 'El parámetro "limit" debe ser un número positivo' });
    }

    try {
        const data = await fs.promises.readFile('./products.json', 'utf8');
        const products = JSON.parse(data);

        const queries = {
            ordering,
            price_high,
            price_low,
            country,
            orderBy,
            limit
        }

    res.json({ message: 'Los productos', products: products.slice(0, limit), queries });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error' });
    }
});


app.get('/products/:pid', async (req, res) => { console.log(req.params.pid);
    const productId = parseInt(req.params.pid);

    try {
        
        const data = await fs.promises.readFile('./products.json', 'utf8');
        const products = JSON.parse(data);
        const product = products.find(p => p.id === productId);

        if (!product) {
            return res.status(404).json({ error: `ID del producto ${productId} no encontrado` });
        }

        res.json({ product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error' });
    }
});


app.listen(port, ()=>{
    console.log(`Servidor en marcha en ${port}`);
})  