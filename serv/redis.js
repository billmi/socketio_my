module.exports = function (cfg) {
    let Redis = require('ioredis');
    let redis = new Redis(cfg);
    redis.on("error", function (error) {
        console.log(error);
    });
    return redis;
};