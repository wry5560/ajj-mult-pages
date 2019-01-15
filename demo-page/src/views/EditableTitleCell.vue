<template>
  <div class='editable-cell'>
    <div v-if="editable" class='editable-cell-input-wrapper'style="padding-right: 24px">
      <a-input
        :defaultValue="getValue"
        @change="handleChange"
        @pressEnter="check"
      /><a-icon
      type='check'
      class='editable-cell-icon-check'
      @click="check"
      :style="{'margin-top': '8px'}"
    />
    </div>
    <div v-else class='editable-cell-text-wrapper'@click="edit" style="padding-right: 5px">
      <div  style="display: inline-block">{{getValue || ' '}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      text: String,
      textTitleIndex:String,
    },
    data () {
      return {
        value: this.text,
        editable: false,
      }
    },
    computed:{
      getValue () {
        return this.text
      }
    },
    methods: {
      handleChange (e) {
        const value = e.target.value
        this.value = value
      },
      check () {
        this.editable = false
        this.$emit('change', [this.value,this.textTitleIndex])
      },
      edit () {
        this.editable = true
      },
    },
  }
</script>
