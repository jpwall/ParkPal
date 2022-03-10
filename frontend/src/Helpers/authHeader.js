// Very helpful guide for login management using JWTs: https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example
import { authenticationService } from './authentication.service.js';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
}