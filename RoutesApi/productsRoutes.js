const  express = require('express')

const productsRouter = express.Router()
const client = require('../server/seed')

productsRouter.get(async(req,res, next)=>{

   

   try {

    res.send(await client.fetchProducts)
   }catch{error}{
   next(error)
}
   

})

productsRouter.get("/app/products", async (req, res, next) => {
   try {
     res.send(await client.createProducts);
   } catch {
     error;
   }
   {
     next(error);
   }
 });

productsRouter.get("/app/products", async (req, res, next) => {
   try {
     res.send(await client.fetchProducts);
   } catch {
     error;
   }
   {
     next(error);
   }
 });




 productsRouter.get("/products/:id/", async (req, res, next) => {
    try {
      res.send(await client.fetchproducts)(req.paraqms.id);
    } catch {
      error;
    }
    {
      next(error);
    }
  });

  




module.exports = productsRouter