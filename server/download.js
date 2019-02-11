const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const path = require('path');
const fs = require('fs');
const app = new Koa();
const router = new Router();
const serve = require('koa-static2');

router.use(koaBody());


router.use(serve("static", __dirname + ",/"));
// function getPdf() {
//     let pdf = fs.readFileSync(path.resolve(__dirname, './jsdesign.pdf'));
//     console.log(pdf);
// }

// getPdf();

router.get('/api/pdf', async ctx => {
    let pdf = fs.readFileSync(path.resolve(__dirname, './jsdesign.pdf'));
    ctx.set("Content-Type", "application/pdf");
    ctx.set('Content-Disposition', 'attachment; filename=' + new Buffer('desssss.pdf').toString('binary'));
    ctx.status = 200;
	/* send to client */
	ctx.body = pdf;
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);