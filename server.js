const express = require('express')
const helmet = require('helmet')
const server = express()

const carsRouter = require('./cars/carsRouter.js')

server.use(helmet())
server.use(logger)

server.use(express.json())

server.use('/api/cars', carsRouter)

function logger (req, res, next) {
    const date = new Date().toISOString()
    console.log(`${req.method} request made at ${date} to ${req.url} from ${req.hostname}`)
    next()
}


module.exports = server