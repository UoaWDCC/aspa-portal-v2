// Script to get the token from firebase
// import dotenv from "dotenv";
const dotenv = require('dotenv');
const conf = dotenv.config();
if (conf.error) {
  throw conf.error;
}

var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

const email = process.env.SCRIPT_EMAIL;
const password = process.env.SCRIPT_PASSWORD;
const firebaseApiKey = process.env.FIREBASE_API_KEY;

var raw = JSON.stringify({
  email,
  password,
  returnSecureToken: true,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch(
  `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${firebaseApiKey}`,
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
