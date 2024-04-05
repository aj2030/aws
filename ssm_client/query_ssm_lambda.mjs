import { SSMClient, GetParametersCommand } from '@aws-sdk/client-ssm';

export const handler = async (event) => {
  console.log('Begin function execution.');
  const ssmClient = new SSMClient({ region: 'ap-south-1' });

  // Get post body here
  var payload = event.body;
  console.log('Using event data: ', payload);

  console.log('Using user supplied parameters: ', payload);

  if(payload == null || payload == undefined || payload == '' || payload.length == 0 ) {
    console.log('No parameters found in the request.');
    return {"result": JSON.stringify("No parameters found in the request")};
  }
  const params = JSON.parse(payload);
  params.WithDecryption = true;

  console.log('Calling SSM client with input: ', params);

  // Deserialize params before using it further
  
  if(params == null || params == undefined || params == '' || params.length == 0) {
    console.log('No relevant parameters found in the request.');
    return {"result": JSON.stringify("No relevant parameters found in the request")};
  }

  const command = new GetParametersCommand(params);
  const result =  await ssmClient.send(command);
  
  console.log('End execution, returning result');
  return {"result": result.Parameters};
};
