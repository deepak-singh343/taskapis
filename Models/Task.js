const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})

const Task = mongoose.model('Task',schema)
module.exports = Task