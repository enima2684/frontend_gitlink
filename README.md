# GITLINK - REACT NATIVE FRONT END

### Environement variables
To run the app, you need to provide a `.env.js` configuration file.
This file is gitignored.

Here is an example of it:
```javascript

export const env = {
  BACKEND_URL  : 'http://10.244.0.222:8700',
  CLIENT_ID    : 'dummyqsknjsh',
  CLIENT_SECRET: 'dummynkjqsdfisbdhnqjkhbf'
};
```


| Variable  | Description  |
|-----------|--------------|
| BACKEND_URL  |   Url to the backend for all the http requests  |
| CLIENT_ID | Client id of the github Oauth |
| CLIENT_SECRET | secret ket for the client |
