import { message } from 'antd';
import Axios from 'axios';
import { Conf } from '../config';
import { Util } from '../utils/utils';
import { LoginFormSubmit, UserRegisterForm } from '../models/models'

export default class UserSvc {

    public static logIn(userDetails: LoginFormSubmit, callbk: Function) {
        console.log("userDe", userDetails)

        Axios.post(`${Conf.API_URL}/signin`, userDetails)
            .then((response) => {
                localStorage.setItem("access_token", response.data.access_token);
                localStorage.setItem("refresh_token", response.data.refresh_token);
                callbk(userDetails)
            })
            .catch(function (error) {
                message.destroy()
                message.error(Util.isSet(() => error.response.data.error, "Error logging in user!"), 4);
            });
    }

    public static register(userRegisterDetails: UserRegisterForm, callbk: Function) {
        Axios.post(`${Conf.API_URL}/signup`, userRegisterDetails)
            .then((response) => {
                callbk(response)
            })
            .catch(function (error) {
                message.destroy()
                message.error(Util.isSet(() => error.response.data.error, "Error registering user!"), 4);
            });
    }

    public static logOut(callbk: Function) {
        Axios.post(`${Conf.API_URL}/signout`)
            .then((response) => {
                callbk(response)
            })
            .catch(function (error) {
                message.destroy()
                message.error(Util.isSet(() => error.response.data.error, "Error logging in user!"), 4);
            });
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }

    public static getUserDetails() {
        Axios.get(`${Conf.API_URL}/userDetails`)
            .then((response) => {
                console.log(" response", response);
            })
            .catch(function (error) {
                message.destroy()
                message.error(Util.isSet(() => error.response.data.error, "Error logging in user!"), 4);
            });
    }
}