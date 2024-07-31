# Node.js Application for Cognito Token Management

## Overview

This Node.js application demonstrates how to manage AWS Cognito tokens, specifically focusing on signing in a user and periodically refreshing the authentication tokens. This is crucial for maintaining user sessions without requiring frequent re-authentication. The application is built using the `aws-amplify` library and is configured to work with Node.js v22.3.0.

## Setup and Configuration

### Project Structure
- `main.mjs`: The main entry point of the application, responsible for signing in the user and periodically refreshing the tokens.
- `authService.mjs`: Contains functions for signing in, getting the current session, and refreshing tokens.
- `aws-exports.mjs`: AWS configuration file that exports the necessary AWS Cognito settings.

### Dependencies
Ensure that `aws-amplify` is installed in your project:
```bash
npm install aws-amplify
Configuration
aws-exports.mjs: Replace 'your-region', 'your-user-pool-id', and 'your-client-id' with your actual AWS Cognito configurations.
javascript
Copy code
const awsConfig = {
    Auth: {
        region: 'your-region',
        userPoolId: 'your-user-pool-id',
        userPoolWebClientId: 'your-client-id',
    }
};

export default awsConfig;
Code Explanation
main.mjs
Configures AWS Amplify with the specified Cognito settings. Implements a testTokenRefresh function that signs in the user and sets up a periodic token refresh mechanism.

javascript
Copy code
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports.mjs';
import { signIn, refreshToken } from './authService.mjs';

Amplify.configure(awsConfig);

async function testTokenRefresh() {
    const username = 'testuser';
    const password = 'password';

    await signIn(username, password);

    // Simulate periodic token refresh
    setInterval(async () => {
        await refreshToken();
    }, 5 * 60 * 1000); // Refresh every 5 minutes for testing
}

testTokenRefresh();
authService.mjs
Contains the following functions:

signIn: Handles user sign-in using AWS Amplify’s Auth.signIn method.
getCurrentSession: Fetches the current session using Auth.currentSession.
refreshToken: Refreshes the session tokens using the currentAuthenticatedUser method and refreshSession method.
javascript
Copy code
import { Auth } from 'aws-amplify';

async function signIn(username, password) {
    try {
        const user = await Auth.signIn(username, password);
        console.log('Sign in successful:', user);
        return user;
    } catch (error) {
        console.error('Error signing in:', error);
    }
}

async function getCurrentSession() {
    try {
        const session = await Auth.currentSession();
        console.log('Current session:', session);
        return session;
    } catch (error) {
        console.error('Error getting current session:', error);
    }
}

async function refreshToken() {
    try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const currentSession = cognitoUser.signInUserSession;

        cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
            if (err) {
                console.error('Error refreshing token:', err);
            } else {
                console.log('Tokens refreshed:', session);
            }
        });
    } catch (error) {
        console.error('Error refreshing token:', error);
    }
}

export { signIn, refreshToken };
aws-exports.mjs
javascript
Copy code
const awsConfig = {
    Auth: {
        region: 'your-region',
        userPoolId: 'your-user-pool-id',
        userPoolWebClientId: 'your-client-id',
    }
};

export default awsConfig;
Running the Application
Install dependencies:
Ensure aws-amplify is installed:

bash
Copy code
npm install aws-amplify
Execute the application:
Run the main script:

bash
Copy code
node main.mjs
This setup ensures that the user tokens are periodically refreshed, maintaining the user's session and avoiding the need for frequent re-authentication. This is particularly useful in applications where user sessions need to be preserved over extended periods.

Conclusion
By integrating AWS Amplify with Node.js and using AWS Cognito, this solution provides a robust method for managing user authentication sessions. The periodic token refresh mechanism ensures that user sessions remain active, improving the user experience in applications requiring persistent logins.

css
