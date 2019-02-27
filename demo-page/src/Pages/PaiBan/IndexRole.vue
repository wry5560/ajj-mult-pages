<template>
  <div class="paiban-role" style="height: 100%">
    <a-layout>
      <a-layout-sider style="background-color: #fff" >
        <a-card style="height: 100%">
          <a-row slot="title" style="background:none; font-size: 14px;">
            <a-col :span="8" style="text-align: center">级别</a-col>
            <a-col :span="8" style="text-align: center">级别名称</a-col>
            <a-col :span="8" style="text-align: center">人数</a-col>
          </a-row>
          <a-menu
            mode="inline"
            style="margin-top: 1px"
            :defaultSelectedKeys="['1']"
            :selectedKeys="[levelPanes.selectedKey]"
            @click="handleLevelClick"
          >
            <a-menu-item class="role-item " key="1">
              <a-row style="background:none;">
                <a-col :span="8" style="text-align: center">一级</a-col>
                <a-col :span="8" v-if="!levelPanes.editable" style="text-align: center">{{levelPanes.levelList.lv1name}}</a-col>
                <a-col :span="8" v-if="levelPanes.editable" style="text-align: center">
                  <a-input size="small" v-model="levelPanes.temNameList.lv1name"></a-input>
                </a-col>
                <a-col :span="8" style="text-align: center">{{this.levelPanes.levelList.lv1Num}}人</a-col>
              </a-row>
            </a-menu-item>
            <a-menu-item class="role-item " key="2">
              <a-row style="background:none;">
                <a-col :span="8" style="text-align: center">二级</a-col>
                <a-col :span="8" v-if="!levelPanes.editable" style="text-align: center">{{levelPanes.levelList.lv2name}}</a-col>
                <a-col :span="8" v-if="levelPanes.editable" style="text-align: center">
                  <a-input size="small"  v-model="levelPanes.temNameList.lv2name"></a-input>
                </a-col>
                <a-col :span="8" style="text-align: center">{{levelPanes.levelList.lv2Num}}人</a-col>
              </a-row>
            </a-menu-item>
            <a-menu-item class="role-item " key="3">
              <a-row style="background:none;">
                <a-col :span="8" style="text-align: center">三级</a-col>
                <a-col :span="8" v-if="!levelPanes.editable" style="text-align: center">{{levelPanes.levelList.lv3name}}</a-col>
                <a-col :span="8" v-if="levelPanes.editable" style="text-align: center">
                  <a-input size="small"  v-model="levelPanes.temNameList.lv3name" ></a-input>
                </a-col>
                <a-col :span="8" style="text-align: center">{{levelPanes.levelList.lv3Num}}人</a-col>
              </a-row>
            </a-menu-item>
            <a-menu-item class="role-item " key="4">
              <a-row style="background:none;">
                <a-col :span="8" style="text-align: center">四级</a-col>
                <a-col :span="8" v-if="!levelPanes.editable" style="text-align: center">{{levelPanes.levelList.lv4name}}</a-col>
                <a-col :span="8" v-if="levelPanes.editable" style="text-align: center">
                  <a-input size="small"  v-model="levelPanes.temNameList.lv4name" ></a-input>
                </a-col>
                <a-col :span="8" style="text-align: center">{{levelPanes.levelList.lv4Num}}人</a-col>
              </a-row>
            </a-menu-item>
            <a-menu-item class="role-item " key="5">
              <a-row style="background:none;">
                <a-col :span="8" style="text-align: center">五级</a-col>
                <a-col :span="8" v-if="!levelPanes.editable" style="text-align: center">{{levelPanes.levelList.lv5name}}</a-col>
                <a-col :span="8" v-if="levelPanes.editable" style="text-align: center">
                  <a-input size="small"  v-model="levelPanes.temNameList.lv5name"></a-input>
                </a-col>
                <a-col :span="8" style="text-align: center">{{levelPanes.levelList.lv5Num}}人</a-col>
              </a-row>
            </a-menu-item>
            <a-menu-item class="role-item " key="6">
              <a-row style="background:none;">
                <a-col :span="8" style="text-align: center">其他</a-col>
                <a-col :span="8" style="text-align: center">-</a-col>
                <a-col :span="8" style="text-align: center">{{this.levelPanes.levelList.lv6Num}}人</a-col>
              </a-row>
            </a-menu-item>
            <a-menu-item class="role-item " key="7">
              <a-row style="background:none;">
                <a-col :span="8" style="text-align: center">全部</a-col>
                <a-col :span="8" style="text-align: center">-</a-col>
                <a-col :span="8" style="text-align: center">{{this.levelPanes.levelList.lv7Num}}人</a-col>
              </a-row>
            </a-menu-item>
          </a-menu>
          <div class="editable-bar" >
            <a v-if="!levelPanes.editable &&!levelPanes.loading" href="javascript:" @click="editLevelName">修改级别名称</a>
            <a v-if="levelPanes.editable &&!levelPanes.loading" href="javascript:"@click="commitLevelName">保存修改</a>
            <a-icon v-if="levelPanes.loading" type="loading" />
          </div>
        </a-card>
      </a-layout-sider>
      <a-layout-content>
        <a-modal
          title="提示："
          :visible="modal.visible"
          @ok="handleModalOk"
          :confirmLoading="modal.confirmLoading"
          @cancel="handleModalCancel"
        >
          <p>{{modal.ModalText}}</p>
        </a-modal>
        <div  class="header-buttons-bar">
          <a-button size="small" type="primary" style="margin-left: 8px" :disabled="levelPanes.selectedKey=='7'" @click="showSelTable">批量添加</a-button>
          <a-button @click="refresh" size="small" >刷 新</a-button>
          <a-popover  trigger="click" placement="bottomLeft" @visibleChange="popoverVisibleChange">
            <a-button @click="openMultiChange" v-if="!toMultiChange" size="small" :style="{'margin-left':'5px'}" :disabled="staffTable.rowSelection.selectedRowKeys.length<2">批量修改</a-button>
            <a-button @click="toConfirm" v-else="toMultiChange" size="small" :style="{'margin-left':'5px'}" >保存修改</a-button>
            <div slot="content"style="width: 200px">
              <editable-level-cell v-if="toMultiChange" @levelChange="onLevelChange"  :selectItem="selectItem" type="multi"></editable-level-cell>
              <a-button @click="toConfirm" type="primary" size="small" :style="{'margin-top':'5px'}" >保存</a-button>
            </div>
          </a-popover>
          <a-button @click="deleteStaffLevel('multi')" size="small" :disabled="levelPanes.selectedKey=='6'||staffTable.rowSelection.selectedRowKeys.length<2">批量删除</a-button>
          <a-button-group >
            <a-button @click="sortUP" size="small" icon="up" style="margin-right: 0" :disabled="levelPanes.selectedKey=='6'||levelPanes.selectedKey=='7'||staffTable.rowSelection.selectedRowKeys.length!=1"></a-button>
            <a-button @click="sortDown"size="small"  icon="down" :disabled="levelPanes.selectedKey=='6'||levelPanes.selectedKey=='7'||staffTable.rowSelection.selectedRowKeys.length!=1"></a-button>
          </a-button-group>
          <a-input-search
            placeholder="请输入人员名称..."
            style="width: 200px"
            :value="filteredInfo.name"
            size="small"
            @search="onSearch"
            @change="(e)=>{this.filteredInfo.name= e.target.value}"
          />
          <span v-if="hasToPost" style="margin-left: 16px;color:#ff6250">有未保存数据！</span>
          <!--<span style="margin-left: 6px">-->
            <!--<a v-if="!showAdvance" href="javascript:;" @click="switchAdvance">高级</a>-->
            <!--<a v-if="showAdvance" href="javascript:;" @click="switchAdvance">收起</a>-->
          <!--</span>-->
          <!--<div v-if="showAdvance">-->
            <!--<div>-->
              <!--<a-input-search-->
                <!--placeholder="请输入人员名称..."-->
                <!--style="width: 200px"-->
                <!--size="small"-->
                <!--@search="onSearch"-->
              <!--/>-->
            <!--</div>-->
          <!--</div>-->
          <div style="clear: both"></div>
        </div>
        <a-table
          bordered
          :dataSource="tableData"
          :rowClassName="rowClass"
          :columns="columns"
          :pagination='false'
          size="small"
          :loading="staffTable.tableIsLoading"
          :scroll="staffTable.scrollSize"
          :rowSelection="staffTable.rowSelection"
        >
          <template slot="editLevel" slot-scope="text, record,index">
            <a-tooltip :mouseEnterDelay="0.8">
            <span v-if="record.editable">

              <editable-level-cell  @levelChange="onLevelChange" :text="mapLevelName(text)" :selectItem="selectItem" :record="record"></editable-level-cell>
            </span>
            <div v-else style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{mapLevelName(text)}}</div>
            </a-tooltip>
          </template>
          <span slot="actionCell" slot-scope="text,record,index" >
            <a href="javascript:;" @click="changeEditable(record)">修改级别</a>
            <a-divider  type="vertical" />
            <a  href="javascript:;" @click="deleteStaffLevel(record)" :disabled="levelPanes.selectedKey=='6'">删除</a>
          </span>
          <span slot="defaultcustomRender" slot-scope="text,record,index">
          <template>
            <a-tooltip :mouseEnterDelay="0.8">
              <template slot='title'>
                {{text}}
              </template>
              <div style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{text}}</div>
            </a-tooltip>
          </template>
        </span>
        </a-table>
        <div class="bottom-pagination-warpper" style="padding-right: 216px">
        <a-pagination
          v-model="staffTable.pagination.current"
          size="small"
          style="float:right;"
          :total="paginationTotal"
          showSizeChanger
          showQuickJumper
          :showTotal="total => `共${total}条数据`"
          @change="changeCurrentPage"
          :pageSizeOptions="staffTable.pagination.pageSizeOptions"
          :pageSize="staffTable.pagination.pageSize"
          @showSizeChange="showSizeChange"
        />
          <div style="clear: both"></div>
        </div>


        <a-modal
          :title="modalOption.title"
          @cancel="modalCancel"
          :visible="modalOption.visible"
          :destroyOnClose="true"
          :maskClosable="false"
          :wrapClassName="modalOption.modalClass"
          :width="modalOption.width"
          :bodyStyle="modalOption.bodyStyle"
        >
          <a-spin  :spinning="modalLoading">
            <a-table
              bordered
              :dataSource="tableSelData"
              :rowClassName="rowClass"
              :columns="selColumns"
              :pagination='false'
              size="small"
              :loading="staffTable.tableIsLoading"
              :scroll="staffTable.scrollSize"
              :rowSelection="modalOption.table.rowSelection"
            >
              <template slot="editLevel" slot-scope="text, record,index">
            <span v-if="record.editable">
              <editable-level-cell  @levelChange="onLevelChange" :text="mapLevelName(text)" :selectItem="selectItem" :record="record"></editable-level-cell>
            </span>
                <span v-else>{{mapLevelName(text)}}</span>
              </template>
              <span slot="actionCell" slot-scope="text,record,index" >
            <a href="javascript:;" @click="changeEditable(record)">修改级别</a>
            <a-divider  type="vertical" />
            <a  href="javascript:;" @click="deleteStaffLevel(record)" :disabled="levelPanes.selectedKey=='6'">删除</a>
          </span>
              <span slot="defaultcustomRender" slot-scope="text,record,index">
          <template>
            <a-tooltip :mouseEnterDelay="0.8">
              <template slot='title'>
                {{text}}
              </template>
              <div style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{text}}</div>
            </a-tooltip>
          </template>
        </span>

            </a-table>


          </a-spin>
          <template slot="footer">
            <a-pagination
              v-model="modalOption.pagination.current"
              size="small"
              style="float: left"
              :total="modalOption.pagination.total"
              showSizeChanger
              showQuickJumper
              :showTotal="total => `共${total}条数据`"
              @change="changeModalCurrentPage"
              :pageSizeOptions="modalOption.pagination.pageSizeOptions"
              :pageSize="modalOption.pagination.pageSize"
              @showSizeChange="showModalSizeChange"
            />
            <a-button  key="back" @click="modalCancel" size="small">返回</a-button>
            <a-popconfirm title="您确认添加选中人员吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">
              <a-button  key="submit" type="primary" :loading="modalOption.commitLoading"  size="small">添加</a-button>
            </a-popconfirm>
          </template>

        </a-modal>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import EditableLevelCell from './EditableLevelCell'
