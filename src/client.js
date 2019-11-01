const axios = require('axios')

module.exports.init = ({ apiKey, tableName, clientId, keyNames }) => {

  const makeRequest = async body => {
    const { data } = await axios({
      url: 'https://api.stitchdata.com/v2/import/push',
      method: 'POST',
      data: [{
        client_id: parseInt(clientId),
        table_name: tableName,
        action: 'upsert',
        key_names: keyNames,
      ...body,
      }],
      headers: {
        'Authorization': 'Bearer ' + apiKey,
      }
    })

    return data
  }


  return {
    send: (data, sequence) => {
      return makeRequest({
        data,
        sequence: sequence 
          ? parseInt(sequence) 
          : Date.now(),
      })
    }
  }
}