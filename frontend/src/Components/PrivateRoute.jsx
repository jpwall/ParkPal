import React from 'react';
import { Navigate } from 'react-router-dom';

import { authenticationService } from '../Helpers/authentication.service';

function PrivateRoute({ children }) {
    const currentUser = authenticationService.currentUserValue;
    return currentUser ? children : <Navigate to="/signup" />
}

export default PrivateRoute;