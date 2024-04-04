/* Author: Ajitabh Sharma 
*/
import { SSM } from '@aws-sdk/client-ssm';

var environment = 'DIT';

const ssm = new SSM({});

// Define the parameter name you want to query
const userName = '/APP-01/' + environment + '/userName';
const password = '/APP-01/' + environment + '/password';

const queryParams = [userName, password];

queryParams.forEach(param => {
    var params = {
        Name: param,
        WithDecryption: true
    };
    ssm.getParameter(params, (err, data) => {
        if (err) {
            console.error('Failed to query parameter:', err);
        } else {
            console.log('Parameter name:', data.Parameter.Name);
            console.log('Parameter value:', data.Parameter.Value);
        }
    });
});