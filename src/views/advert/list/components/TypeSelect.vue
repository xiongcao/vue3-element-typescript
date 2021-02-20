<template>
    <el-select v-model="value" clearable>
        <!-- <el-option label="请选择" value="" disabled></el-option> -->
        <el-option label="头部" value="header"></el-option>
        <el-option label="底部" value="footer"></el-option>
    </el-select>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from 'vuex'
import { StateType as ListStateType } from "../../position/store";
import { TableListItem } from '../../position/data.d'

interface TypeSelectSetupData {
    value: string;
    list: TableListItem[];
}

export default defineComponent({
    name: 'TypeSelect',
    props: {
        modelValue: {
            type: String,
            default: ''
        },
    },
    setup(props, { emit }): TypeSelectSetupData {

        const store = useStore<{ AdvertPosition: ListStateType}>();

         // 广告位置数据
        const advertPositionList = computed<TableListItem[]>(() => store.state.AdvertPosition.tableData.list);

        // 数据值
        const value = computed<string>({
            get: () => props.modelValue,
            set: val => {                
                emit('update:modelValue', val || '');
            }
        });

        return {
            value: value as any as string,
            list: advertPositionList as any as TableListItem[],
        }

    }
})
</script>