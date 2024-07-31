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
