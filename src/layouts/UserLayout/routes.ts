import { RoutesDataItem } from "@/utils/routes";

const UserLayoutRoutes: Array<RoutesDataItem> = [
    {
        title: 'user-layout.menu.login',
        path: 'login',
        component: () => import('@/views/user/login/index.vue'),
    }
];

export default UserLayoutRoutes;