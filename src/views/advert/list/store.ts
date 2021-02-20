import { Mutation, Action } from 'vuex';
import { StoreModuleType } from "@/utils/store";
import { ResponseData } from '@/utils/request';
import { TableDataType, TableListItem } from './data.d';

import {
  queryAdvertList,
  removeData,
  updateStatusData
} from './service';


export interface StateType {
    tableData: TableDataType;
}

export interface ModuleType extends StoreModuleType<StateType> {
    state: StateType;
    mutations: {
        setTableData: Mutation<StateType>;
    };
    actions: {
        queryTableData: Action<StateType, StateType>;
        deleteTableData: Action<StateType, StateType>;
        updateRowStatus: Action<StateType, StateType>;
    };
}
const initState: StateType = {
    tableData: {
      list: []
    }
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
        }
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
        async deleteTableData({ commit }, payload: number ) {
            try {
                await removeData(payload);
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
        }
    }
};

export default StoreModel;
