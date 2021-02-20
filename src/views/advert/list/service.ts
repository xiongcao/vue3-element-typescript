import request from '@/utils/request';
import { TableListItem } from './data.d';

export async function queryAdvertList(): Promise<any> {
  return request({
    url: '/ads/admin/ads',
    method: 'get'
  });
}

export async function queryAdvertPosition(): Promise<any> {
  return request({
    url: '/ads/admin/adsPosition',
    method: 'get'
  });
}

export async function createData(params: Omit<TableListItem, 'id'>): Promise<any> {
  return request({
    url: '/pages/list',
    method: 'POST',
    data: params,
  });
}

export async function updateData(id: number, params: Omit<TableListItem, 'id'>): Promise<any> {
  return request({
    url: `/pages/list/${id}`,
    method: 'PUT',
    data: params,
  });
}

export async function removeData(id: number): Promise<any> {
  return request({
    url: `/ads/admin/ads/delete/${id}`, 
    method: 'POST',
  });
}

export async function detailData(id: number): Promise<any> {
  return request({url: `/ads/admin/ads/${id}`});
}

export async function updateStatusData(id: number, status: number): Promise<any> {
  return request({
    url: `/ads/admin/ads/updateStatus/${id}/${status}`,
    method: 'POST'
  });
}