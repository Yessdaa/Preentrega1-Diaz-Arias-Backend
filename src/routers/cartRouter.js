import express from 'express';
import CartManager from '../Cart/cartManager.js'


const cartsRouter = express.Router();

const cartManager = new CartManager()

cartsRouter.get('/api/cart', async (req, res) => {
    const result = await cartManager.getCartsList()
    result.success ? res.status(200).json(result.parseList) : res.status(400).json(result)

});

cartsRouter.get('/api/cart/:cid', async (req, res) => {
    const cid = req.params.cid;
    const result = await cartManager.getCartById(cid)
    result.success ? res.status(200).json(result.result) : res.status(400).json(result)

})

cartsRouter.post('/api/cart/', async (req, res) => {
    const result = await cartManager.createNewCart()
    result.success ? res.status(200).json(result.carts) : res.status(400).json(result)
});

cartsRouter.post('/api/cart/:cid/product/:pid:', async (req, res) => {
    const { cid, pid } = req.params;
    const result = await cartManager.addProductToCart(cid, pid);
    result.success ? res.status(200).json(result.cart) : res.status(400).json(result)

});
export default cartsRouter;