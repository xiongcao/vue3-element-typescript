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
                        return (pagination.current - 1) * pagination.pageSize + index + 1;
                    }"
                    width="80">
                </el-table-column>

                <el-table-column
                    label="名称"
                    prop="name">
                </el-table-column>

                <el-table-column
                    label="位置"
                    prop="positionId">
                    <!-- <template #default="{row}">
                        <el-tag v-if="row.status === 1" type="success">开启</el-tag>
                        <el-tag v-else type="warning">关闭</el-tag>                            
                    </template> -->
                </el-table-column>

                <el-table-column
                    label="简介"
                    prop="sub">
                </el-table-column>

                <el-table-column
                    label="链接"
                    prop="url"
                    min-width="150">
                </el-table-column>

                <el-table-column
                    label="排序"
                    prop="rank">
                </el-table-column>

                <el-table-column
                    label="状态"
                    prop="rank">
                    <template #default="{row}">
                        <el-tag v-if="row.status === 1" type="success">开启</el-tag>
                        <el-tag v-else type="warning">关闭</el-tag>                            
                    </template>
                </el-table-column>

                <el-table-column
                    label="备注"
                    prop="remark">
                </el-table-column>

                <el-table-column
                    label="时间"
                    prop="lastModifiedDate"
                    min-width="150">
                </el-table-column>

                <el-table-column
                    label="操作"
                    prop="action"
                    width="150"
                    fixed="right">
                    <template #default="{row}">
                        <el-button type="text" @click="() => detailUpdateData(row.id)" :loading="detailUpdateLoading.includes(row.id)">编辑</el-button>
                        <el-button type="text"  @click="() => deleteTableData(row.id)" :loading="deleteLoading.includes(row.id)">删除</el-button>                         
                    </template>
                </el-table-column>
            </el-table>

        </el-card>

        <create-form 
            :visible="createFormVisible" 
            :onCancel="() => setCreateFormVisible(false)" 
            :onSubmitLoading="createSubmitLoading" 
            :onSubmit="createSubmit"
        />

        <update-form
            v-if="updateFormVisible===true"
            :visible="updateFormVisible"
            :values="updateData"
            :onCancel="() => updataFormCancel()"
            :onSubmitLoading="updateSubmitLoading"
            :onSubmit="updateSubmit"
        />

        <search-drawer
            :visible="searchDrawerVisible" 
            :onClose="() => searchDrawerClose()"
            :onSubmit="searchDrawerSubmit"
        />
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { ElMessageBox, ElMessage } from "element-plus";
import CreateForm from './components/CreateForm.vue';
import UpdateForm from './components/UpdateForm.vue';
import SearchDrawer from './components/SearchDrawer.vue';
import { StateType as ListStateType } from "./store";
import { PaginationConfig, TableListItem } from './data.d';

interface ListHighlyAdaptiveTablePageSetupData {
    list: TableListItem[];
    pagination: PaginationConfig;
    loading: boolean;
    getList:  (current: number) => Promise<void>;
    createFormVisible: boolean;
    setCreateFormVisible:  (val: boolean) => void;
    createSubmitLoading: boolean;
    createSubmit: (values: Omit<TableListItem, 'id'>, resetFields: () => void) => Promise<void>;
    detailUpdateLoading: number[];
    detailUpdateData: (id: number) => Promise<void>;
    updateData: Partial<TableListItem>;
    updateFormVisible: boolean;
    updataFormCancel:  () => void;
    updateSubmitLoading: boolean;
    updateSubmit:  (values: TableListItem, resetFields: () => void) => Promise<void>;
    deleteLoading: number[];
    deleteTableData:  (id: number) => void;
    tabVal: string;
    searchVal: string;
    searchDrawerVisible: boolean;
    searchDrawerClose: () => void;
    searchDrawerSubmit: (values: Omit<TableListItem, 'id'>) => Promise<void>;
}

