import express from 'express';
import { Router } from 'express';
import ProductManager from '../src/public/productManager.js';


const productsRouter = express.Router();
const productManager = new ProductManager();

productsRouter.get('/api/Products', async (req, res) => {
    productManager.getAllProducts()
    const limit = req.query.limit;
    let result;
    if (limit) {
        result = await productManager.getAllProducts(limit);
    } else {
        result = await productManager.getAllProducts();
    }
    result.success ? res.status(200).json(result) : res.status(400).json(result)
});


productsRouter.get('/api/Products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const result = await productManager.getProductById(pid);
    result.success ? res.status(200).json(result) : res.status(400).json(result)
})

productsRouter.post('/api/products', async (req, res) => {
    const product = req.body;
    const result = await productManager.addProduct(product)
    result.success ? res.status(200).json(result) : res.status(400).json(result)

})

productsRouter.put('/api/products', async (req, res) => {
    const product = req.body;
    const result = await productManager.updateProduct(product)
    result.success ? res.status(200).json(result) : res.status(400).json(result)
})

productsRouter.delete('/api/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const result = await productManager.deleteProduct(pid)
    result.success ? res.status(200).json(result) : res.status(400).json(result)


})

export default productsRouter;