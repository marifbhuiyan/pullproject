const {Schema,model} = require('mongoose')

const pollschema = new Schema({
    title: {
        type : String,
        require : true,
        trim : true
    },
    description :{
        type : String,
        require : true,
        trim : true
    },
    totalvote : {
        type : Number,
        default : 0
    },
    options : {
        type :[{
            name : String,
            vote : Number
        }]
    }

})

const poll = model('poll' ,pollschema)

module.exports = poll