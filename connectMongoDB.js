const mongoose = require('mongoose')
// noinspection JSUnresolvedFunction
mongoose.connect('mongodb://localhost/my_database').then(() => {
    console.log("Success")
}).catch(err => {
    console.log(err)
})


/* 增加
创建约束模型Schema
返回一个约束模型的构造函数
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});
    const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'error message']
    },
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: [5, 'maxlength must <= 5'],
        trim: true
        去除两边空白
    },
    author: String,
    isPublished: Boolean,
    age: {
        type: Number,
        min: 18,
        max: 50
    }
    Date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        enum: ['html','css','javascript']
        enum只能传入该数组中的内容
    },
    phone: {
        type: String,
        validate: {
            validator: v => {
                返回Bool
                true成功 false失败
                v 要验证的值
                return v && v.length = 11
            }
        }
    }
});

使用这个约束模型的构造函数来创建一个集合的构造函数
const Course = mongoose.model('Course', courseSchema)

1>>使用该集合的构造函数的create()创建文档
Course.create({
    name: 'JavaScript',
    author: '葛雅飞',
    isPublished: true
}, (err, doc) => {
})

回调函数 或者 Promise皆可

2>>使用集合的构造函数来创建文档
const course = new Course({
    name: 'C语言',
    author: '葛雅飞',
    isPublished: true
})

将文档保存到数据库的集合中
course.save().then(r => {
}).catch(err => {
    console.log(err)
})

*/

/* 查询

使用该集合的find()来查询集合中的所有文档
Course.find().then(result => {
    // console.log(result)
})

查询条件
Course.find({name: 'JavaScrip'}).then(result => {
    console.log(result)
})

查询指定字段
Course.find().select('name age').then(result => {
    console.log(result)
})

20<age<30
Course.find({age: {$gt: 20, $lt: 30}}).then(result => {
     console.log(result)
})

address包含'南京'
Course.find({address: {$in:['南京']}}).then(result => {
     console.log(result)
})

通过find()查询,查询任意条,返回的都是[]

Course.findOne({_id: '635b300f08663afcf46cd35a'}).then(result => {
    console.log(result)
})
findOne()返回{}或null

age升序
Course.find().sort('age').then(result => {
    console.log(result)
})

age降序
Course.find().sort('age').then(result => {
    console.log(result)
})

skip(n)跳过n条数据
limit(m)限制查询m条数据
Course.find().skip(2).limit(2).then(result => {
    console.log(result)
})


*/

/* 删除

查询到符合条件的第一个文档,将其删除并且返回
Course.findOneAndDelete({}).then(result=>{console.log(result)})

删除多个符合条件的文档
条件为空则清空所有文档
Course.deleteMany({}).then(result=>{console.log(result)})

*/

/* 更新

更新单个文档
Course.updateOne({条件},{updateKey:updateValue}).then(result=>{console.log(result)})

更新多个文档
条件为空则更新所有文档
Course.updateMany({条件},{updateKey:updateValue}).then(result=>{console.log(result)})


 */

