const  express = require('express')

const ordersRouter = express.Router()
const client = require('../server/seed')

ordersRouter.get(async(req,res, next)=>{

   

   try {

    res.send(await client.fetchOrders)
   }catch{error}{
   next(error)
}
   

})

ordersRouter.get("/app/orders", async (req, res, next) => {
   try {
     res.send(await client.createOrders);
   } catch {
     error;
   }
   {
     next(error);
   }
 });

ordersRouter.get("/app/orders", async (req, res, next) => {
   try {
     res.send(await client.fetchOrders);
   } catch {
     error;
   }
   {
     next(error);
   }
 });



 ordersRouter.get("/orders/:id/", async (req, res, next) => {
    try {
      res.send(await client.fetchOrders)(req.paraqms.id);
    } catch {
      error;
    }
    {
      next(error);
    }
  });

  




module.exports = ordersRouter