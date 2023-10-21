## Description

Home Task - User management app 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# run the app
$ npm run start-with-db

```
After you run the app, you can test the api on http://localhost:3000/api

The app is with very simple auth example , on real app we wll use a real auth checking (db,third party);

The protected routes are : POST/PUT/DELETE

You get access token by sending POST message to http://localhost:3000/users/auth/login  req body:  {email: 'admin', password: 'admin'}

