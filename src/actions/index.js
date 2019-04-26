import { generateAuthActions } from 'redux-token-auth'


//may change based on the api
const config = {
  authUrl: 'http://localhost:3000/api/auth',
  userAttributes: {
    data: 'data',
  },
  userRegistrationAttributes: {
    firstName: 'first_name'
  },
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export{
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}
