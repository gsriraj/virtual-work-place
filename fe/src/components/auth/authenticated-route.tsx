import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context'

const AuthenticatedRoute: any = ({ component: Component, auth, ...rest }: any) => {

    const { isAuthenticated, dispatch } = useContext(AuthContext)


    const render = (props: any) =>
        isAuthenticated === true ? <Component {...props} /> : <Redirect to='/login' />;

    return <Route {...rest} render={render} />;

};

export default AuthenticatedRoute;