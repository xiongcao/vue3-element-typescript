<template>

    <div class="indexlayout-main-conent">
        <el-card shadow="never" class="cus-card">
            <template #header>
                <el-row>
                    <el-col :span="8">
                        <el-button type="primary">新增</el-button>
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
                    prop="name">
                </el-table-column>

                <el-table-column
                    label="位置"
                    prop="positionId">
                    <template #default="{row}">
                        <advert-position
                            :positionId="row.positionId"/>
                    </template>
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
                        <el-popover
                            placement="top"
                            :width="200"
                            trigger="hover"
                        >
                        <p>确定修改为{{row.status === 1 ? '"关闭"' : '"开启"' }}吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text">取消</el-button>
                            <el-button type="primary" size="mini" @click="() => handleUpdateStatus(row.id, row.status === 1 ? 0 : 1)">确定</el-button>
                        </div>
                         <template #reference>
                            <el-tag v-if="row.status === 1" type="success">开启</el-tag>
                            <el-tag v-else type="warning">关闭</el-tag>                            
                         </template>
                        </el-popover>
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
                        <el-button type="text">编辑</el-button>
                        <el-button type="text"  @click="() => deleteTableData(row.id)" :loading="deleteLoading.includes(row.id)">删除</el-button>                         
                    </template>
                </el-table-column>
            </el-table>

        </el-card>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { ElMessageBox, ElMessage } from "element-plus";
import { StateType as ListStateType } from "./store";
import { PaginationConfig, TableListItem } from './data.d';
import AdvertPosition from './components/AdvertPosition.vue'

interface ListHighlyAdaptiveTablePageSetupData {
    list: TableListItem[];
    loading: boolean;
    getList: () => Promise<void>;
    deleteLoading: number[];
    deleteTableData:  (id: number) => void;
    handleUpdateStatus: (id: number, status: number) => void;
}

export default defineComponent({
    name: 'AdvertList',
    components: {
        AdvertPosition
    },
    setup(): ListHighlyAdaptiveTablePageSetupData {

        const store = useStore<{ AdvertList: ListStateType}>();

        // 列表数据
        const list = computed<TableListItem[]>(() => store.state.AdvertList.tableData.list);

        // 获取数据
        const loading = ref<boolean>(true);
        const getList = async (): Promise<void> => {
            loading.value = true;
            await store.dispatch('AdvertList/queryTableData');
            loading.value = false;
        }

        const handleUpdateStatus = async (id: number, status: number) => {
            const res: boolean = await store.dispatch('AdvertList/updateRowStatus',{ id, status});
            if (res === true) {
                ElMessage.success('修改成功！');
                getList();
            }
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
                    getList();
                }
                deleteLoading.value = [];
            }).catch((error: any) =>{
                console.log(error)
            });

        }

        // 获取广告位置列表数据
        const getAdvertPositionList = async (): Promise<void> => {
            await store.dispatch('AdvertPosition/queryTableData');
        }

        onMounted(()=> {
            getList();
            getAdvertPositionList();
        })

        return {
            list: list as any as TableListItem[],
            loading: loading as any as boolean,
            getList,
            deleteLoading: deleteLoading as any as number[],
            deleteTableData,
            handleUpdateStatus
        }

    }
})
</script>