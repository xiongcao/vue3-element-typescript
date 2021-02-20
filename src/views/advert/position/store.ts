import { Mutation, Action } from 'vuex';
import { StoreModuleType } from "@/utils/store";
import { ResponseData } from '@/utils/request';
import { TableDataType, TableListItem } from './data';
import {
  queryAdvertPositionList,
  createData,
} from './service';


export interface StateType {
    isEdit: boolean;
    tableData: TableDataType;
    updateData: Partial<TableListItem>;
}

export interface ModuleType extends StoreModuleType<StateType> {
    state: StateType;
    mutations: {
        setIsEdit: Mutation<StateType>;
        setTableData: Mutation<StateType>;
        setUpdateData: Mutation<StateType>;
    };
    actions: {
        queryTableData: Action<StateType, StateType>;
        createTableData: Action<StateType, StateType>;
    };
}
const initState: StateType = {
    isEdit: false,
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
    updateData: {},
};

const StoreModel: ModuleType = {
    namespaced: true,
    name: 'AdvertPosition',
    state: {
        ...initState
    },
    mutations: {
        setIsEdit(state, payload) {
            state.isEdit = payload;
        },
        setTableData(state, payload) {
            state.tableData = payload;
        },
        setUpdateData(state, payload) {
            state.updateData = payload;
        },
    },
    actions: {
        async queryTableData({ commit } ) {
            try {
                const response: ResponseData = await queryAdvertPositionList();
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
        async createTableData({ commit }, payload: Pick<TableListItem, "name" | "sub" | "status"> ) {
            try {
                await createData(payload);
                return true;
            } catch (error) {
                return false;
            }
        }
    }
};

export default StoreModel;
