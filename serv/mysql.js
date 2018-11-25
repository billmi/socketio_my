var pool = null;

var mysqlHandler = function (cfg) {
    var mysql = require('mysql');
    if (pool == null) pool = mysql.createPool(cfg);
    var handle = {
        handle: pool,
        query: function (sql, params, callback) {
            pool.getConnection(function (err, connection) {
                if (err) callback(err,null,null);
                connection.query(sql, params, function (err, results, fields) {
                    connection.release();
                    callback(err, results, fields);
                });
            });
        }
    };
    return handle;
};

module.exports = mysqlHandler;