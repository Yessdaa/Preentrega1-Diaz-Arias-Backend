import express from 'express';
import cartRouter from './src/routers/cartsRouter.js'
import productRouter from './src/routers/productsRouter.js';



const server = express();


server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// app.engine('handlebars', handlebars.engine());
// app.set('view engine', 'handlebars');
// app.set('views', __dirname + '/views');
// app.use(express.static(__dirname + '/public/'));
server.use(cartsRouter, productRouter)



server.listen(8080, () => {
    console.log('Server is running on port 8080');
});
