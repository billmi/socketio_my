let _config = require("./config/config.js");
let redisCon = require("./serv/redis")(_config.redis);
let mysqlHandler = require("./serv/mysql")(_config.db);
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let ejs = require('ejs');

//init
http.on('error', onError);


console.log("start");

//templ
app.engine('html', ejs.renderFile);
app.set("view engine", "html");

//router
app.get('/', function (req, res) {
    console.log(123);
    res.render(__dirname + '/views/index.html', {url: _config.socketUrl});
});


app.get('/update', function (req, res) {
    res.render(__dirname + '/views/update.html', {url: _config.socketUrl});
});

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

// var sql = "SELECT * FROM `test`";
// mysqlHandler.query(sql, "", function (err, results, fields){
//     // console.log(fields);
//     console.log(results.length);
// });


io.on('connection', function (socket) {

    socket.on("test", function (socket,msg) {
        console.log(msg);
        io.emit('test', msg);
    });

    socket.on('update',function (socket,msg) {

    })
});

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
