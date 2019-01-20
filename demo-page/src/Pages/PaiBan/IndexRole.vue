<template>
  <div class="paiban-role">
    <a-layout>
      <a-layout-sider style="background-color: #fff" >
        <a-card >
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
                <a-col :span="8" style="text-align: center">{{this.levelPanes.levelList.noLvNum}}人</a-col>
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
        <div  class="header-buttons-bar">
          <a-button @click="" size="small" type="primary":style="{'margin-left':'5px',}">添加人员</a-button>
          <a-button @click="" size="small" >刷 新</a-button>
          <a-button @click="" size="small" >批量删除</a-button>
          <a-button-group>
            <a-button @click="" size="small" icon="up" style="margin-right: 0"></a-button>
            <a-button @click=""size="small"  icon="down"></a-button>
          </a-button-group>
          <div style="clear: both"></div>
        </div>
        <a-table
          bordered
          :dataSource="tableData"
          :columns="staffTable.columns"
          :pagination= "false"
          size="small"
          :loading="staffTable.tableIsLoading"
          :scroll="staffTable.scrollSize"
          :rowSelection="staffTable.rowSelection"
        >
          <template slot="editLevel" slot-scope="text, record,index">
            <span v-if="record.editable">
               <a-select
                 size="small"
                 style="width:100%"
                 defaultValue=""
                 :defaultOpen="true"
                 @change="check(record)"
                 notFoundContent="请选择级别"
               >
              <a-select-option v-for="(item,index) in selectItem" :key="index">
                {{item}}
              </a-select-option>
              </a-select>

            </span>
            <span v-else>{{mapLevelName(text)}}</span>
          </template>
          <span slot="actionCell" slot-scope="text,record,index" >
            <a href="javascript:;" @click="changeEditable(record)">修改级别</a>
            <a-divider  type="vertical" />
            <a  href="javascript:;" @click="">删除</a>
          </span>
        </a-table>
        <a-pagination
          v-model="staffTable.pagination.current"
          style="margin-top: 8px;float:right"
          :total="staffTable.pagination.total"
          showSizeChanger
          showQuickJumper
          :showTotal="total => `共${total}条数据`"
          @change="changeCurrentPage"
          :pageSizeOptions="staffTable.pagination.pageSizeOptions"
          :pageSize="staffTable.pagination.pageSize"
          @showSizeChange="showSizeChange"
        />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import EditableLevelCell from './EditableLevelCell'
import {reqStaffList,reqAllStaff,levelName} from "./api"

const levelArr=['一级','二级','三级','四级','五级']
  export default {
    name:'IndexRole',
    components:{
      EditableLevelCell
    },
    data(){
      return{
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
            noLvNum:0,
            lv6List:[],
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
          columns: [
            {title: '顺序', dataIndex: 'id', width: '40px', key:'id',align: 'center',},
            {title: '人员名称',dataIndex: 'name', width: '100px',key:'sgnm', align: 'center'},
            {title: '性别', dataIndex: 'sex', width: '50px',key:'xbNum', align: 'center',},
            {title: '联系电话', dataIndex: 'phone', width: '100px', key:'uptime',align: 'center',},
            {title: '所属组织', dataIndex: 'departmentName', width: '120px',key:'upuser', align: 'center',},
            {title: '排班级别', dataIndex: 'level', width: '100px',key:'isend', align: 'center',scopedSlots: {customRender: 'editLevel'}},
            {title: '操作', dataIndex: 'actions', width: '100px', key:'actions',align: 'center', scopedSlots: {customRender: 'actionCell'}},
//         {titleText:'操作', dataIndex: 'actions', width: 150, align:'center', scopedSlots: {customRender: 'actionCell', filterDropdown: 'levelOneDropdown', filterIcon: 'filterIcon',},
          ],
        }
      }
    },
    computed:{
      tableData(){
        return this.levelPanes.levelList['lv'+this.levelPanes.selectedKey+'List']
      },
      selectItem(){
        const {lv1name,lv2name,lv3name,lv4name,lv5name}=this.levelPanes.levelList
        return [lv1name,lv2name,lv3name,lv4name,lv5name];
      },
    },
    created (){
      this.reqLevelData()
      this.reqStaffData()
    },
    methods:{
      handleLevelClick(e){this.levelPanes.selectedKey=e.key},
      editLevelName(){
        this.levelPanes.editable=true
      },
      changeEditable(record){
        record.editable=true
      },
      check(record){
        record.editable=false
      },
      commitLevelName(){
        const data={
          jsonData:JSON.stringify(this.levelPanes.temNameList),
          param1:'9361'
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
      onSelectChange(selectedRowKeys){
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.staffTable.rowSelection.selectedRowKeys = selectedRowKeys
      },
      changeCurrentPage(page, pageSize){
        console.log(page)
        console.log(pageSize)
      },
      showSizeChange(current, size){
        console.log(current)
        console.log(size)
      },
      reqLevelData(){
        this.levelPanes.loading=true
        const parameter={
          sqlId:'S360002',
          limit:'10000',
          param1:'9361'
//        param1:process.env.NODE_ENV === 'production'? departmentId:'9361'
        }
        reqStaffList(parameter)
          .then((res)=>{
            if (res.success){
              this.levelPanes.levelList.lv1name=this.levelPanes.temNameList.lv1name=res.data[0].lv1name
              this.levelPanes.levelList.lv2name=this.levelPanes.temNameList.lv2name=res.data[0].lv2name
              this.levelPanes.levelList.lv3name=this.levelPanes.temNameList.lv3name=res.data[0].lv3name
              this.levelPanes.levelList.lv4name=this.levelPanes.temNameList.lv4name=res.data[0].lv4name
              this.levelPanes.levelList.lv5name=this.levelPanes.temNameList.lv5name=res.data[0].lv5name
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
      reqStaffData(){
        const parameter={
          limit: 20,
          // menuId: "10002085",
          param1: "9361",
          start: 0
        }
        reqAllStaff(parameter)
          .then((res)=>{
            // console.log(JSON.stringify(res))
            if (res.success){
              res.data.forEach((user)=>{
                const userData={}
                userData.id=user.id
                userData.name=user.__uuser.userName
                userData.sex=user.__uuser.sex
                userData.phone=user.__uuser.mobilePhone
                userData.departmentName=user.__uuser.departmentName
                userData.level=user.userlevel
                userData.editable=false
                const levelIndex = levelArr.findIndex(level => level==userData.level) + 1
                this.levelPanes.levelList['lv'+levelIndex+'List'].push(userData)
              })
              this.levelPanes.levelList.lv1Num=this.levelPanes.levelList.lv1List.length
              this.levelPanes.levelList.lv2Num=this.levelPanes.levelList.lv2List.length
              this.levelPanes.levelList.lv3Num=this.levelPanes.levelList.lv3List.length
              this.levelPanes.levelList.lv4Num=this.levelPanes.levelList.lv4List.length
              this.levelPanes.levelList.lv5Num=this.levelPanes.levelList.lv5List.length
            }else{
              this.$message.error(res.message)
            }
          }).catch((err)=>{
          console.log(JSON.stringify(err))
        })
      },
      mapLevelName(text){
        const levelIndex = levelArr.findIndex(level => level==text)
        return this.selectItem[levelIndex]
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
      text-align: center;
      padding: 8px;
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