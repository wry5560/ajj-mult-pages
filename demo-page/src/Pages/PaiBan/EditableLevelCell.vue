<template>
  <div class='editable-cell'>
    <div class='editable-cell-input-wrapper'>
      <!--<a-select-->
        <!--size="small"-->
        <!--style="width:100%"-->
        <!--defaultValue=""-->
        <!--:defaultOpen="defaultOpen"-->
        <!--@change="handleChange"-->
        <!--notFoundContent="请选择级别"-->
      <!--&gt;-->
        <!--<a-select-option v-for="(item,index) in selectItem" :key="index">-->
          <!--{{item}}-->
        <!--</a-select-option>-->
      <!--</a-select>-->
      <a-input-number  size="small" style="width:60%" :defaultValue="value"></a-input-number>

    </div>
  </div>
</template>
<script>
  export default {
    props: {
      text: [String,Number],
      selectItem:Array,
      record:Object,
      type:String
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
      },
      defaultOpen(){
        if(this.type=='multi')return false
        return true
      }
    },
    methods: {
      handleChange (key) {
          if (this.type=='multi'){
            this.$emit('levelChange', [key,'multi'])
          }else{
            const record=this.record
            this.$emit('levelChange', [key,record])
          }
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