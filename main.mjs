import Amplify, { Auth } from 'aws-amplify';
import awsConfig from './aws-exports.mjs';
import { signIn, refreshToken } from './authService.mjs';

Amplify.default.configure(awsConfig);

async function testTokenRefresh() {
    const username = '+916000189710';
    const password = 'Amway@123';

    await signIn(username, password);

    // Simulate periodic token refresh
    setInterval(async () => {
        await refreshToken();
    }, 1 * 30 * 1000); // Refresh every 5 minutes for testing
}

testTokenRefresh();
