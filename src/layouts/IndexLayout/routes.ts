import { RoutesDataItem } from "@/utils/routes";
import BlankLayout from '@/layouts/BlankLayout.vue';

const IndexLayoutRoutes: Array<RoutesDataItem> = [
  {
    icon: 'home',
    title: '首页',
    path: '/home',
    redirect: '/home/workplace',
    component: BlankLayout,
    children: [
      {
        icon: 'control',
        title: '工作台',
        path: 'workplace',
        component: ()=> import('@/views/home/index.vue')
      },
      {
        icon: 'edit',
        title: '自定义面包屑',
        path: 'custombreadcrumbs',
        component: ()=> import('@/views/custom-breadcrumbs/index.vue'),
        breadcrumb: [
          {
            title: '自定义面包屑',
            path: '/home/custombreadcrumbs',
          },
          {
            title: '首页',
            path: '/home',
          },
          {
            title: 'XiongChao.cc',
            path: 'http://XiongChao.cc',
          },
        ],
      },
    ],
  },

  {
    icon: 'components',
    title: '组件',
    path: '/component',
    redirect: '/component/icon/svg',
    component: BlankLayout,
    children:[
        {
            icon: 'icon',
            title: '图标',
            path: 'icon',
            redirect: '/component/icon/svg',
            component: BlankLayout,
            children: [
                {
                    title: 'IconSvg',
                    path: 'svg',
                    component: () => import('@/views/component/icon/svg/index.vue'),
                },
                {
                  title: 'IconFont',
                  path: 'font',
                  component: () => import('@/views/component/icon/font/index.vue'),
                },
            ]
        },
        {
            icon: 'editor',
            title: '编辑器',
            path: 'editor',
            redirect: '/component/editor/tuieditor',
            component: BlankLayout,
            children: [
                {
                    title: 'tui-editor',
                    path: 'tuieditor',
                    component: () => import('@/views/component/editor/tui-editor/index.vue'),
                },
                {
                    title: 'CKEditor',
                    path: 'ckeditor',
                    component: () => import('@/views/component/editor/ckeditor/index.vue'),
                }
            ]
        }
    ]
  },

  {
    icon: 'page',
    title: '页面示例',
    path: '/pagesample',
    redirect: '/pagesample/list/highlyadaptivetable',
    component: BlankLayout,
    children: [
      {
        icon: 'list',
        title: '列表页面',
        path: 'list',
        redirect: '/pagesample/list/highlyadaptivetable',
        component: BlankLayout,
        children: [          
          {
            title: '高度自适应表格',
            path: 'highlyadaptivetable',
            component: ()=> import('@/views/pagesample/list/highly-adaptive-table/index.vue'),
          }
        ],
      },
      {
        icon: 'edit',
        title: '表单页面',
        path: 'form',
        redirect: '/pagesample/form/basic',
        component: BlankLayout,
        children: [
          {
            title: '基础表单',
            path: 'basic',
            component: ()=> import('@/views/pagesample/form/basic/index.vue'),
          }
        ],
      },
      {
        icon: 'detail',
        title: '详情页面',
        path: 'detail',
        redirect: '/pagesample/detail/basic',
        component: BlankLayout,
        children: [
          {
            title: '基础详情',
            path: 'basic',
            component: ()=> import('@/views/pagesample/detail/basic/index.vue'),
          }
        ],
      },
    ],
  },

  {
    icon: 'permissions',
    title: '权限验证',
    path: '/roles',
    redirect: '/roles/all',
    component: BlankLayout,
    children: [
      {
        icon: 'detail',
        title: '用户都有权限',
        path: 'all',
        component: ()=> import('@/views/roles/all/index.vue'),
      },
      {
        icon: 'detail',
        roles: ['user'],
        title: 'Users有权限',
        path: 'user',
        component: ()=> import('@/views/roles/user/index.vue'),
      },
      {
        icon: 'detail',
        roles: ['test'],
        title: 'Tests有权限',
        path: 'test',
        component: ()=> import('@/views/roles/test/index.vue'),
      },
    ],
  },

];

export default IndexLayoutRoutes;