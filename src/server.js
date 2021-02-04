import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import hub from './hub';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';


const server = require('http').createServer();

polka({ server }) // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

const io = require("socket.io")(server);
hub.setSocket(io);
hub.beginUpdating();
io.on('connection', () => {
	console.log('someone connected')
	hub.initialTransactions();
});