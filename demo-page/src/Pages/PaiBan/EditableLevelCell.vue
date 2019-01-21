<template>
  <div class='editable-cell'>
    <div class='editable-cell-input-wrapper'>
      <a-select
        size="small"
        style="width:100%"
        defaultValue=""
        :defaultOpen="true"
        @change="handleChange"
        notFoundContent="请选择级别"
      >
        <a-select-option v-for="(item,index) in selectItem" :key="index">
          {{item}}
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      text: String,
      selectItem:Array,
      record:Object,
    },
    data () {
      return {
        value: this.text,
        editable: false,
        size:'small',
      }
    },
    computed:{
      getValue () {
        return this.text
      }
    },
    methods: {
      handleChange (key) {
          const record=this.record
        this.$emit('levelChange', [key,record])
        // debugger
      },
      check () {
        this.editable = false
        this.$emit('change', [this.value,this.textTitle,this.tableKey])
      },
      edit () {
        this.editable = true
        console.log('cell edit')
      },
      clear(){
        this.value=''
        this.$emit('change', [this.value,this.textTitle,this.tableKey])
      }
    },
  }
</script>