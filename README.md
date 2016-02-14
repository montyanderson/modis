# modis
Mongoose-like models for Redis.

## Quick Start

Install modis.

```
npm install modis --save
```

Make a new 'User' model.

``` javascript
const modis = require("modis");

var modis = require("./index.js");

modis.connect();

var User = modis.model("user", {
    password: String,
    age: Number
});
```

Create a new User!

``` javascript
var monty = new User("montyanderson", {
    password: "nodejsisthefuture",
    age: 99
});

console.log(monty);
```

```
$ node test.js
{ password: 'nodejsisthefuture',
  age: 99,
  _id: 'montyanderson',
  _key: 'user:montyanderson' }

```

Save the user!

``` javascript
monty.save(function(err) {
    console.log(err || "Model saved!");
});
```