export default defineComponent({
    name: 'AdvertList',
    components: {
        CreateForm,
        UpdateForm,
        SearchDrawer
    },
    setup(): ListHighlyAdaptiveTablePageSetupData {

        const store = useStore<{ AdvertList: ListStateType}>();


        // 列表数据
        const list = computed<TableListItem[]>(() => store.state.AdvertList.tableData.list);

        // 列表分页
        const pagination = computed<PaginationConfig>(() => store.state.AdvertList.tableData.pagination);

        // 获取数据
        const loading = ref<boolean>(true);
        const getList = async (current: number): Promise<void> => {
            loading.value = true;
            await store.dispatch('AdvertList/queryTableData');
            loading.value = false;
        }


        // 新增弹框 - visible
        const createFormVisible = ref<boolean>(false);
        const setCreateFormVisible = (val: boolean) => {
            createFormVisible.value = val;
        };
        // 新增弹框 - 提交 loading
        const createSubmitLoading = ref<boolean>(false);
        // 新增弹框 - 提交
        const createSubmit = async (values: Omit<TableListItem, 'id'>, resetFields: () => void) => {
            createSubmitLoading.value = true;
            const res: boolean = await store.dispatch('AdvertList/createTableData',values);
            if(res === true) {
                resetFields();
                setCreateFormVisible(false);
                ElMessage.success('新增成功！');
                getList(1);
            }
            createSubmitLoading.value = false;
        }


        // 编辑弹框 - visible
        const updateFormVisible = ref<boolean>(false);
        const setUpdateFormVisible = (val: boolean) => {
            updateFormVisible.value = val;
        }
        const updataFormCancel = () => {
            setUpdateFormVisible(false);
            store.commit('AdvertList/setUpdateData',{});
        }
        // 编辑弹框 - 提交 loading
        const updateSubmitLoading = ref<boolean>(false);
        // 编辑弹框 - 提交
        const updateSubmit = async (values: TableListItem, resetFields: () => void) => {
            updateSubmitLoading.value = true;
            const res: boolean = await store.dispatch('AdvertList/updateTableData',values);
            if(res === true) {
                updataFormCancel();                
                ElMessage.success('编辑成功！');
                getList(pagination.value.current);
            }
            updateSubmitLoading.value = false;
        }

        // 编辑弹框 data
        const updateData = computed<Partial<TableListItem>>(() => store.state.AdvertList.updateData);
        const detailUpdateLoading = ref<number[]>([]);
        const detailUpdateData = async (id: number) => {
            detailUpdateLoading.value = [id];
            const res: boolean = await store.dispatch('AdvertList/queryUpdateData',id);
            if(res===true) {
                setUpdateFormVisible(true);
            }
            detailUpdateLoading.value = [];
        }


        // 删除 loading
        const deleteLoading = ref<number[]>([]);
        // 删除
        const deleteTableData = (id: number) => {

            ElMessageBox.confirm('确定删除吗？', '删除',{
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(async () => {
                deleteLoading.value = [id];
                const res: boolean = await store.dispatch('AdvertList/deleteTableData',id);
                if (res === true) {
                    ElMessage.success('删除成功！');
                    getList(pagination.value.current);
                }
                deleteLoading.value = [];
            }).catch((error: any) =>{
                console.log(error)
            });

        }

        const tabVal = ref<string>('all');
        const searchVal = ref<string>('');

        // 搜索
        const searchDrawerVisible = ref<boolean>(false);
        const searchDrawerClose = () => {
            searchDrawerVisible.value = false;
        }
        const searchDrawerSubmit = async (values: Omit<TableListItem, 'id'>) => {
            console.log('search', values);
            ElMessage.success('进行了搜索！');
            searchDrawerClose();
        }


        onMounted(()=> {
           getList(1);
        })

        return {
            list: list as any as TableListItem[],
            pagination: pagination as any as PaginationConfig,
            loading: loading as any as boolean,
            getList,
            createFormVisible: createFormVisible as any as boolean,
            setCreateFormVisible,
            createSubmitLoading: createSubmitLoading as any as boolean,
            createSubmit,
            detailUpdateLoading: detailUpdateLoading as any as number[],
            detailUpdateData,
            updateData: updateData as Partial<TableListItem>,
            updateFormVisible: updateFormVisible as any as boolean,
            updataFormCancel,
            updateSubmitLoading: updateSubmitLoading as any as boolean,
            updateSubmit,
            deleteLoading: deleteLoading as any as number[],
            deleteTableData,
            tabVal: tabVal as any as string,
            searchVal: searchVal as any as string,
            searchDrawerVisible: searchDrawerVisible as any as boolean,
            searchDrawerClose,
            searchDrawerSubmit
        }

    }
})
</script>