/**
 * XadillaX created at 2014-09-04 10:30
 *
 * Copyright (c) 2014 Huaban.com, all rights
 * reserved.
 */
var Scarlet = require("scarlet-task");

/**
 * Huaban Database Scripter
 * @param processor make sure it's arguments are a single sql and callback
 * @constructor
 */
var Scripter = function(processor) {
    this.scarlet = new Scarlet(10);
    this.processor = processor;
    this.sql = [];

    this.errors = [];
};

/**
 * push an SQL to task queue
 * @param sql
 */
Scripter.prototype.push = function(sql) {
    this.sql.push(sql);
};

/**
 * execute SQLs
 * @param callback
 */
Scripter.prototype.exec = function(callback) {
    for(var i = 0; i < this.sql.length; i++) {
        this.scarlet.push(this.sql[i], this._tasker.bind(this));
    }

    var self = this;
    this.scarlet.afterFinish(this.sql.length, function() {
        if(self.errors.length) {
            return callback(self.errors);
        }

        callback();
    }, false);
};

Scripter.prototype._tasker = function(TO) {
    var sql = TO.task;
    var self = this;
    this.processor(sql, function(err) {
        if(err) {
            self.errors.push(new Error("Error occurred while executing [" + sql + "]: " + err.message));
        }

        self.scarlet.taskDone(TO);
    });
};

module.exports = Scripter;
