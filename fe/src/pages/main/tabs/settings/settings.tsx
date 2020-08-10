import React, { useContext } from 'react';
import './settings.css';
import { Button, message } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import UserSvc from '../../../../services/user-svc';
import { AuthContext } from '../../../../context/auth-context'


function Settings(props: any) {
    const { history } = props
    const { isAuthenticated, dispatch } = useContext(AuthContext)
    console.log("set", isAuthenticated)

    return (
        <div>
            <Button
                type="primary"
                icon={<PoweroffOutlined />}
                onClick={() => {
                    UserSvc.logOut((res: any) => {
                        message.info("User logged out!", 5)
                    })
                    dispatch({ type: "Logout" })
                    history.push("/login")
                }}
            >
                Log out
        </Button>
        </div>
    );
}

export default Settings;
