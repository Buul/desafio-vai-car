global.fetch = require('node-fetch');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const Aws = require('aws-sdk');
const appConfig = require('../config');

Aws.config.update({
  accessKeyId: appConfig.data.accessKeyId,
  secretAccessKey: appConfig.data.secretAccessKey,
  region: appConfig.data.region,
});
const response = {
  authenticated: false,
  jwtToken: '',
  idToken: '',
  userEmail: '',
  userName: '',
  grupo: '',
  confirmPassword: false,
  passwordReminder: false,
  Error: {
    code: 0,
    desc: [],
  },
  newPass: false,
  name: '',
  newpassword: '',
};

module.exports = {
  authenticateUser(userName, password, changePass = false) {
    const authenticationData = {
      Username: userName,
      Password: password,
    };
    const poolData = {
      UserPoolId: appConfig.data.UserPoolId,
      ClientId: appConfig.data.ClientId,
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const userData = {
      Username: userName,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    return new Promise((fulfill, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess(result) {
          response.Error.code = 0;
          response.authenticated = true;
          response.jwtToken = result.getAccessToken().getJwtToken();
          response.idToken = result.idToken.jwtToken;
          response.userName = userName;
          fulfill(response);
        },
        newPasswordRequired(userAttributes) {
          delete userAttributes.email_verified; // eslint-disable-line no-param-reassign
          delete userAttributes.phone_number_verified; // eslint-disable-line no-param-reassign

          // cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
          response.Error.code = 0;
          response.authenticated = false;
          response.newPass = true;
          response.userAttributes = userAttributes;
          response.userName = userName;
          fulfill(response);
        },
        onFailure(err) {
          response.Error.desc = [];
          switch (err.message) {
            case 'User is disabled':
              response.Error.desc.push('Usuário desabilitado');
              break;
            case 'User does not exist.':
              response.Error.desc.push('Email ou Senha inválidos');
              break;
            case 'Incorrect username or password.':
              if (changePass) {
                response.Error.desc.push('Senha atual inválida');
              } else {
                response.Error.desc.push('Email ou Senha inválidos');
              }
              break;
            default:
              response.Error.desc.push('Erro ao realizar o login');
              break;
          }
          response.authenticated = false;
          response.Error.code = err.code;
          reject(response);
        },
      });
    });
  },

  newPass(userName, password, newPassword) {
    const authenticationData = {
      Username: userName,
      Password: password,
    };
    const poolData = {
      UserPoolId: appConfig.data.UserPoolId,
      ClientId: appConfig.data.ClientId,
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const userData = {
      Username: userName,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    return new Promise((fulfill, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess(result) {
          response.Error.code = 0;
          response.authenticated = true;
          response.jwtToken = result.getAccessToken().getJwtToken();
          response.idToken = result.idToken.jwtToken;
          response.userName = userName;
          fulfill(response);
        },
        newPasswordRequired(userAttributes) {
          delete userAttributes.email_verified; // eslint-disable-line no-param-reassign
          delete userAttributes.phone_number_verified; // eslint-disable-line no-param-reassign
          // userAttributes.name = nome;// eslint-disable-line no-param-reassign
          cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
        },
        onFailure(err) {
          response.Error.desc = [];
          response.authenticated = false;
          response.Error.code = err.code;
          response.Error.desc.push('  POLÍTICAS DE SENHA: ');
          response.Error.desc.push('- Mínimo de 8 caracteres');
          response.Error.desc.push('- Número');
          response.Error.desc.push('- Caractere especial');
          response.Error.desc.push('- Letra maiúsculas');
          response.Error.desc.push('- Letra minúscula');
          reject(response);
        },
      });
    });
  },

  signUp(username, password) {
    const poolData = {
      UserPoolId: appConfig.data.UserPoolId,
      ClientId: appConfig.data.ClientId,
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const attributeList = [];

    const dataEmail = {
      Name: 'email',
      Value: username,
    };
    const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    return new Promise((fulfill, reject) => {
      userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
          response.Error.desc = err;
          response.Error.code = err.code;
          reject(response);
          return;
        }
        response.Error.code = 0;
        response.data = result;
        fulfill(response);
      });
    });
  },

  confirmRegistration(userName, verificationCode) {
    const poolData = {
      UserPoolId: appConfig.data.UserPoolId,
      ClientId: appConfig.data.ClientId,
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const userData = {
      Username: userName,
      Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    return new Promise((fulfill, reject) => {
      cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        response.Error.code = 0;
        response.data = result;
        fulfill(response);
      });
    });
  },
};
