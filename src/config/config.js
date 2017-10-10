const IP = process.env.IP;

const variables = {
  development: {
    devBox: true,
    authService: `http://${IP}:10000`,
    userService: `http://${IP}:10010`,
    storageService: `http://${IP}:8081`,
    externalService: `http://${IP}:10020`,
    reduxBrowserPlugin: true,
  },
  staging: {
    devBox: false,
    authService: 'http://seedlifystage-auth.us-east-1.elasticbeanstalk.com',
    userService: 'http://seedlifystage-users.us-east-1.elasticbeanstalk.com',
    storageService: 'http://seedlifystage-storage.us-east-1.elasticbeanstalk.com',
    externalService: 'http://seedlifystage-external.us-east-1.elasticbeanstalk.com',
    reduxBrowserPlugin: true,
  },
  production: {
    devBox: false,
    authService: 'http://seedlifyprod-auth.us-east-1.elasticbeanstalk.com',
    userService: 'http://seedlifyprod-users.us-east-1.elasticbeanstalk.com',
    storageService: 'http://seedlifyprod-storage.us-east-1.elasticbeanstalk.com',
    externalService: 'http://seedlifyprod-external.us-east-1.elasticbeanstalk.com',
    reduxBrowserPlugin: false,
  },
};


export const currentEnv = process.env.NODE_ENV;
export const credentials = {
  passwordSalt: '1mj012QtOcVQq8qmQLVfe',
  api_name: 'seedlify_front_end',
  api_key: 'gH4QeU7H',
  jwt_header: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.',
};
export const eSignAgreementUrl = 'https://www.esigngenie.com/esign/embedded/embeddedsign?eetid=';
export const {
  devBox, reduxBrowserPlugin, userService, storageService, externalService, authService,
} = variables[currentEnv];

