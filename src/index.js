const AWS = require('aws-sdk')
const client = require('./client')

module.exports.init = (config) => {
  const clientInstance = client.init(config)

  return {
    processRecord: ({
      dynamodb: {
        NewImage,
        SequenceNumber,
      }
    }) => {
      if (!NewImage)
        return 
        
      const obj = AWS.DynamoDB.Converter.unmarshall(NewImage)
      // dynamodbs have a bunch of zeros in the middle which make the number too large for stitch
      const sequence = SequenceNumber.replace('000000000', '')
      return clientInstance.send(obj, sequence)
    }
  }
}