// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '4f1dx16053'
// export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`
//const apiId = process.env.REACT_APP_API_ID
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`



export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  // domain: 'olenairy.us.auth0.com',            // Auth0 domain
  // clientId: '3F1wDkU4FpHShwLmyifJ3ZzKoCfZ1qk9',          // Auth0 client id
   callbackUrl: 'http://localhost:3000/callback',

   domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
   clientId: process.env.REACT_APP_AUTH0_CLIENT_ID as string
 


}
