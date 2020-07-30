import React from 'react';
import './settings.css';
import { Button, message } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import UserSvc from '../../../../services/user-svc';


function Settings(props: any) {
    console.log("set", props)

    return (
        <div>
            <Button
                type="primary"
                icon={<PoweroffOutlined />}
                onClick={() => UserSvc.logOut((res: any) => {
                    message.info("User logged out!", 5)
                })}
            >
                Log out
        </Button>
        </div>
    );
}

export default Settings;
