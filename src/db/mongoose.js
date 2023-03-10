const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
})


//===========================================new User=======================================================
// const me = new User({
//     name: 'Andrew',
//     age: 27
// })

// const me = new User({
//     name: 'Andrew',
//     email: 'src@src.com',
//     password: 'password'
// })

// me.save().then((result) => {
//     console.log(me)
// }).catch(error => console.log(error))

//==================================================new Task================================================
// const task = new Task({
//     desc: 'Grooming',
//     completed: false
// })

// task.save().then(() => console.log(task)).catch(err => console.log(err))
