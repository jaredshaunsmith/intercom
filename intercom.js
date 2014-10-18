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