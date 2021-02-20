import { Mutation, Action } from 'vuex';
import { StoreModuleType } from "@/utils/store";
import { ResponseData } from '@/utils/request';
import { TableDataType, TableListItem } from './data.d';
import { TableListItem as AdvertPositionItem } from '../position/data.d'

import {
  queryAdvertList,
  removeData,
  createData,
  detailData,
  updateData,
  updateStatusData
} from './service';

import { queryAdvertPositionList } from  '../position/service'


export interface StateType {
    tableData: TableDataType;
    advertPositionList: AdvertPositionItem[];
    updateData: Partial<TableListItem>;
}

export interface ModuleType extends StoreModuleType<StateType> {
    state: StateType;
    mutations: {
        setTableData: Mutation<StateType>;
        setUpdateData: Mutation<StateType>;
        setadvertPositionData: Mutation<StateType>;
    };
    actions: {
        queryTableData: Action<StateType, StateType>;
        deleteTableData: Action<StateType, StateType>;
        createTableData: Action<StateType, StateType>;
        queryUpdateData: Action<StateType, StateType>;
        updateTableData: Action<StateType, StateType>;
        queryAdvertPositionData: Action<StateType, StateType>;
        updateRowStatus: Action<StateType, StateType>;
    };
}
const initState: StateType = {
    tableData: {
      list: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
      },
    },
    advertPositionList: [],
    updateData: {},
};

const StoreModel: ModuleType = {
    namespaced: true,
    name: 'AdvertList',
    state: {
        ...initState
    },
    mutations: {
        setTableData(state, payload) {
            state.tableData = payload;
        },
        setUpdateData(state, payload) {
            state.updateData = payload;
        },
        setadvertPositionData(state, payload) {
            state.advertPositionList = payload;
        },
    },
    actions: {
        async queryTableData({ commit } ) {
            try {
                const response: ResponseData = await queryAdvertList();
                const { data } = response;
                commit('setTableData',{
                    ...initState.tableData,
                    list: data || []
                });
                return true;
            } catch (error) {
                return false;
            }
        },
        async queryAdvertPositionData({ commit } ) {
            try {
                const response: ResponseData = await queryAdvertPositionList();
                const { data } = response;
                commit('setadvertPositionData',{
                    ...initState.tableData,
                    advertPositionList: data || []
                });
                return true;
            } catch (error) {
                return false;
            }
        },
        async deleteTableData({ commit }, payload: number ) {
            try {
                await removeData(payload);
                return true;
            } catch (error) {
                return false;
            }
        },
        async createTableData({ commit }, payload: Pick<TableListItem, "name" | "status"> ) {
            try {
                await createData(payload);
                return true;
            } catch (error) {
                return false;
            }
        },
        async queryUpdateData({ commit }, payload: number ) {
            try {
                const response: ResponseData = await detailData(payload);
                const { data } = response;
                commit('setUpdateData',{
                    ...initState.updateData,
                    ...data,
                });
                return true;
            } catch (error) {
                return false;
            }
        },
        async updateRowStatus({ commit }, payload: TableListItem ) {
            try {
                const { id, status } = payload;
                await updateStatusData(id, status);
                return true;
            } catch (error) {
                return false;
            }
        },
        async updateTableData({ commit }, payload: TableListItem ) {
            try {
                const { id, ...params } = payload;
                await updateData(id, { ...params });
                return true;
            } catch (error) {
                return false;
            }
        },        
    }
};

export default StoreModel;
