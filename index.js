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
    var self = this;

    for(var i = 0; i < this.sql.length; i++) {
        this.scarlet.push(this.sql[i], function(TO) {
            var sql = TO.task;
            self.processor(sql, function(err) {
                if(err) {
                    console.log("Error occurred while executing [" + sql + "]: " + err.message);
                } else {
                    console.log("Done: [" + sql + "]");
                }

                self.scarlet.taskDone(TO);
                if(self.scarlet.numberOfProcessed() === self.sql.length) {
                    callback();
                }
            });
        });
    }
};

module.exports = Scripter;
