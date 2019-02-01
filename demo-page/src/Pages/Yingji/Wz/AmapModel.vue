<template>
  <div id="pageMap">

  </div>
</template>

<script>
  import AMap from 'AMap'
  var map
  export default{
    name:'wzMap',
    data(){
      return{
        map:{}
      }
    },
    mounted(){
        this.init()
    },
    methods: {
      init: function () {
        map = new AMap.Map('pageMap', {
          center: [116.397428, 39.90923],
          resizeEnable: true,
          zoom: 10
        })
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.Scale())
        })
      }
    }
  }
</script>
<style>
  #pageMap{
    width: 100%;
    height: 500px;
  }
</style>
