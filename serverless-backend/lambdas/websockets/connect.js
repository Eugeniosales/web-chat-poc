const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    const { connectionId, domainName, stage } = event.requestContext;

    const data = {
        ID: connectionId,
        date: Date.now(),
        messages: [],
        domainName,
        stage,
    };

    await Dynamo.write(data, tableName);

    return Responses._200({ message: 'connected' });
};