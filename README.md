# HB Database Scripter

The database upgrade script executer.

## Useness

Imagine you have several SQLs to execute to upgrade your database or table:

```sql
ALTER TABLE `commoditlow` ADD `buy_link_mobile` TEXT DEFAULT NULL;
ALTER TABLE `boards` ADD `is_commoditlow_board` TINYINT(1) NOT NULL DEFAULT 0;
```

You want write down a script which you can run directly:

```sh
$ node script.js
```

You may use this module.

## Installation

```sh
$ npm install hb-database-scripter
```

## APIs

### Scripter

#### Constructor

```javascript
var Scripter = require("hb-database-scripter");
var scripter = new Scripter(processor);
```

Make sure that `processor` is a function which is truelly run your sqls and the arguments are `sql` and a `callback`.

> Eg.
>
> Imagine your project has a global object db, and it may use as below:
>
> ```javascript
> db.query(sql, function(err) { /** do sth... */ });
> ```
>
> Then you can use `db.query.bind(db)` as your processor.

#### push

Push your SQLs.

```javascript
scripter.push("ALTER TABLE `commoditlow` ADD `buy_link_mobile` TEXT DEFAULT NULL;");
scripter.push("ALTER TABLE `boards` ADD `is_commoditlow_board` TINYINT(1) NOT NULL DEFAULT 0;");
```

#### exec

Execute your SQLs that you pushed parallelly:

```javascript
scripter.exec(function() {
    process.exit(0);
});
```

## Who Uses This?

+ Huaban.com
+ maybe, you.

## Contribution

You're welcome to fork and pull requests!
