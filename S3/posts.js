// @ts-ignore
const AWS = require("aws-sdk");

const s3 = new AWS.S3();

const Bucket = "mtudor-simple-blogger-html";

module.exports = {
    list,
    get,
};

async function list() {
    var params = {
        Bucket,
    };
    try {
        return await s3.listObjects(params).promise();
    } catch (err) {
        console.log(err);
        return;
    }
}

async function get(id) {
    var params = {
        Bucket,
        Key: id,
    };

    try {
        const data = await s3.getObject(params).promise();
        return data.Body.toString();
    } catch (error) {
        console.log(error);
        return;
    }
}
