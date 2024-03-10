import DynamicIsland from "./dynamic_island/DynamicIsland.vue";
import VueRouter from "vue-router"

const routes = [
    { path: "/di", component: DynamicIsland }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

export default router;