const http = require('http');
const url = require('url');
const vins = require('./db.json')


// define the port of access for your server
const PORT = 8080;

function extractVin(vinId){
	const allVins = vins.data;
	const vinData = allVins.filter(v => v.id === vinId);
	return vinData;
}

function listDevices(){
	const devices = vins.data.map(v => v.id);
	return devices;
}


let server = http.createServer(function (req, res) {
	if(req.url.indexOf("/vin/") != -1){
		let vin = req.url.split('/vin/')[1];

		console.log(`Got request for vin ${vin}`)

		let mayBeVin = extractVin(vin);

		if(mayBeVin.length > 0) {
			console.log(`Found vin data for ${vin}`)
			let data = mayBeVin[0];
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(data.vinData));
		} else{
			console.log(`Couldn't vin data for ${vin}`)
			res.writeHead(404, {'Content-Type': 'application/json'});
			res.end('{"error" : "vin not found"}');
		}
	}else if(req.url.indexOf("/devices/") != -1){
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(listDevices()));
	} else {
		res.writeHead(404, {'Content-Type': 'application/json'});
		res.end('{"error" : "path not found"}');
	}
});


console.log("----------------------------------------------------------------------")
console.log("You could use /vin/<vinId> for vin info")
console.log("You could use /devices for listing devices")
console.log("----------------------------------------------------------------------")


server.listen(8080);

