import request from '@/utils/request';
import { TableListItem } from './data';

export async function queryAdvertList(): Promise<any> {
  return request({
    url: '/ads/admin/adsPosition',
    method: 'get'
  });
}

export async function createData(params: Omit<TableListItem, 'id'>): Promise<any> {
  return request({
    url: '/ads/admin/adsPosition',
    method: 'POST',
    data: params,
  });
}
