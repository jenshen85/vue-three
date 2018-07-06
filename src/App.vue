<template>
  <div id="app">
    <three-slider/>
  </div>
</template>

<script>
import ThreeSlider from './components/three-slider'

export default {
  components:{
    ThreeSlider
  },
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
