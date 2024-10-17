import { getOrders, getOrder, addOrder } from './dboperation.js';
// import Order from './model/order.js';
import express, { Router } from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
var  app = express();
var  router = Router();

app.use(urlencoded({ extended:  true }));
app.use(json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
  console.log('middleware');
  next();
});
 
 
router.route('/orders').get((request, response) => {
  getOrders().then((data) => {
    response.json(data[0]);
  })
})

router.route('/orders/:id').get((request, response) => {
  getOrder(request.params.id).then((data) => {
    response.json(data[0]);
  })
})

router.route('/orders').post((request, response) => {
  let  order = { ...request.body }
  addOrder(order).then(data  => {
    response.status(201).json(data);
  })
})
  
  
var  port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);