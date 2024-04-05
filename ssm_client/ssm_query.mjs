/* Author: Ajitabh Sharma 
*/
import { SSM } from '@aws-sdk/client-ssm';

var environment = 'DIT';

const ssm = new SSM({});

// Define the parameter name you want to query
const userName = '/APP-01/' + environment + '/userName';
const password = '/APP-01/' + environment + '/password';

const queryParams = [userName, password];

ssm.getParameters({ "Names": queryParams, "WithDecryption": true}, (err, data) => {
    if (err) {
        console.error('Failed to query parameters:', err);
    } else {
        data.Parameters.forEach(param => {
            console.log('Parameter name:', param.Name);
            console.log('Parameter value:', param.Value);
        });
    }
});