const mongoose = require('mongoose')
// noinspection JSUnresolvedFunction
mongoose.connect('mongodb://localhost/my_database').then(() => {
    console.log("Success")
}).catch(err => {
    console.log(err)
})

//创建约束模型Schema
//返回一个约束模型的构造函数
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});

//使用这个约束模型的构造函数来创建一个集合的构造函数
const Course = mongoose.model('Course', courseSchema)

//1>>使用集合的create方法创建文档
Course.create({
    name: 'JavaScript',
    author: '葛雅飞',
    isPublished: true
}, (err, doc) => {
    console.log(err)
    console.log(doc)
})
//回调函数 或者 Promise皆可

//2>>使用集合的构造函数来创建文档
const course = new Course({
    name: 'C语言',
    author: '葛雅飞',
    isPublished: true
})


//将文档保存到数据库的集合中
course.save().then(r => {
    console.log(r)
}).catch(err => {
    console.log(err)
})