import request from '@/utils/request';
import { LoginParamsType } from './data.d';

export async function accountLogin(params: LoginParamsType): Promise<any> {
    console.log(params)
    return request({
        url: '/admin/signIn',
        method: 'GET',
        params,
    });
}