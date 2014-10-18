Intercom
========

JavaScript event mediator / communication middle-man


Many planes, one control tower - all the planes talk to the tower, the tower talks to all the planes... safe landings.


Example A:
========
```javascript
// create an object
var obj = {'foo' : 'bar'};

// install Intercom on the obj
Intercom.installOn(obj);

// bind listening to our event on the obj
obj.listenTo('someEvent', function(arg) { alert(arg); });

// then to trigger
obj.broadcast('someEvent', 'woooooot tooooot');
```

Example B:
==========
```javascript
// create an object with a method
var obj = {'foo' : function(arg) { this.bar = arg; } };

// install Intercom on the obj
obj.installOn(obj);

// bind listening and pass string instead of function - string will be automatically detected and called on the context
obj.listenTo('bigEvent', 'foo');

// the to trigger
obj.broadcast('bigEvent', 'hello world');

// check results
console.log(obj.bar) // "hello world";
```