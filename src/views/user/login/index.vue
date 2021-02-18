<template>
    <div class="main">
        <h1 class="title">
            账户登录
        </h1>
        <el-form :model="modelRef" :rules="rulesRef" ref="formRef">
            <el-form-item  label="" prop="username">
                <el-input v-model="modelRef.username" :placeholder="'用户名'" @keydown.enter="handleSubmit">
                    <template #prefix><i class="el-icon-user el-input__icon"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
                <el-input v-model="modelRef.password" type="password" :placeholder="'密码'" @keydown.enter="handleSubmit">
                    <template #prefix><i class="el-icon-unlock el-input__icon"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="submit" @click="handleSubmit" :loading="submitLoading">
                    登 录
                </el-button>  
            </el-form-item>

            <el-alert v-if="loginStatus === 'error' && !submitLoading" :title="'用户名或密码错误！'" type="error" show-icon :closable="false" />

        </el-form>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, Ref } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ElForm, ElMessage } from 'element-plus';
import { LoginParamsType } from './data.d';
import { StateType as UserLoginStateType } from './store';

interface UserLoginSetupData {
    modelRef: LoginParamsType;
    rulesRef: any;
    formRef: typeof ElForm;
    submitLoading: boolean;
    handleSubmit: () => Promise<void>;
    loginStatus?: "ok" | "error" ;
}

export default defineComponent({
    name: 'UserLogin',
    components: {
    },
    setup(): UserLoginSetupData {
        const router = useRouter();
        const { currentRoute } = router;
        const store = useStore<{userlogin: UserLoginStateType}>();

        // 表单值
        const modelRef = reactive<LoginParamsType>({
            username: '',
            password: ''
        });
        // 表单验证
        const rulesRef = reactive({
            username: [
                {
                    required: true,
                    message: '请输入用户名',
                },
            ],
            password: [
                {
                    required: true,
                    message: '请输入密码',
                },
            ],            
        });
        // form
        const formRef = ref<typeof ElForm>();
        // 登录loading
        const submitLoading = ref<boolean>(false);
        // 登录
        const handleSubmit = async () => {
            submitLoading.value = true;
            try {
                const valid: boolean | undefined =  await formRef.value?.validate();
                if(valid === true) {
                    const res: boolean = await store.dispatch('userlogin/login',modelRef);
                    if (res === true) {
                        ElMessage.success('登录成功！');
                        const { redirect, ...query } = currentRoute.value.query;
                        router.replace({
                            path: redirect as string || '/',
                            query: {
                                ...query
                            }
                        });
                    } 
                }
            } catch (error) {
                ElMessage.warning('验证不通过，请检查输入');
            }
            submitLoading.value = false;
        }

        // 登录状态
        const loginStatus = computed<"ok" | "error" | undefined>(()=> store.state.userlogin.loginStatus);



        return {
            modelRef,
            rulesRef,
            formRef: formRef as unknown as typeof ElForm,
            submitLoading: submitLoading as unknown as boolean,
            handleSubmit,
            loginStatus: loginStatus as unknown as "ok" | "error" | undefined
        }
    }
})
</script>
<style lang="scss" scoped>
.main {
  flex: none;
  width: 248px;
  padding: 36px;
  margin: 0 auto;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  .title {
    font-size: 28px;
    margin-top: 0;
    margin-bottom: 30px;
    text-align: center;
    color: #ffffff;
    /* background-image:-webkit-linear-gradient(right,#FFFFFF,#009688, #FFFFFF); 
        -webkit-background-clip: text; 
        -webkit-text-fill-color:transparent; */
  }
  .submit {
    width: 100%;
  }
}

</style>