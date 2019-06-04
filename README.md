# Social Network API

A basic social network API that serves as a starting point for expanding it into a full-fledged social network.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

For development the following versions were used. Proper functionality can't be guaranteed for earlier versions.

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) >= 2.21.0
* [Node.js](https://nodejs.org/en/download/package-manager/) >= 12.3.1
* [npm](https://www.npmjs.com/get-npm) >= 6.9.0
* [MongoDB Community Edition](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials) >= 4.0.10

### Installing


Clone Git repository

```
git clone https://github.com/nickyvanurk/social-network-api
```

Install required npm modules

```
npm install
```

Setup local enviroment variables (Linux)

```
cd ./social-network-api && mkdir ./config && echo -e 'PORT=3000\nMONGODB_URL=mongodb://127.0.0.1:27017/social-network-api\nJWT_SECRET=thisismysecret' > ./config/dev.env && echo -e 'PORT=3000\nMONGODB_URL=mongodb://127.0.0.1:27017/social-network-api-test\nJWT_SECRET=thisismysecret' > ./config/test.env

```

Start the MongoDB database (Linux)

```
sudo service mongod start
```

Start the development environment

```
npm run dev
```

## Running the tests

Run API endpoints tests

```
npm test
```

## License

This project is licensed under the [MIT License](LICENSE).
