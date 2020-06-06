const mongoose = require('mongoose')

const ExpenseSchema = mongoose.Schema({

    amount:     { type:Number, required:1},
    description:     { type:String },
    created:   { type:Date  ,default:new Date()},
    owner:   { type: mongoose.Schema.Types.ObjectId , ref:'User'}
})

const Expense = mongoose.model('Expense',ExpenseSchema)
module.exports =  Expense