<template>
      <a-col :lg="lg">
        <div class="term">{{term}}</div>
        <div class="content">
          <slot></slot>
        </div>
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