import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute: any = ({ component: Component, auth, ...rest }: any) => {
    // const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

    // useEffect(() => {
    //     if (loading || isAuthenticated) {
    //         return;
    //     }
    //     const fn = async () => {
    //         await loginWithRedirect({
    //             appState: { targetUrl: path },
    //         });
    //     };
    //     fn();
    // }, [loading, isAuthenticated, loginWithRedirect, path]);
    console.log("Here boy", auth)
    const render = (props: any) =>
        auth === true ? <Component {...props} /> : <Redirect to='/login' />;

    return <Route render={render} {...rest} />;

};

export default AuthenticatedRoute;