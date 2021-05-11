const aws = require('aws-sdk');

const s3 = new aws.S3();

exports.handler = async (event, context) => {

    const bucketParams = {
        Bucket: 'jarrellimagebucket2'
    }

    let imgArr;
    let bucketObjects;

    try {
        bucketObjects = await s3.listObjects(bucketParams).promise();
        imgArr = bucketObjects.Contents.map(item => {
            let imgObj = {
                name: item.Key,
                size: item.Size,
                tag: item.ETag
            };

            return imgObj;
        })
    } catch (e) {
        console.log(e);
    }
    console.log(JSON.stringify(event), JSON.stringify(imgArr));

    return "Completed function";


};
