# dynamodb-stream-stitch-connector
A utility to push dynamodb streams to Stitch. Runs on AWS Lambda


## How

AWS Lambda function
```js
//handler.js

const stitchConnector = require('dynamodb-stream-stitch-connector')

const connector = stitchConnector.init({
  apiKey: 'xxxxxxxxxx',
  clientId: 12345,
  tableName: 'stitch-table-name',
  keyNames: [ 'id', 'anotherKey' ]
})

module.exports.streamsToStitch = async ({
  Records
}) => {
  for (const record of Records) {
    await connector.processRecord(record)
  }
}
```

If you're using Serverless Framework
```yml
## serverless.yml

# ....
functions:
  streamsToStitch:
    handler: handler.streamsToStitch
    events:
      - stream:
          type: dynamodb
          arn:
            Fn::GetAtt: [SomeTable, StreamArn]
# ....
```