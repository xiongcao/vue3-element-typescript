<template>

    <div class="indexlayout-main-conent">
        <el-card shadow="never" class="cus-card">
            <template #header>
                <el-row>
                    <el-col :span="8">
                        <el-button type="primary" @click="() => setCreateFormVisible(true)">新增</el-button>
                    </el-col>
                </el-row>
            </template>
            <el-table
                row-key="id"
                :data="list"
                v-loading="loading"
            >

                <el-table-column
                    type="index"
                    label="序号"
                    :index="(index) => {
                        return index + 1;
                    }"
                    width="80">
                </el-table-column>

                <el-table-column
                    label="名称"
                    prop="name"
                    min-width="150">
                </el-table-column>

                <el-table-column
                    label="描述"
                    prop="sub"
                    min-width="150">
                </el-table-column>

                <el-table-column
                    label="状态"
                    prop="rank">
                    <template #default="{row}">
                        <el-tag v-if="row.status === 1" type="success">启用</el-tag>
                        <el-tag v-else type="warning">禁用</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    label="操作"
                    prop="action"
                    width="100">
                    <template #default="{row}">
                        <el-button type="text" @click="() => detailUpdateData(row.id)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-card>

        <create-form 
            v-if="createFormVisible"
            :visible="createFormVisible" 
            :values="updateData"
            :onCancel="() => setCreateFormVisible(false)" 
            :onSubmitLoading="createSubmitLoading" 
            :onSubmit="createSubmit"
        />
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { ElMessageBox, ElMessage } from "element-plus";
import CreateForm from './components/CreateForm.vue';
import { StateType as ListStateType } from "./store";
import { PaginationConfig, TableListItem } from './data.d';

interface ListHighlyAdaptiveTablePageSetupData {
    list: TableListItem[];
    loading: boolean;
    getList:  () => Promise<void>;
    createFormVisible: boolean;
    setCreateFormVisible:  (val: boolean) => void;
    createSubmitLoading: boolean;
    createSubmit: (values: TableListItem, resetFields: () => void) => Promise<void>;
    detailUpdateData: (id: number) => void;
    updateData: Partial<TableListItem>;
}

export default defineComponent({
    name: 'AdvertPosition',
    components: {
        CreateForm
    },
    setup(): ListHighlyAdaptiveTablePageSetupData {

        const store = useStore<{ AdvertPosition: ListStateType}>();

        // 列表数据
        const list = computed<TableListItem[]>(() => store.state.AdvertPosition.tableData.list);

        const isEdit = computed<boolean>(() => store.state.AdvertPosition.isEdit);

        // 获取数据
        const loading = ref<boolean>(true);
        const getList = async (): Promise<void> => {
            loading.value = true;
            await store.dispatch('AdvertPosition/queryTableData');
            loading.value = false;
        }


        // 新增弹框 - visible
        const createFormVisible = ref<boolean>(false);
        const setCreateFormVisible = (val: boolean) => {
            createFormVisible.value = val;
            !val && store.commit('AdvertPosition/setUpdateData', {});
        };
        // 新增弹框 - 提交 loading
        const createSubmitLoading = ref<boolean>(false);
        // 新增弹框 - 提交
        const createSubmit = async (values: TableListItem, resetFields: () => void) => {
            createSubmitLoading.value = true;
            const res: boolean = await store.dispatch('AdvertPosition/createTableData',values);
            if(res === true) {
                resetFields();
                setCreateFormVisible(false);
                ElMessage.success(isEdit.value ? '编辑成功' : '新增成功！');
                getList();
            }
            createSubmitLoading.value = false;
        }
     

        // 编辑弹框 data
        const updateData = computed<Partial<TableListItem>>(() => store.state.AdvertPosition.updateData);
        const detailUpdateData = (id: number) => {
            let payload = {};
            list.value.forEach(item => {
                if(id === item.id) {
                    payload = Object.assign({}, item);
                }
            });
            store.commit('AdvertPosition/setIsEdit', true);
            store.commit('AdvertPosition/setUpdateData', payload)
            setCreateFormVisible(true);
        }

        onMounted(()=> {
           getList();
        })

        return {
            list: list as any as TableListItem[],
            loading: loading as any as boolean,
            getList,
            createFormVisible: createFormVisible as any as boolean,
            setCreateFormVisible,
            createSubmitLoading: createSubmitLoading as any as boolean,
            createSubmit,
            detailUpdateData,
            updateData: updateData as Partial<TableListItem>
        }

    }
})
</script>