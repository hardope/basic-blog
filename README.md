# Description

Technical Test for Backend Engineer Position

## Installation

Before running the application, you need to set up your environment variables. Create a .env file at the root of your project and add the following environment variables:

```.env
  JWT_SECRET=sample_jwt_secret
  DB_HOST=localhost
  DB_USER=postgres_user_username
  DB_PASSWORD=postgres_user_password
  DB_NAME=postgres_database_name
```

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


