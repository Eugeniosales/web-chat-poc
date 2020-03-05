const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID,
            },
        };

        const data = await documentClient.get(params).promise();

        if (!data) {
            throw Error(`Houve um erro para buscar o item ${ID} na ${TableName}`);
        }

        return data.Item;
    },

    async write(data, TableName) {
        if (!data.ID) {
            throw Error('no ID on the data');
        }

        const params = {
            TableName,
            Item: data,
        };

        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`Houve um erro na inserção do ID ${data.ID} na tabela ${TableName}`);
        }

        return data;
    },

    async delete(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID,
            },
        };

        return documentClient.delete(params).promise();
    },
    async getIds(TableName) {
        const params = {
            TableName
        };

        const data = await documentClient.scan(params).promise();

        if (!data) {
            throw Error(`Houve um erro para buscar o item ${ID} na ${TableName}`);
        }

        return data;
    },
};
module.exports = Dynamo;