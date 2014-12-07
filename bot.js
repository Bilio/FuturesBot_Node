var mqtt = require('mqtt')
  , client = mqtt.connect('mqtt://user:tradingbot@m2m.tradingbot.com.tw?clientId=koding_client');
client.subscribe('BOT/TX00');
var xmpp = require('simple-xmpp');

xmpp.on('error', function(err) {
            console.error(err);
});         

xmpp.connect({
                jid                 : 'yourname@gmail.com',
                password            : 'password',
                host                : 'talk.google.com',
                port                : 5222
});

client.on('message', function (topic, message) {
  main(message, xmpp);
});


function main(message, callback) {
	var temp = message.split(",");
	if (temp.length > 10) {
		try {
			var name = temp[0];
			var Bid = parseFloat(temp[1]);
			var Bc = parseInt(temp[2]);
			var Ask = parseFloat(temp[3]);
			var Ac = parseInt(temp[4]);
			var close = parseFloat(temp[5]);
			var high = parseFloat(temp[6]);
			var low = parseFloat(temp[7]);
			var TickQty = parseInt(temp[8]);
			var TQty = parseInt(temp[9]);
			var Ref = parseFloat(temp[10]);
			var Percent = ((close / Ref) - 1) * 100;
			Percent = Percent.toFixed(5);
			if (Percent == Infinity || Percent == NaN) {
				return null;
			}
			if (Percent >= 1) {
				callback.send('yourname@gmail.com', new Date().toLocaleTimeString() + ' BUY! ' + close);
			}
		} catch (ex) {
			console.error(ex);
          	}
	}
}
