<template>
      <a-col :lg="lg">
        <span class="term"style="width: 100px;text-align: right;display: inline-block; vertical-align:top">{{term}}</span>
        <span style="width: calc(100% - 110px);display: inline-block" >
          <slot></slot>
        </span>
      </a-col>
</template>

<script>
  export default {
    name: 'DetailListItem',
    components: {
    },
    props: {
      title: {
        type: String,
        default: '',
        required: false
      },
      term:{
        type:String,
      },
      lg:{
        type:Number,
        default:12,
        required:false
      },
      col: {
        type: Number,
        required: false,
        default: 3
      },
      size: {
        type: String,
        required: false,
        default: 'large'
      },
      layout: {
        type: String,
        required: false,
        default: 'horizontal'
      }
    },
  }
</script>