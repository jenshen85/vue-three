import Vue from 'vue'
import Router from 'vue-router'
import ThreeSlider from './components/three-slider'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ThreeSlider',
      name: 'ThreeSlider',
      component: ThreeSlider
    }
  ]
})
