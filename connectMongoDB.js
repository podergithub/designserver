const mongoose = require('mongoose')
// noinspection JSUnresolvedFunction
mongoose.connect('mongodb://localhost/my_database').then(() => {
    console.log("Success")
}).catch(err => {
    console.log('Fail')
})