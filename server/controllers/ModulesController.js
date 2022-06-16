const Modules = require('../models/Modules.js')
const nodemailer = require('nodemailer');
require('dotenv').config()
const { json } = require('body-parser');
const bcrypt = require('bcrypt')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError');


const createModules = catchAsync(async(req, res, next) => {
    let data = req.body;
    //Take datas we want only
    const newModules = await Modules.create(data);

    console.log(data)

    // Send result json if success else catch error with catch Async and send error name
    res.status(200).json({
            status: 'success',
            data: {
                newModules
            },
            message : "Event module created."
        }
    );

})

const deleteModules = catchAsync(async(req, res) => {
    data = req.body
    let result = await Modules.deleteOne(
        {id_event:data.eventId}
    )
    res.status(200).json({
        status: 'success',
        data: {
            result
        },
        message : "Les modules ayant pour iDevent" + data.eventId + "a été supprimé"
    })
})

const getAllModules = catchAsync(async(req, res) => {
    data = req.query
    console.log(data)
    let modules = await Modules.find(data)
    res.status(200).json({
        status : 'success', 
        data: {
            modules
        },
        message: "voici tout les modules"
    })
})

const getModulesByEventId = catchAsync(async(req, res) => {
    data = req.query
    console.log(data)
    let modules = await Modules.find(data)
    let eventModules = []
    modules.forEach(modules => function(){
            if(module.id_event == data.id_event){
                return eventModules.push(modules)
            }
        })

    res.status(200).json({
        status: 'success', 
        data: {
            eventModules
        },
        message : "voici tout les modules dans l'event ayant x pour ID"
    })
})

module.exports = {
    createModules,
    deleteModules,
    getAllModules,
    getModulesByEventId
}