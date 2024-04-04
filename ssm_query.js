/* Author: Ajitabh Sharma 
*/
const AWS = require('aws-sdk');
var aws_region = 'us-east-1';
var environment = 'DIT';

// Create an instance of the AWS SSM service
const ssm = new AWS.SSM(
    {
        apiVersion: '2014-11-06',
        region: aws_region
    }
);

// Define the parameter name you want to query
const parameterName = '/APP-01/${environment}/userName';

// Create the parameters object
const params = {
    Name: parameterName, // The name of the parameter you want to query
    WithDecryption: true // Set to true if the parameter value is encrypted
};

// Query the parameter store
ssm.getParameter(params, (err, data) => {
    if (err) {
        console.error('Failed to query parameter:', err);
    } else {
        const parameterValue = data.Parameter.Value;
        console.log('Parameter value:', parameterValue);
    }
});