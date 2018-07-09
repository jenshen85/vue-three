import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/ThreeSlider',
      name: 'ThreeSlider',
      component: () => import('./components/three-slider')
    }
  ]
})
