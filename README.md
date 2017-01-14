# Webpack RAML Generator

Generator using [raml-javascript-generator](https://github.com/danigulyas/webpack-raml-generator) to create callable client API's from RAML files.

### SYNOPSIS

```bash
npm i --save-dev danigulyas/webpack-raml-generator
```

By adding it as a module loader it'll automatically generate a javascript client class from the raml file and include it in the source.

`webpack.config.js`:
```javascript
{
  module: {
    loaders: [
	  {
        test: /\.raml$/,
        loader: 'webpack-raml-generator'
      }
	]
  }
}
```

`schema/friends.raml`:
```raml
#%RAML 1.0
---
title: Friends APIB
version: v1
baseUri: https://api.fakeforever.com

securitySchemes:
  - oauth_2_0:
      type: OAuth 2.0

/friend:
  get:
  post:
  /{byId}:
    get:
  /magic{name}some{type}:
    get:
```

By requireing the raml file we'll get a client.

`api.js`:
```javascript
const BASE_URI = 'http://api.friends.com'; 
const Friends  = require('./schema/friends.raml');

const api = new Friends({ baseUri: BASE_URI });
api.friend.get()
  .then(({body: body, status: status}) => console.log(status, body));
  
api.friend.byId({ byId: 3 }).get().then(cb); 
```


#### OAuth 2 example

`api.js`:
```javascript
const Friends  = require('./schema/friends.raml');
const auth = Friends.Security.oauth2_0({
  clientId: '123',
  clientSecret: 'abc',
  redirectUri: 'http://friends.com/auth/callback'
});

api = new Friends({ user: oauth.createToken('tokenhere', null, 'Bearer') });
```
