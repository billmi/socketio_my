//也可以写入全局
let _config = require("./config/config.js");
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let ejs = require('ejs');
let routers = require('./routers/routers');

let redisCon = require("./serv/redis")(_config.redis);
let mysqlHandler = require("./serv/mysql")(_config.db);

//init
http.on('error', onError);
app.engine('html', ejs.renderFile);
app.set("view engine", "html");
routers(app,_config);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.message = err.message;
    // render the error page
    res.status(err.status || 500);
    res.send('error');
});



//redis con
// redisCon.set("test", "test");
// redisCon.get("test", function (err, result) {
//     console.log(result);
// });

// mysql
// var sql = "SELECT * FROM `test`";
// mysqlHandler.query(sql, "", function (err, results, fields){
//     // console.log(fields);
//     console.log(results);
//     // results.forEach(function (item,index) {
//     //     console.log(item);
//     //     console.log(index);
//     // });
//     // for(var i in results){
//     //     var item = results[i];
//     //     console.log(item.id);
//     //     console.log(item.mid);
//     //     console.log(item.content);
//     // }
// });



io.on('connection', function (socket) {

    socket.on("test", function (msg) {
        console.log(msg);
        console.log(2323);
        io.emit('test', msg);
    });

    socket.on('update',function (msg) {
        //发送给test频道
        io.emit('test', msg);
        //全部
        io.emit('broadcast', msg);
        // 发送到所有客户端除了自己
        socket.broadcast.emit('message', "this is a test");
    })
});

console.log("start");
http.listen(3000);


//错误处理
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = config.service.http.port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
