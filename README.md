# modis
Mongoose-like models for Redis.

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
```

Save the user!

``` javascript
monty.save(function(err) {
    console.log(err || "Model saved!");
});
```
