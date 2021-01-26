import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { 
      path: '/', component: '@/pages/index/index'
    },{ 
      path: '/more', component: '@/pages/more/more'
    },{ 
      path: '/product/:id', component: '@/pages/product/[id]'
    },{ 
      component: '@/pages/_404/_404.tsx'
    },
  ],
  fastRefresh: {},
});
