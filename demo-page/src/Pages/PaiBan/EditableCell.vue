<template>
  <div class='editable-cell'>
    <div v-if="editable && !disabled" class='editable-cell-input-wrapper'>
      <a-select
        :size="size"
        style="width:100%"
        :defaultValue="getValue"
        @change="handleChange"
        @pressEnter="check"
        @blur="check"
        :defaultOpen="true"
        notFoundContent="请选择排班人员"
      >
        <a-select-option v-for="(item,index) in staffList" :key="index">
          {{item}}
        </a-select-option>
      </a-select>
      <!--<a-input-->
        <!--:defaultValue	="getValue"-->
        <!--@change="handleChange"-->
        <!--@pressEnter="check"-->
      <!--/>-->
      <!--<a-icon-->
      <!--type='check'-->
      <!--class='editable-cell-icon-check'-->
      <!--@click="check"-->
    <!--/>-->
    </div>
    <div v-else class='editable-cell-text-wrapper' @click="edit">
      <div  style="display: inline-block">{{getValue || ' '}}</div>
    <!--<a-icon type='edit' class='editable-cell-icon'  />-->
      <a-icon v-if=" !disabled"
        type='close-circle'
        class='editable-cell-icon'
        @click.stop="clear"
      />
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    moment,
    props: {
      disabled:Boolean,
      text: String,
      textTitle:String,
      tableKey:Number,
      staffList:Array,
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
    },
    methods: {
      handleChange (key) {
        const value = this.staffList[key]
        this.value = value
        this.editable = false
        this.$emit('change', [this.value,this.textTitle,this.tableKey])
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