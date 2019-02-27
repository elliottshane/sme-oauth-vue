var nativescript_oauth2 = require("nativescript-oauth2");
var providers = require("nativescript-oauth2/providers");
import { store } from './store';
import axios from 'axios';
var client = null;


/*var googleProviderOptions = {
    openIdSupport: "oid-full",
    clientId: "",
    redirectUri: "",
    urlScheme: "",
    scopes: ["profile"]
};*/

var googleProvider = new providers.TnsOaProviderGoogle(googleProviderOptions);
nativescript_oauth2.configureTnsOAuth([ googleProvider]);

export default class AuthService {

   clientScopes(){
            client = new nativescript_oauth2.TnsOAuthClient('google');
            console.log(client.provider.options.scopes)
    }
    login() {
            client =  new nativescript_oauth2.TnsOAuthClient('google');
            client.loginWithCompletion(function (tokenResult, error) {
            if (error) {
                console.error("back to main page with error: ");
                console.error(error);
            }
            else {
                console.log("back to main page with access token: ");
                console.log(tokenResult.accessToken);
                axios
                    .get("https://content-people.googleapis.com/v1/people/me?personFields=emailAddresses,phoneNumbers,names&access_token=" + tokenResult.accessToken, {
                   // .get("https://www.googleapis.com/admin/directory/v1/users/selliott%40sbsar.org?customFieldMask=full&viewType=domain_public&access_token=" + tokenResult.accessToken, {
                    })
                    .then(function (response) {
                        let record = store.getters.record;
                        record.email = response.data.emailAddresses[0].value;
                        let phone = response.data.phoneNumbers.filter(function(item){return item.type=='mobile'})
                        record.cellPhone = phone[0].value;
                        record.lastName = response.data.names[0].familyName;
                        record.firstName = response.data.names[0].givenName;
                        console.log('record',JSON.stringify(record));
                        store.dispatch('setRecord', record);
                    })
                    .catch(function(error){
                        console.log(error.response)
                    });
            }
        });
    }

    logout() {
        if (client) {
            console.log('logout')
            client.logout();
        }
    }


}
