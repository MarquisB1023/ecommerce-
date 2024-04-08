const ordersRouter = require('./ordersRoutes.js')
const productsRouter = require('./productsRoutes.js')

const apiRouter = require('express').Router()


apiRouter.use('/auth', require('./auth.js'))

apiRouter.use('/orderRoutes',ordersRouter)
apiRouter.use('/productsRoutes',productsRouter)

module.exports = apiRouter