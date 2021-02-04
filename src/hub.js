import amqp from 'amqplib/callback_api';


let socket = null;
const existing = new Set();

const hub = {
    setSocket: (io) => {
        socket = io;
    },
    initialTransactions: () => {
        console.log('broadcasting initial transcations')
        socket.emit('datachanged', { time: Date.now() });
    },
    beginUpdating: () => {
        amqp.connect('amqp://localhost', (error0, connection) => {
            if (error0) {
                throw error0;
            }
            connection.createChannel((error1, channel) => {
                if (error1) {
                    throw error1;
                }
                const queue = 'txes';

                channel.assertQueue(queue, { durable: true });

                console.log('Listening on RabbitMQ TXPool', queue);
                channel.consume(queue, (msg) => {
                    const receivedTransactions = JSON.parse(msg.content.toString());
                    receivedTransactions.forEach((element) => {
                        if (!existing.has(element.Hash)) {
                            existing.add(element.Hash)
                            if (socket) {
                                socket.emit('tx', element);
                            }
                        }
                    });
                }, { noAck: true });
            });
        });
    }
}

export default hub;