import {reqStaffList,reqAllStaff,levelName,postChangeLevel} from "./api"
import { initColumn } from '@/utils/tableColumnInit'

const levelArr=['一级','二级','三级','四级','五级','']
let timer=null
  export default {
    name:'IndexRole',
    components:{
      EditableLevelCell
    },
    data(){
      return{
        showAdvance:false,
        modalLoading:false,
        hasToPost:false,
        toMultiChange:false,
        multiChangeLoading:false,
        filteredInfo:{name:''},
        modal:{
          visible:false,
          confirmLoading:false,
          ModalText:'',
          changeData:[],
        },
        modalOption: {
          title: '批量添加人员',
          width: '85%',
          visible: false,
          bodyStyle: {
            "max-height": window.innerHeight - 250 + 'px',
            height:window.innerHeight - 250 + 'px',
            "min-height": 100
          },
          commitLoading: false,
          mapCity: '珠海',
//          commitGpsAction: editGpsAction,
          defaultCenter: {
            lng: 113.536232,
            lat: 22.120977
          },
          selectOptions: {},
          recordId: '',
          modalType: '',
          modalClass: 'nomal-modal table-modal ',

          table:{
            rowSelection:{
              selectedRowKeys: [],
              onChange: this.onModalSelectChange,
              columnWidth:'20px',
          },
          },
          pagination:{
            total:0,
            current:1,
            pageSize:20,
            pageSizeOptions:['10','20','50','100','500']
          },
        },
        levelPanes:{
          editable:false,
          loading:false,
          selectedKey:'1',
          levelList: {
            lv1name:'',
            lv1Num:0,
            lv1List:[],
            lv2name:'',
            lv2Num:0,
            lv2List:[],
            lv3name:'',
            lv3Num:0,
            lv3List:[],
            lv4name:'',
            lv4Num:0,
            lv4List:[],
            lv5name:'',
            lv5Num:0,
            lv5List:[],
            lv6Num:0,
            lv6List:[],
            lv7Num:0,
            lv7List:[]
          },
          temNameList:{lv1name:'',lv2name:'',lv3name:'',lv4name:'',lv5name:'',}
        },
        staffTable:{
          scrollSize: { x:800, y: window.innerHeight - 120},
          tableIsLoading: false,
          levelList:[],
          pagination:{
            total:0,
            current:1,
            pageSize:20,
            pageSizeOptions:['10','20','50','100','500']
          },
          dataSource: this.tableData,
          rowSelection:{
            selectedRowKeys: [],
            onChange: this.onSelectChange,
            columnWidth:'20px',
            // fixed:true
          },
//          columns: [
//            {title: '顺序', dataIndex: 'id', width: '40px', key:'id',align: 'center',},
//            {title: '人员名称',dataIndex: 'name', width: '100px',key:'sgnm', align: 'center'},
//            {title: '性别', dataIndex: 'sex', width: '50px',key:'xbNum', align: 'center',},
//            {title: '联系电话', dataIndex: 'phone', width: '100px', key:'uptime',align: 'center',},
//            {title: '所属组织', dataIndex: 'departmentName', width: '120px',key:'upuser', align: 'center',},
//            {title: '排班级别', dataIndex: 'level', width: '100px',key:'isend', align: 'center',scopedSlots: {customRender: 'editLevel'}},
//            {title: '操作', dataIndex: 'actions', width: '100px', key:'actions',align: 'center', scopedSlots: {customRender: 'actionCell'}},
////          {titleText:'操作', dataIndex: 'actions', width: 150, align:'center', scopedSlots: {customRender: 'actionCell', filterDropdown: 'levelOneDropdown', filterIcon: 'filterIcon',},
//          ],
        }
      }
    },
    computed:{
        columns(){
          this.filteredInfo=this.filteredInfo ||{}
          let  columns=[
              {title: '排班顺序', dataIndex: 'id', width: '40px', key:'id',align: 'center',},
              {title: '人员名称',dataIndex: 'name', width: '100px',key:'sgnm', align: 'center',filteredValue: [this.filteredInfo.name] || null,onFilter: (value, record) => record.name.includes(value)},
              {title: '性别', dataIndex: 'sex', width: '50px',key:'xbNum', align: 'center',},
              {title: '联系电话', dataIndex: 'phone', width: '100px', key:'uptime',align: 'center',},
              {title: '所属组织', dataIndex: 'departmentName', width: '120px',key:'upuser', align: 'center',},
              {title: '排班级别', dataIndex: 'level', width: '100px',key:'isend', align: 'center',scopedSlots: {customRender: 'editLevel'}},
              {title: '操作', dataIndex: 'actions', width: '100px', key:'actions',align: 'center', scopedSlots: {customRender: 'actionCell'}},
//          {titleText:'操作', dataIndex: 'actions', width: 150, align:'center', scopedSlots: {customRender: 'actionCell', filterDropdown: 'levelOneDropdown', filterIcon: 'filterIcon',},
              ]
          columns=initColumn(columns)
          return columns
        },
      selColumns(){
//        this.filteredInfo=this.filteredInfo ||{}
        let  columns=[
          {title: '序号', dataIndex: 'index', width: '40px', key:'id',align: 'center',},
          {title: '人员名称',dataIndex: 'name', width: '100px',key:'sgnm', align: 'center',filteredValue: [this.filteredInfo.name] || null,onFilter: (value, record) => record.name.includes(value),scopedSlots: {customRender: 'flitered'}},
          {title: '性别', dataIndex: 'sex', width: '50px',key:'xbNum', align: 'center',},
          {title: '联系电话', dataIndex: 'phone', width: '100px', key:'uptime',align: 'center',},
          {title: '所属组织', dataIndex: 'departmentName', width: '120px',key:'upuser', align: 'center',},
          {title: '排班级别', dataIndex: 'level', width: '100px',key:'isend', align: 'center'},
//          {title: '操作', dataIndex: 'actions', width: '100px', key:'actions',align: 'center', scopedSlots: {customRender: 'actionCell'}},
//          {titleText:'操作', dataIndex: 'actions', width: 150, align:'center', scopedSlots: {customRender: 'actionCell', filterDropdown: 'levelOneDropdown', filterIcon: 'filterIcon',},
        ]
        columns=initColumn(columns)
        return columns
      },
      tableData(){
          const start=(this.staffTable.pagination.current-1)* this.staffTable.pagination.pageSize
          const end=this.staffTable.pagination.current * this.staffTable.pagination.pageSize
          return this.levelPanes.levelList['lv'+this.levelPanes.selectedKey+'List'].slice(start,end)
      },
      tableSelData(){
//          debugger
        const start=(this.modalOption.pagination.current-1)* this.modalOption.pagination.pageSize
        const end=this.modalOption.pagination.current * this.modalOption.pagination.pageSize
        const aaa={...this.levelPanes.levelList}
        const wholeMenber=[...this.levelPanes.levelList.lv7List]
        const delMember=[...this.levelPanes.levelList['lv'+this.levelPanes.selectedKey+'List']]
        delMember.forEach((item)=>{
              const index=wholeMenber.findIndex(i=> item.userId==i.userId)
          wholeMenber.splice(index,1)
        })
//        const returnData=[]
        this.modalOption.pagination.total=wholeMenber.length
        wholeMenber.forEach((item,index)=>item.index=index+1)
        return wholeMenber.slice(start,end)
      },
      tableSelTotal(){
          return this.levelPanes.levelList.lv7List.length-this.levelPanes.levelList['lv'+this.levelPanes.selectedKey+'List'].length
      },
      selectItem(){
        const {lv1name,lv2name,lv3name,lv4name,lv5name}=this.levelPanes.levelList
        return [lv1name,lv2name,lv3name,lv4name,lv5name];
      },
      paginationTotal(){
        return this.levelPanes.levelList['lv'+this.levelPanes.selectedKey+'Num']
      },
      modalPaginationTotal(){
        return this.tableSelData.length
      },
      nowLevelList(){
        return this.levelPanes.levelList['lv'+this.levelPanes.selectedKey+'List']
      }
    },
    created (){
//      this.reqLevelData()
      this.reqStaffData()

    },
    mounted(){
      this.$nextTick(function () {
        let _this=this
        window.onresize = function(){
          _this.modalOption.bodyStyle['max-height']= window.innerHeight -250+'px'
          _this.modalOption.bodyStyle['height']= window.innerHeight -250+'px'

        }
//        document.getElementsByClassName('ant-table-body')[0].style.height=`${window.innerHeight}px`

        //初始化选择项,存入vuex相应store的state中
//        const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
//        const tmp=[]
//        selOptions.forEach(item=>{tmp.push({name:item,value:ls[item]})})
//        this.$store.commit(selOptionMutation,tmp)
//        this.modalOption.selectOptions=this.$store.getters[getSelOpitons]
      })
    },
    methods:{
      openMultiChange(){
        this.toMultiChange=true
      },
      popoverVisibleChange(visible){
          if (!visible){
              this.toMultiChange=false
          }
      },
      toConfirm(){
        if (this.levelPanes.selectedKey==this.modal.changeData[2]){
          this.$message.error('与当前级别相同，请选择其他级别')
          return
        }else{
          this.modal.visible=true;
        }
      },
      sortUP(){
        clearTimeout(timer);
        const arr = this.nowLevelList
          const index=this.staffTable.rowSelection.selectedRowKeys[0]
            if(index!=0){
              this.hasToPost=true;
              [arr[index-1],arr[index]]=[arr[index],arr[index-1]]
              this.staffTable.rowSelection.selectedRowKeys=[index-1]
              this.initLevelIndex()
              timer=setTimeout(()=>{
                const data={
                  jsonData:JSON.stringify({users:arr}),
                  param1:departmentId,
                  param2:levelArr[this.levelPanes.selectedKey-1]
                }
                postChangeLevel(data).then((res)=>{
                  if (res.success){
                    this.$message.success('排序数据保存成功')
                    this.hasToPost=false
                  }else{
                    this.$message.error(res.message+',排序数据未保存成功！')
                  }
                }).catch((err)=>{
                  this.$message.error('发生系统异常，排序数据未保存成功！')
                  console.log(JSON.stringify(err))
                })
              },1500)
            }else{
              this.$message.error('已排至第一位！')
            }
      },
      sortDown(){
        clearTimeout(timer);
        const arr = this.nowLevelList
        const index=this.staffTable.rowSelection.selectedRowKeys[0]
        if(index!=arr.length-1){
          this.hasToPost=true;
          [arr[index+1],arr[index]]=[arr[index],arr[index+1]]
          this.staffTable.rowSelection.selectedRowKeys=[index+1]
          this.initLevelIndex()
          timer=setTimeout(()=>{
            const data={
              jsonData:JSON.stringify({users:arr}),
              param1:departmentId,
              param2:levelArr[this.levelPanes.selectedKey-1]
            }
            postChangeLevel(data).then((res)=>{
              if (res.success){
                this.$message.success('排序数据保存成功')
                this.hasToPost=false
              }else{
                this.$message.error(res.message+',排序数据未保存成功！')
              }
            }).catch((err)=>{
              this.$message.error('发生系统异常，排序数据未保存成功！')
              console.log(JSON.stringify(err))
            })
          },1500)
        }else{
          this.$message.error('已排至末位！')}
      },
      switchAdvance(){this.showAdvance=!this.showAdvance},
      onSearch(){},
      handleLevelClick(e){
        this.levelPanes.selectedKey=e.key
        this.staffTable.rowSelection.selectedRowKeys=[]
      },
      refresh(){
//        this.reqLevelData()
        this.reqStaffData()
      },
      editLevelName(){
        this.levelPanes.editable=true
      },
      changeEditable(record){
        record.editable=true
      },
      showSelTable(){
        this.modalOption.visible=true
      },
      modalCancel(){
        this.modalLoading= false
        this.modalOption.visible = false
      },
      handleCommit(){
        this.modalLoading=true
        const changeMans=[]
        this.modalOption.table.rowSelection.selectedRowKeys.forEach((item)=>{
//            debugger
            const tmp=this.levelPanes.levelList.lv7List.find(i=>i.userId==item)
            const changeman={...tmp}
          changeman.id=changeman.userId
          changeman.level=levelArr[Number(this.levelPanes.selectedKey)-1]
          changeman.sortNum=10000
            changeMans.push(changeman)
        })
        const data={
          jsonData:JSON.stringify({users:changeMans}),
          param1:departmentId,
          param2:levelArr[this.levelPanes.selectedKey-1]
        }
        postChangeLevel(data)
          .then((res)=>{
            if(res.success){
              this.$message.success('修改成功')
              // this.modal.changeData[3].editable=false
              // this.changeLevel(this.modal.changeData[0],this.modal.changeData[1],this.modal.changeData[2])
              // this.initLevelNum()
              // this.initLevelIndex()
              this.reqStaffData()
              this.staffTable.rowSelection.selectedRowKeys=[]
              this.modalOption.table.rowSelection.selectedRowKeys=[]
              this.modal.changeData=[]
              this.toMultiChange=false
              this.modalLoading=false
              this.modalOption.visible=false
            }else{
              this.$message.error(res.message)
              this.modalLoading=false
            }
          }).catch((err)=>{
          this.$message.error("发生系统异常")
          this.modalLoading=false
          console.log(JSON.stringify(err))})
      },

      handleModalOk(){
//          debugger
        this.modal.confirmLoading=true
        const changeData=this.modal.changeData
        const changeMans=[]
        if (changeData[3]=='multi'){
          changeData[0].forEach((man)=>{
//              debugger
            const changeMan={...man}
            changeMan.id=changeMan.userId
            changeMan.level=levelArr[changeData[2]-1]
            changeMan.sortNum=10000
            changeMans.push(changeMan)
          })
        }else{
          const tmpMan=this.nowLevelList[changeData[0]]
          const changeMan={...tmpMan}
          changeMan.id=changeMan.userId
          changeMan.level=levelArr[changeData[2]-1]
          changeMan.sortNum=10000
          changeMans.push(changeMan)
        }
        const data={
          jsonData:JSON.stringify({users:changeMans}),
          param1:departmentId,
          param2:levelArr[changeData[2]-1]
        }
        postChangeLevel(data)
          .then((res)=>{
            if(res.success){
              this.$message.success('修改成功')
              // this.modal.changeData[3].editable=false
              // this.changeLevel(this.modal.changeData[0],this.modal.changeData[1],this.modal.changeData[2])
              // this.initLevelNum()
              // this.initLevelIndex()
              this.reqStaffData()
              this.staffTable.rowSelection.selectedRowKeys=[]
              this.modal.changeData=[]
              this.toMultiChange=false
              this.modal.confirmLoading=false
              this.modal.visible=false
            }else{
              this.$message.error(res.message)
              this.modal.confirmLoading=false
            }
          }).catch((err)=>{
          this.$message.error("发生系统异常")
          this.modal.confirmLoading=false
            console.log(JSON.stringify(err))})
      },
      handleModalCancel(){
        if(this.modal.changeData[3]!='multi'){
          this.modal.changeData[3].editable=false
        }
        this.toMultiChange=false
        this.modal.changeData=[]
        this.modal.visible=false
      },
      onLevelChange(data){
//          console.log(value)
        const key = data[0]
        const record = data[1]
        if (record=='multi'){
          const changeMans=[]
          const manList=this.nowLevelList
          this.staffTable.rowSelection.selectedRowKeys.forEach((key)=>{changeMans.push(manList.find(i=>i.key==key))})
          let nameString=''
          changeMans.forEach((man)=>{
            nameString = nameString+','+ man.name
          })
          this.modal.ModalText="您确认将 "+nameString+" 调整至"+this.selectItem[key]+"吗？"
          this.modal.changeData=[changeMans,this.levelPanes.selectedKey,key+1,record]
        }else{

          if (this.levelPanes.selectedKey == key + 1) {
            record.editable = false
            return
          }
          this.modal.changeData=[record.id-1,this.levelPanes.selectedKey,key+1,record]
          this.modal.ModalText="您确认将 "+record.name+" 调整至 "+this.selectItem[key]+" 吗？"
          this.modal.visible=true;
        }
      },
      deleteStaffLevel(record){
//          debugger
        if (record=='multi'){
          const changeMans=[]
          const manList=this.nowLevelList
          this.staffTable.rowSelection.selectedRowKeys.forEach((key)=>{changeMans.push(manList.find(i=>i.key==key))})
          let nameString=''
          changeMans.forEach((man)=>{
            nameString = nameString+','+ man.name
          })
          this.modal.ModalText="您确认去除 "+nameString+" 的排班级别吗？"
          this.modal.changeData=[changeMans,this.levelPanes.selectedKey,6,record]
        }else{
          this.modal.ModalText="您确认去除 "+record.name+" 的排班级别吗？"
          this.modal.changeData=[record.id-1,this.levelPanes.selectedKey,6,record]
        }
        this.modal.visible=true;
      },
      //提交保存级别自定义名称
      commitLevelName(){
        if (this.levelPanes.temNameList.lv1name=='') this.levelPanes.temNameList.lv1name='一级'
        if (this.levelPanes.temNameList.lv2name=='') this.levelPanes.temNameList.lv2name='二级'
        if (this.levelPanes.temNameList.lv3name=='') this.levelPanes.temNameList.lv3name='三级'
        if (this.levelPanes.temNameList.lv4name=='') this.levelPanes.temNameList.lv4name='四级'
        if (this.levelPanes.temNameList.lv5name=='') this.levelPanes.temNameList.lv5name='五级'
        const data={
          jsonData:JSON.stringify(this.levelPanes.temNameList),
          param1:departmentId
        }
        this.levelPanes.loading=true
        levelName(data)
          .then((res)=>{
            if(res.success){
              this.$message.success("保存成功！")
              this.levelPanes.levelList.lv1name=this.levelPanes.temNameList.lv1name
              this.levelPanes.levelList.lv2name=this.levelPanes.temNameList.lv2name
              this.levelPanes.levelList.lv3name=this.levelPanes.temNameList.lv3name
              this.levelPanes.levelList.lv4name=this.levelPanes.temNameList.lv4name
              this.levelPanes.levelList.lv5name=this.levelPanes.temNameList.lv5name
              this.levelPanes.editable=false
              this.levelPanes.loading=false
            }else{
              this.$message.error(res.message)
              this.levelPanes.temNameList.lv1name=this.levelPanes.levelList.lv1name
              this.levelPanes.temNameList.lv2name=this.levelPanes.levelList.lv2name
              this.levelPanes.temNameList.lv3name=this.levelPanes.levelList.lv3name
              this.levelPanes.temNameList.lv4name=this.levelPanes.levelList.lv4name
              this.levelPanes.temNameList.lv5name=this.levelPanes.levelList.lv5name
              this.levelPanes.editable=false
              this.levelPanes.loading=false
            }
          }).catch((err)=>{
          this.$message.error("保存失败！请联系系统管理员或稍后再试。")
          this.levelPanes.temNameList.lv1name=this.levelPanes.levelList.lv1name
          this.levelPanes.temNameList.lv2name=this.levelPanes.levelList.lv2name
          this.levelPanes.temNameList.lv3name=this.levelPanes.levelList.lv3name
          this.levelPanes.temNameList.lv4name=this.levelPanes.levelList.lv4name
          this.levelPanes.temNameList.lv5name=this.levelPanes.levelList.lv5name
          this.levelPanes.editable=false
          this.levelPanes.loading=false
          console.log(JSON.stringify(err))
        })

      },
      //通过下拉框选择级别后的回调
      onSelectChange(selectedRowKeys){
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.staffTable.rowSelection.selectedRowKeys = selectedRowKeys
      },

      onModalSelectChange(selectedRowKeys){
        this.modalOption.table.rowSelection.selectedRowKeys = selectedRowKeys
      },

      //分页器的方法
      changeCurrentPage(page, pageSize){
//        console.log(page)
//        console.log(pageSize)
        this.staffTable.pagination.current=page
        this.staffTable.pagination.pageSize=pageSize
      },
      //分页器每页数量变化后的方法
      showSizeChange(current, size){
//        console.log(current)
//        console.log(size)
        const start=(this.staffTable.pagination.current-1 )* this.staffTable.pagination.pageSize
        if(start==0){
          this.staffTable.pagination.current=1
        }else{
          this.staffTable.pagination.current= Math.ceil(start/size)
        }
        this.staffTable.pagination.pageSize=size
//        this.reqModalTableData()
      },
      //请求左侧级别数据，使用排班接口
      reqLevelData(){
        this.levelPanes.loading=true
        const parameter={
          limit:'10000',
          param1:departmentId
//        param1:process.env.NODE_ENV === 'production'? departmentId:'9361'
        }
        reqStaffList(parameter)
          .then((res)=>{
            if (res.success){
              this.levelPanes.levelList.lv1name=this.levelPanes.temNameList.lv1name=res.data[0].lv1name ==null || ''? '一级':res.data[0].lv1name
              this.levelPanes.levelList.lv2name=this.levelPanes.temNameList.lv2name=res.data[0].lv2name ==null || ''? '二级':res.data[0].lv2name
              this.levelPanes.levelList.lv3name=this.levelPanes.temNameList.lv3name=res.data[0].lv3name ==null || ''? '三级':res.data[0].lv3name
              this.levelPanes.levelList.lv4name=this.levelPanes.temNameList.lv4name=res.data[0].lv4name ==null || ''? '四级':res.data[0].lv4name
              this.levelPanes.levelList.lv5name=this.levelPanes.temNameList.lv5name=res.data[0].lv5name ==null || ''? '五级':res.data[0].lv5name
              this.levelPanes.loading=false
            }else{
              this.$message.error(res.message)
              this.levelPanes.loading=false
            }
          }).catch((err)=>{
          this.levelPanes.loading=false
            console.log(JSON.stringify(err))
        })
      },
      //请求所有员工数据
      reqStaffData(){
        this.levelPanes.loading=true
        const parameter={
          limit: 10000,
          // menuId: "10002085",
          param1: departmentId,
          start: 0
        }
        reqAllStaff(parameter)
          .then((res)=>{
            // console.log(JSON.stringify(res))
            if (res.success){
              const levelList=this.levelPanes.levelList
              const lv1List= this.levelPanes.levelList.lv1List=[]
              const lv2List=this.levelPanes.levelList.lv2List=[]
              const lv3List=this.levelPanes.levelList.lv3List=[]
              const lv4List=this.levelPanes.levelList.lv4List=[]
              const lv5List=this.levelPanes.levelList.lv5List=[]
              const lv6List=this.levelPanes.levelList.lv6List=[]
              const lv7List=this.levelPanes.levelList.lv7List=[]
              res.data.forEach((user)=>{
                const userData={}
                userData.id= user.sortNum ==0 ? 10000:user.sortNum
                userData.name=user.__uuserid.userName
                userData.sex=user.__uuserid.sex
                userData.phone=user.__uuserid.mobilePhone
                userData.departmentName=user.__uuserid.departmentName
                userData.level=user.userlevel
                userData.userId=user.__uuserid.userId
                userData.key=user.__uuserid.userId
                userData.editable=false
                if (!userData.level){this.levelPanes.levelList.lv6List.push(userData)}else{
                  const levelIndex = levelArr.findIndex(level => level==userData.level) + 1
                  this.levelPanes.levelList['lv'+levelIndex+'List'].push(userData)
                }
              })
              lv1List.sort((a,b)=>{return a-b})
              lv2List.sort((a,b)=>{return a-b})
              lv3List.sort((a,b)=>{return a-b})
              lv4List.sort((a,b)=>{return a-b})
              lv5List.sort((a,b)=>{return a-b})
              levelList.lv1name=this.levelPanes.temNameList.lv1name=res.data[0].lv1name
              levelList.lv2name=this.levelPanes.temNameList.lv2name=res.data[0].lv2name
              levelList.lv3name=this.levelPanes.temNameList.lv3name=res.data[0].lv3name
              levelList.lv4name=this.levelPanes.temNameList.lv4name=res.data[0].lv4name
              levelList.lv5name=this.levelPanes.temNameList.lv5name=res.data[0].lv5name

              this.initLevelIndex()
              this.initLevelNum()
              this.levelPanes.loading=false
            }else{
              this.$message.error(res.message)
            }
          }).catch((err)=>{
          console.log(JSON.stringify(err))
        })
      },
      //工具方法，映射级别和名称\
      changeLevel(manIndex,levelA,levelB){
//          debugger
        if (levelA==levelB)return
        const changeMan= {...this.levelPanes.levelList['lv'+levelA+'List'][manIndex]}
        changeMan.level=levelArr[levelB-1]
        changeMan.id=10000
        this.levelPanes.levelList['lv'+levelB+'List'].push(changeMan)
        this.levelPanes.levelList['lv'+levelA+'List'].splice(manIndex,1)
      },
      initLevelIndex(){
        const levelList=this.levelPanes.levelList
        const lv1List= this.levelPanes.levelList.lv1List
        const lv2List=this.levelPanes.levelList.lv2List
        const lv3List=this.levelPanes.levelList.lv3List
        const lv4List=this.levelPanes.levelList.lv4List
        const lv5List=this.levelPanes.levelList.lv5List
        const lv6List=this.levelPanes.levelList.lv6List
        const lv7List=this.levelPanes.levelList.lv7List
        lv1List.forEach((i,index)=>{i.id=i.sortNum=index+1;})
        lv2List.forEach((i,index)=>{i.id=i.sortNum=index+1})
        lv3List.forEach((i,index)=>{i.id=i.sortNum=index+1})
        lv4List.forEach((i,index)=>{i.id=i.sortNum=index+1})
        lv5List.forEach((i,index)=>{i.id=i.sortNum=index+1})
        lv6List.forEach((i,index)=>{i.id=index+1})
        levelList.lv7List =lv7List.concat(lv1List,lv2List,lv3List,lv4List,lv5List,lv6List)
      },
      initLevelNum(){
        this.levelPanes.levelList.lv1Num=this.levelPanes.levelList.lv1List.length
        this.levelPanes.levelList.lv2Num=this.levelPanes.levelList.lv2List.length
        this.levelPanes.levelList.lv3Num=this.levelPanes.levelList.lv3List.length
        this.levelPanes.levelList.lv4Num=this.levelPanes.levelList.lv4List.length
        this.levelPanes.levelList.lv5Num=this.levelPanes.levelList.lv5List.length
        this.levelPanes.levelList.lv6Num=this.levelPanes.levelList.lv6List.length
        this.levelPanes.levelList.lv7Num=this.levelPanes.levelList.lv7List.length
      },
      mapLevelName(text){
        const levelIndex = levelArr.findIndex(level => level==text)
        return this.selectItem[levelIndex]
      },
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      },

      changeModalCurrentPage(page, pageSize){
        this.modalOption.pagination.current=page
        this.modalOption.pagination.pageSize=pageSize
//        this.reqModalTableData()
      },
      showModalSizeChange(current, size){
        const start=(this.modalOption.pagination.current-1 )* this.modalOption.pagination.pageSize
        if(start==0){
          this.modalOption.pagination.current=1
        }else{
          this.modalOption.pagination.current= Math.ceil(start/size)
        }
        this.modalOption.pagination.pageSize=size
//        this.reqModalTableData()
      },
    }
  }
</script>

<style lang="scss">
  .paiban-role{
    .role-item{
      padding: 1px !important;
    }
    .editable-bar{
      text-align: right;
      padding: 8px;
      padding-right: 24px;
      border-top: 1px solid #f0f2f5;
      a{
        text-decoration:none
      }
    }
    .ant-card-head{
      padding: 0;
      min-height: 36px;
      /*border-bottom: 1px solid #f0f2f5;*/
    }
    .ant-card-body{
      padding: 0;
    }
    .ant-card-head-title{
      padding:8px 0
    }
    .ant-menu-inline{
      border-right: none;
      .ant-menu-item{
        margin: 0;

      }
      .ant-menu-item:not(:last-child){
        margin: 0;
        /*border-bottom: 1px solid #f5f5f5;*/
      }
    }
  }
</style>