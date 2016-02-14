const redis = require("redis");

var modis = module.exports = {};
var client;

modis.connect = function(options) {
    client = redis.createClient(options);
};

modis.model = function(name, schema) {
    var Model = function(_id, input) {
        for(var key in schema) {
            if(typeof schema[key] == "function") {
                this[key] = schema[key](input[key]);
            } else if(typeof schema == "object" && typeof schema.type == "function") {
                this[key] = schema[key].type(input[key]);
            } else {
                this[key] = input[key];
            }
        }

        this["_id"] = _id;
        this["_key"] = name + ":" + _id;
    };

    Model.find = function(_id, callback) {
        if(typeof _id == "string") {
            client.hgetall(name + ":" + _id, function(err, data) {
                if(err) return callback(err);
                callback(null, new Model(_id, data));
            });
        } else {
            var query = client.multi();

            _id.forEach(function(id) {
                query = query.hgetall(name + ":" + id);
            });

            query.exec(function(err, data) {
                if(err) callback(err);
                var models = [];

                for(var i = 0; i < _id.length; i++) {
                    models.push(new Model(_id[i], data[i]));
                }

                callback(null, models);
            });
        }
    };

    Model.prototype.save = function(callback) {
        var query = [this["_key"]];

        for(var key in schema) {
            if(this[key]) {
                query.push(key);
                query.push(this[key]);
            }
        }

        client.hmset(query, callback);
    };

    return Model;
};
