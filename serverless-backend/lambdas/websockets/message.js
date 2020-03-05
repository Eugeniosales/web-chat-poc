const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const AWS = require('aws-sdk');

const tableName = process.env.tableName;


const create = (domainName, stage) => {
    const endpoint = `${domainName}/${stage}`;
    return new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint,
        //endpoint: 'http://localhost:3001'
    });
};

exports.handler = async event => {
    console.log('event', event);

    const { connectionId } = event.requestContext;

    const body = JSON.parse(event.body);

    try {
        const record = await Dynamo.get(connectionId, tableName);
        const { messages } = record;
        const { message, username } = body;

        const obj = {
            username,
            message
        }

        messages.push(obj);

        const data = {
            ...record,
            messages,
        };

        //Storing the new message to the DB
        await Dynamo.write(data, tableName);

        const { domainName, stage } = data;

        const ws = create(domainName, stage);
        
        //Fetching all Ids from the DB
        const items = (await Dynamo.getIds(tableName)).Items;

        console.log(items);

        const promise = items.map(async item => {
            
            let payload = {
                ConnectionId: item.ID,
                Data: JSON.stringify(obj)
            };

            console.log(`Item de ID: ${item.ID}`);
        
            //Sending the message to each Socket
            await ws.postToConnection(payload).promise()
            .catch(async err => {
                
                console.log(JSON.stringify(err));

                if(err.statusCode == 410) await Dynamo.delete(item.ID, tableName);
            });

            console.log(`Mensagem enviada para ${item.ID}`);
        });

        //Making sure all messages were sent
        await Promise.all(promise);

        return Responses._200({ message: 'Message Sent' });


    } catch (error) {
        return Responses._400({ message: 'message could not be received' });
    }
};