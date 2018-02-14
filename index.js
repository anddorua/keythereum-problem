const keythereum = require('keythereum');

const dump = {
  "address": "b2e992824142eb7c28e83fecafb995f49a95e670",
  "crypto": {
    "cipher": "aes-128-ctr",
    "ciphertext": "ff627dfd36657bacdfb0cf60a61ee7f196c86f1140b587feab09cf3cfc822622",
    "cipherparams": { "iv": "541c911b058eecd7ab270a417583a45e" },
    "mac": "d9ed1b6adc21a149f08b45c5d079771d0b4e3f65027f271bcc4afed5509cb5d5",
    "kdf": "pbkdf2",
    "kdfparams": {
      "c": 262144,
      "dklen": 32,
      "prf": "hmac-sha256",
      "salt": "67443d0ebda5e8f7594bdbcfc5c9c879e6200c044801adca85ebb8dc741d0acc"
    }
  },
  "id": "9c9c2419-e91d-4c8f-ad3f-d423799e1ca3",
  "version": 3
};

const rightPassword = 'rightkey';

const recoverPromised = (password, dump) => {
  return new Promise((resolve, reject) => {
    try {
      keythereum.recover(password, dump, resolve);  
    } catch (error) {
      reject(error);
    }
  })
};

recoverPromised(rightPassword, dump)
  .then(pk => console.log('With right password key deciphers fine, it is ', pk.toString('hex')))
  .then(() => recoverPromised('wrongPassword', dump))
  .then(() => console.log('This line should not be printed'))
  .catch(err => console.log('This line should be printed, but it wont', err));
