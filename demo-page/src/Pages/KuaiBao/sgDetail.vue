<template>
  <div class="sg-detail">
    <div  class="header-buttons-bar">
      <!--<a-button @click="handleAdd">Add</a-button>-->
      <a-button @click="gotoIndex"size="small" :style="{'margin-right':'5px','float':'right'}">返 回</a-button>
    </div>

  </div>
</template>

<script>
  export default {
    name:"sgDetail",
    methods:{
      gotoIndex(){
        this.$router.push('/')
      }
    }
  }
</script>