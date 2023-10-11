export const AzureConfig = {
    appId : 'fe1470b6-3fb8-4fba-a60f-1fa6f1ec7511',
    redirectUri : 'http://localhost:3000',
    scopes: [
        'users.read'
    ],
    authority : 'https://login.microsoftonline.com/jpalbertsehotmail.onmicrosoft.com'

};

export const UrlConfig = {
    clientUrl : 'http://localhost:3000',
    serverUrl : 'http://localhost:5296'
}

export const SecretKeys = {
    tokenName : "userId"
}