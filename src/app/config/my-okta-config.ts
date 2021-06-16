import { environment } from "src/environments/environment";

export default
{
    oidc: {
        clientId: environment.clientId, // public id of client app
        issuer: `${environment.oktaDomain}/oauth2/default`, // issuer of tokens
        redirectUri: `${environment.baseUrl}/login/callback`, // send user here after login,
        scopes: ['openid', 'profile', 'email'],
        oktaBaseUrl: environment.oktaDomain
        // openid: required for authentication requests
        // profile: user's first name, last name, phone, etc
        // email: user's email address
    }
}
