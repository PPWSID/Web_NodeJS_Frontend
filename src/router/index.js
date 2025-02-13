import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/tictactoe',
        name: 'tictactoe',
        component: () => import('../components/TicTacToe.vue')
    }
  ]
});

export default router;
