import { message } from 'antd';
import Axios from 'axios';
import { Conf } from '../config';
import { Util } from '../utils/utils';
import { CompanyRegisterForm } from '../models/models'

export default class CompanySvc {

    public static createCompany(companyRegForm: CompanyRegisterForm, callbk: Function) {
        Axios.post(`${Conf.API_URL}/company`, companyRegForm)
            .then((response) => {
                callbk(response)
            })
            .catch(function (error) {
                message.destroy()
                message.error(Util.isSet(() => error.response.data.error, "Error registering company!"), 4);
            });
    }

}