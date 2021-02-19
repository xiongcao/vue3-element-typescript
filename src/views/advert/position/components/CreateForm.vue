<template>
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="新增"
      width="500px"
      :model-value="visible"
      @close="onCancel"
    >
        <template #footer>
            <el-button key="back" @click="() => onCancel()">取消</el-button>
            <el-button key="submit" type="primary" :loading="onSubmitLoading" @click="onFinish">提交</el-button>
        </template>
        
        <el-form :model="modelRef" :rules="rulesRef" ref="formRef" label-width="80px">
            <el-form-item label="名称" prop="name" >
                <el-input v-model="modelRef.name" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="描述" prop="sub" >
                <el-input v-model="modelRef.sub" placeholder="请输入描述" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"/>
            </el-form-item>
            <el-form-item  label="状态" prop="status">
                <el-radio-group v-model="modelRef.status">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio :label="0">禁用</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>

    </el-dialog>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";
import { TableListItem } from "../data.d";
import { ElForm, ElMessage } from "element-plus";

interface CreateFormSetupData {
    modelRef: TableListItem;
    rulesRef: any;
    formRef: typeof ElForm;
    resetFields: () => void;
    onFinish: () => Promise<void>;
}

export default defineComponent({
    name: 'CreateForm',
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        values: {
            type: Object as PropType<Partial<TableListItem>>,
            required: true
        },
        onCancel: {
            type: Function,
            required: true
        },
        onSubmitLoading: {
            type: Boolean,
            required: true
        },
        onSubmit: {
            type: Function as PropType<(values: TableListItem, resetFields: () => void) => void>,
            required: true
        }
    },
    components: {
    },
    setup(props): CreateFormSetupData {

        // 表单值
        const modelRef = reactive<TableListItem>({
            id: props.values.id || -1,
            name: props.values.name || '',
            sub: props.values.sub || '',
            status: props.values.status || 0
        });
        // 表单验证
        const rulesRef = reactive({
            name: [
                {
                    required: true,
                    validator: async (rule: any, value: string) => {
                        if (value === '' || !value) {
                            throw new Error('请输入名称');
                        }
                    }
                },
            ],
            sub: [
                {
                    required: true,
                    validator: async (rule: any, value: string) => {
                        if (value === '' || !value) {
                            throw new Error('请输入描述');
                        }
                    },
                },
            ]        
        });
        // form
        const formRef = ref<typeof ElForm>();
        // 重置
        const resetFields = () => {
            formRef.value?.resetFields();
        }
        // 提交
        const onFinish = async () => {           
            try {
                const valid: boolean | undefined =  await formRef.value?.validate();
                if(valid === true) {
                    if(modelRef.id === -1) delete modelRef.id;
                    props.onSubmit(modelRef, resetFields);
                }
            } catch (error) {
                ElMessage.warning('验证不通过，请检查输入');
            }
        };
        
        return {
            modelRef,
            rulesRef,
            formRef: formRef as any as typeof ElForm,
            resetFields,
            onFinish
        }

    }
})
</script>