<template>
    <el-breadcrumb>
        <el-breadcrumb-item v-for="item in list" :key="item.path">
            <a-link :to="item.path">{{item.title}}</a-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BreadcrumbType } from '@/utils/routes';
import ALink from '@/components/ALink/index.vue';

export default defineComponent({
    name: 'BreadCrumbs',
    props: {
        list: {
            type: Array as PropType<BreadcrumbType[]>,
            default: []
        }
    },
    components: {
        ALink
    }
})
</script>