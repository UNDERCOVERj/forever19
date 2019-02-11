const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const mongoose = require('mongoose');
const XLSX = require('xlsx');
mongoose.connect('mongodb://localhost/forever19');

let {personSchema} = require('./schema/add.js');
let Person = mongoose.model('Person', personSchema);

const app = new Koa();
const router = new Router();

router.use(koaBody());

router.post('/api/add', async ctx => {
    let data = ctx.request.body;
    let person = new Person(data);

    let param = {userName: data.userName};

    let isIn = await Person.findOne(param).exec();
    if (isIn) { // 已存在
        let result = await Person.findOneAndUpdate(param, {
            $set: data
        })
        if (result) {
            ctx.body = JSON.stringify({code: 200, msg: '修改成功'})
        } else {
            ctx.body = JSON.stringify({code: 500, msg: '服务器开了点小差'});
        }
    } else { // 不存在
        let result = await person.save();
        if (result) {
            ctx.body = JSON.stringify({code: 200, msg: '添加成功'})
        } else {
            ctx.body = JSON.stringify({code: 500, msg: '服务器开了点小差'});
        }
    }
});

router.get('/api/info', async ctx => {
    let result = await Person.find().exec();
    let data = [['原班主任', '原班级', '姓名', '手机号', '联系地址', '职业', '性别']];
    data = data.concat(result.map(item => ['袁玉珍', '19', item.userName, item.phone, item.address, item.professional, item.sex === 'male' ? '男' : '女']));
    
	let ws = XLSX.utils.aoa_to_sheet(data);
	let wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

	/* generate buffer */
	let buf = XLSX.write(wb, {type:'buffer', bookType: 'xlsx'});
    ctx.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    ctx.set('Content-Disposition', 'attachment; filename=' + new Buffer('2014届19班统计表.xlsx').toString('binary'));
    ctx.status = 200;
	/* send to client */
	ctx.body = buf;
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);