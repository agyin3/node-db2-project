const express = require('express')
const Cars = require('./carsDb.js')

const router = express.Router()

router.use('/:id', validateCarId)

router.get('/', async (req,res) => {
    try {
        const cars = await Cars.find()
        res.status(200).json(cars)
    }catch(err) {
        res.status(500).json({errorMessage: `There was an error with your ${req.method} request`})
    }
})

router.get('/:id', (req,res) => {
    res.status(200).json(req.car)
})

router.post('/', validateCarInfo, (req,res) => {
    const car = req.body
    Cars.insert(car)
        .then(car => {
            res.status(201).json({message: 'Car successfully added', car})
        })
        .catch(err => {
            res.status(500).json({errorMessage: `There was an error with your ${req.method} request`})
        })
})

router.put('/:id', validateCarInfo, async (req, res) => {
    const changes = req.body
    const {id} = req.params
    try {
        const car = await Cars.update(id, changes)
        res.status(201).json({message: 'Car successfully updated', car: car})
    }catch(err) {
        res.status(500).json({errorMessage: `There was an error with your ${req.method} request`})
    }
})

router.delete('/:id', (req, res) => {
    const car = req.car
    const {id} = req.params
    Cars.remove(id)
        .then(() => {
            res.status(200).json({message: 'Car successfully deleted', car: car})
        })
        .catch(err => {
            res.status(500).json({errorMessage: `There was an error with your ${req.method} request`})
        })
})

// Custom MiddleWare

function validateCarId(req, res, next){
    const {id} = req.params
    Cars.findById(id)
        .then(car => {
            if(!car){
                res.status(400).json({message: 'Invalid Card Id'})
            }else{
                req.car = car
                next()
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: `There was an error with your ${req.method} request`})
        })
}

function validateCarInfo(req,res, next){
    const {VIN, make, model, mileage} = req.body
    if(!req.body){
        res.status(400).json({message: `Missing car data`})
    } else if(!VIN || !make || !model || !mileage){
        res.status(404).json({message: 'All fields are required: VIN, make, model, mileage'})
    }else{
        next()
    }
}
module.exports = router