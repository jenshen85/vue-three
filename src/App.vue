<template>
  <div id="app">
    <router-link to="/ThreeSlider">Go To ThreeSlider</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  components:{},
  name: 'App'
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
