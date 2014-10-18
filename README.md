Intercom
========

JavaScript event mediator / communication middle-man


Many planes, one control tower - all the planes talk to the tower, the tower talks to all the planes... safe landings.


Intercom:
---------
```javascript
// ///////////////////////////////////////////////////////////////////////////
// Intercom - JavaScript mediator
// Jared Smith - 2014
// Based on the previous work of Ryan Florence (https://github.com/rpflorence)
// ///////////////////////////////////////////////////////////////////////////
var Intercom = (function() {
	var listen = function(channel, fn) {
		if(!Intercom.channels[channel]) Intercom.channels[channel] = [];
		Intercom.channels[channel].push({context: this, callback: fn});
		return this;
	},

	disconnect = function(channel) {
		if(!Intercom.channels[channel]) return false;
		delete Intercom.channels[channel];
		return this;
	},

	broadcast = function(channel) {
		if(!Intercom.channels[channel]) return false;
		var args = Array.prototype.slice.call(arguments, 1);
		for(var i = 0, l = Intercom.channels[channel].length; i < l; i++) {
			var tuneIn = Intercom.channels[channel][i];
			if (typeof tuneIn.callback == 'function') { 
				tuneIn.callback.apply(tuneIn.context, args);
			} else {
				tuneIn.context[tuneIn.callback].apply(tuneIn.context, args);
			}
		}
		return this;
	};

	return {
		channels: {},
		listen: listen,
		disconnect: disconnect,
		broadcast: broadcast,
		installOn: function(obj) {
			obj.listen = listen;
			obj.disconnect = disconnect;
			obj.broadcast = broadcast;
		}
	};
})();
```

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

// bind listening and pass string instead of function
// string will be automatically detected and called on the context
obj.listenTo('bigEvent', 'foo');

// the to trigger
obj.broadcast('bigEvent', 'hello world');

// check results
console.log(obj.bar) // "hello world";
```