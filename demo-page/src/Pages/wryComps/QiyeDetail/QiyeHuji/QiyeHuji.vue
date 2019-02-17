<template>
  <div>
    <!--锚点-->
    <div style="float: right;margin-right:10px;width: 150px;padding-top:50px">
      <a-anchor  @click="handleAnchorClick">
        <a-anchor-link href="#基本信息" title="基本信息" />
        <a-anchor-link href="#安全生产信息登记" title="安全生产信息登记" />
        <a-anchor-link href="#安全生产负责人" title="安全生产负责人" />
        <a-anchor-link href="#安全生产管理制度" title="安全生产管理制度" />
        <a-anchor-link href="#企业证照管理" title="企业证照管理" />
        <a-anchor-link href="#变更信息管理" title="变更信息管理" />
      </a-anchor>
    </div>
    <!--详细内容-->
    <div class="content-list">
      <div class="content-wrapper" id="基本信息">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">基本信息-营业执照信息</span>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <div style="width: 100%">
            <span class="wry-col-title"><div>统一社会信用代码：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.tyshxydm}}</div></span>
            <span class="wry-col-title"><div>注册资本（万元）：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.zczb}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>企业名称：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.dwmc}}</div></span>
            <span class="wry-col-title"><div>企业状态：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.qystate}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>登记机关：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.djjg}}</div></span>
            <span class="wry-col-title"><div>经济类型：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.jjlx}}-{{qiyeInfo.jjlx2}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>法定代表人：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.fr}}</div></span>
            <span class="wry-col-title"><div>单位成立时间：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.clr}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>法人联系电话：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.frlx}}</div></span>
            <span class="wry-col-title"><div>法人身份证：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.frsfz}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>单位传真：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.cz}}</div></span>
            <span class="wry-col-title"><div>单位电话：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.dh}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>注册地址：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.zcdz}}</div></span>
            <span class="wry-col-title"><div>实际生产地址：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.zcdz}}</div></span>
          </div>
        </div>
      </div>
      <div class="content-wrapper" >
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">基本信息-其他信息</span>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <div style="width: 100%">
            <span class="wry-col-title"><div>组织机构代码：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.zzjgdm}}</div></span>
            <span class="wry-col-title"><div>工商注册号</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.gszch}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>税务登记证号：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.swdjzh}}</div></span>
            <span class="wry-col-title"><div>电子邮箱：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.email}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>单位类型：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.dwlx}}</div></span>
            <span class="wry-col-title"><div>分级分类：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.fjfl}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>企业类型：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.qylx}} - {{qiyeInfo.qylx2}}</div></span>
            <span class="wry-col-title"><div>企业状态：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.qystate}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>经营范围：</div></span>
            <span class="wry-col-content width-82"><div>{{qiyeInfo.jyfw}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>国民经济行业分类：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.gmjjhyfl}} {{qiyeInfo.gmjjhyf2}} {{qiyeInfo.gmjjhyf3}} {{qiyeInfo.gmjjhyf4}}</div></span>
            <span class="wry-col-title"><div>年收入：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.nsr}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>隶属关系：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.lsgx}}</div></span>
            <span class="wry-col-title"><div>上级单位：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.sjdw}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>邮政编码：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.yzbm}}</div></span>
            <span class="wry-col-title"><div>街道：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.jd}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>是否重点单位：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.sfzd==1?'是':'否'}}</div></span>
            <span class="wry-col-title"><div>行政区域：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.xzqy}} - {{qiyeInfo.xzqy2}} - {{qiyeInfo.xzqy3Nm}}- {{qiyeInfo.xzqy4Nm}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>固定资产：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.gdzc}}</div></span>
            <span class="wry-col-title"><div>职工人数：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.zgrs}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>占地面积（平方米）：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.zdmj}}</div></span>
            <span class="wry-col-title"><div>建筑面积（平方米）：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.jzmj}}</div></span>
          </div>
          <div style="width: 100%">
          <span class="wry-col-title"><div>标准化达标等级：</div></span>
          <span class="wry-col-content"><div>{{qiyeInfo.dbdj}}</div></span>
          <span class="wry-col-title"><div>营业执照有效期：</div></span>
          <span class="wry-col-content"><div>{{qiyeInfo.yyzzyxq}}</div></span>
        </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>经纬度：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.dwgpsj}} , {{qiyeInfo.dwgpsw}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>备注：</div></span>
            <span class="wry-col-content width-82"><div>{{qiyeInfo.bz}}</div></span>
          </div>

        </div>
      </div>
      <div class="content-wrapper">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">基本信息-证件照片</span>
          <span class="button-bar"></span>
        </div>
        <div class="content">

        </div>
      </div>
      <div class="content-wrapper" id="安全生产信息登记">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">安全生产信息登记</span>
          <span class="button-bar"></span>
        </div>
        <div class="content"><div style="width: 100%">
          <span class="wry-col-title"><div>安全机构名称：</div></span>
          <span class="wry-col-content width-82"><div>{{qiyeInfo.aqjgname}}</div></span>

        </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>企业规模：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.qygm}}</div></span>
            <span class="wry-col-title"><div>从业人数：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.cyrs}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>监管分类：</div></span>
            <span class="wry-col-content width-82"><div>{{qiyeInfo.jgfl}}  {{qiyeInfo.jgfl2}}</div></span>
            <!--<span class="wry-col-title"><div>经济类型：</div></span>-->
            <!--<span class="wry-col-content"><div>{{qiyeInfo.jjlx}}-{{qiyeInfo.jjlx2}}</div></span>-->
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>专职安全管理人数：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.aqyrs}}</div></span>
            <span class="wry-col-title"><div>专职应急管理人数：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.yjrs}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>特种作业人数：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.tzzyrs}}</div></span>
            <span class="wry-col-title"><div>注册安全工程师数：</div></span>
            <span class="wry-col-content"><div>{{qiyeInfo.zcaqgcsrs}}</div></span>
          </div>

        </div>
      </div>
      <div class="content-wrapper" id="安全生产负责人">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">安全生产负责人</span>
         <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(aqfzrTable.pagination.total)" :showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :rowClassName="rowClass"
              :dataSource="aqfzrTable.dataSource"
              :columns="aqfzrTable.columns"
              :pagination= "false"
              :size="aqfzrTable.size"
              :loading="aqfzrTable.tableIsLoading"
              :scroll="aqfzrTable.scrollSize"
              :rowSelection="aqfzrTable.rowSelection"
            >
              <span slot="actionCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('query',record)">查看</a>
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('edit',record)">修改</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">-->
            <!--<a href="javascript:;">删除</a>-->
          <!--</a-popconfirm>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('jcx',record)">检查项</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('qy',record)">检查企业</a>-->
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
            <a-pagination
              v-model="aqfzrTable.pagination.current"
              style="margin-top: 8px; float:right; padding-right: 16px;"
              :total="aqfzrTable.pagination.total"
              :pageSizeOptions="aqfzrTable.pagination.pageSizeOptions"
              :pageSize="aqfzrTable.pagination.pageSize"
              showSizeChanger
              showQuickJumper
              :showTotal="total =>`共${total}条数据`"
              @change="changeAqfzrCurrentPage"
              @showSizeChange="showAqfzrSizeChange"
              size="small"/>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
      <div class="content-wrapper" id="安全生产管理制度">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">安全生产管理制度</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(aqglzdTable.pagination.total)" :showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <a-table
            bordered
            :rowClassName="rowClass"
            :dataSource="aqglzdTable.dataSource"
            :columns="aqglzdTable.columns"
            :pagination= "false"
            :size="aqglzdTable.size"
            :loading="aqglzdTable.tableIsLoading"
            :scroll="aqglzdTable.scrollSize"
            :rowSelection="aqglzdTable.rowSelection"
          >
              <span slot="actionCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('query',record)">查看</a>
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('edit',record)">修改</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">-->
                <!--<a href="javascript:;">删除</a>-->
                <!--</a-popconfirm>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('jcx',record)">检查项</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('qy',record)">检查企业</a>-->
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
          <a-pagination
            v-model="aqglzdTable.pagination.current"
            style="margin-top: 8px; float:right; padding-right: 16px;"
            :total="aqglzdTable.pagination.total"
            :pageSizeOptions="aqglzdTable.pagination.pageSizeOptions"
            :pageSize="aqglzdTable.pagination.pageSize"
            showSizeChanger
            showQuickJumper
            :showTotal="total =>`共${total}条数据`"
            @change="changeAqglzdCurrentPage"
            @showSizeChange="showAqglzdSizeChange"
            size="small"/>
          <div style="clear: both"></div>
        </div>
      </div>
      <div class="content-wrapper" id="企业证照管理">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">企业证照管理</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(qyzzTable.pagination.total)":showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <a-table
            bordered
            :rowClassName="rowClass"
            :dataSource="qyzzTable.dataSource"
            :columns="qyzzTable.columns"
            :pagination= "false"
            :size="qyzzTable.size"
            :loading="qyzzTable.tableIsLoading"
            :scroll="qyzzTable.scrollSize"
            :rowSelection="qyzzTable.rowSelection"
          >
              <span slot="actionCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('query',record)">查看</a>
                <a-divider v-if="" type="vertical" />
                <a href="javascript:;" @click="showModal('',record)">文件管理</a>
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('edit',record)">修改</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">-->
                <!--<a href="javascript:;">删除</a>-->
                <!--</a-popconfirm>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('jcx',record)">检查项</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('qy',record)">检查企业</a>-->
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
          <a-pagination
            v-model="qyzzTable.pagination.current"
            style="margin-top: 8px; float:right; padding-right: 16px;"
            :total="qyzzTable.pagination.total"
            :pageSizeOptions="qyzzTable.pagination.pageSizeOptions"
            :pageSize="qyzzTable.pagination.pageSize"
            showSizeChanger
            showQuickJumper
            :showTotal="total =>`共${total}条数据`"
            @change="changeQyzzCurrentPage"
            @showSizeChange="showQyzzSizeChange"
            size="small"/>
          <div style="clear: both"></div>
        </div>
      </div>
      <div class="content-wrapper" id="变更信息管理">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">变更信息管理</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(bgxxTable.pagination.total)" :showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <a-table
            bordered
            :rowClassName="rowClass"
            :dataSource="bgxxTable.dataSource"
            :columns="bgxxTable.columns"
            :pagination= "false"
            :size="bgxxTable.size"
            :loading="bgxxTable.tableIsLoading"
            :scroll="bgxxTable.scrollSize"
            :rowSelection="bgxxTable.rowSelection"
          >
              <span slot="actionCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('query',record)">查看</a>
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('edit',record)">修改</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">-->
                <!--<a href="javascript:;">删除</a>-->
                <!--</a-popconfirm>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('jcx',record)">检查项</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('qy',record)">检查企业</a>-->
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
          <a-pagination
            v-model="bgxxTable.pagination.current"
            style="margin-top: 8px; float:right; padding-right: 16px;"
            :total="bgxxTable.pagination.total"
            :pageSizeOptions="bgxxTable.pagination.pageSizeOptions"
            :pageSize="bgxxTable.pagination.pageSize"
            showSizeChanger
            showQuickJumper
            :showTotal="total =>`共${total}条数据`"
            @change="changeBgxxCurrentPage"
            @showSizeChange="showBgxxSizeChange"
            size="small"/>
          <div style="clear: both"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {  mapGetters,mapActions } from 'vuex'
  import { initColumn } from '@/utils/tableColumnInit'
  import moment from 'moment'


    export default {
      moment,
        name: "QiyeHuji",
      props:{
        qyId:[String,Number],
      },
      data(){
        return{
          qiyeInfo:{},
          sfaq:null,
          aqfzrTable:{
            dataSource:[],
            columns:[
              {title: '序号', dataIndex: 'index', width: '40px',align: 'center'},
              {title: '姓名',dataIndex: 'userNm', width: '80px', align: 'center'},
              {title: '职务', dataIndex: 'userPost', width: '80px', align: 'center'},
              {title: '人员类型', dataIndex: 'userType', width: '80px', align: 'center',},
              {title: '联系电话', dataIndex: 'lxPhone', width: '80px', align: 'center',},
              {title: '手机号码', dataIndex: 'mobilePhone', width: '80px',align: 'center'},
              {title: '身份证号码', dataIndex: 'sfz', width: '120px', align: 'center',},
              {title: '邮箱', dataIndex: 'email', width: '120px', align: 'center',},
              {title: '所属企业', dataIndex: 'departName', width: '120px', align: 'center',},
              // {title: '操作', dataIndex: 'actions', width: '50px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
            ],
            size:'small',
            tableIsLoading:false,
            scrollSize: { x:900, y: window.innerHeight - 120},
            // rowSelection:{
            //   selectedRowKeys: [],
            //   onChange: this.onSelectChange,
            //   columnWidth:'20px',
            // }
            rowSelection:null,
            pagination:{
              total:0,
              current:1,
              pageSize:10,
              pageSizeOptions:['10','20','50','100','500']
            },
          },
          aqglzdTable:{
            dataSource:[],
            columns:[
              {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
              {title: '制度名称',dataIndex: 'zdNm', width: '150px', align: 'center'},
              {title: '描述', dataIndex: 'zddesc', width: '300px', align: 'center'},
              {title: '制度有效期', dataIndex: 'zdyxq', width: '150px', align: 'center',},
              {title: '更新日期', dataIndex: 'updateTime', width: '150px', align: 'center',},
              {title: '操作', dataIndex: 'actions', width: '50px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
            ],
            size:'small',
            tableIsLoading:false,
            scrollSize: { x:900, y: window.innerHeight - 120},
            // rowSelection:{
            //   selectedRowKeys: [],
            //   onChange: this.onSelectChange,
            //   columnWidth:'20px',
            // }
            rowSelection:null,
            pagination:{
              total:0,
              current:1,
              pageSize:10,
              pageSizeOptions:['10','20','50','100','500']
            },
          },
          qyzzTable:{
            dataSource:[],
            columns:[
              {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
              {title: '证件名称',dataIndex: 'zjmc', width: '180px', align: 'center'},
              {title: '证件编号', dataIndex: 'zjbh', width: '180px', align: 'center'},
              {title: '许可范围', dataIndex: 'xkfw', width: '80px', align: 'center',},
              {title: '开始日期', dataIndex: 'kssj', width: '100px', align: 'center',},
              {title: '结束日期', dataIndex: 'jssj', width: '100px', align: 'center',},
              {title: '登记机关', dataIndex: 'djjg', width: '120px', align: 'center',},
              {title: '状态', dataIndex: 'status', width: '50px', align: 'center',},
              {title: '企业名称', dataIndex: 'departName', width: '100px', align: 'center',},
              {title: '操作', dataIndex: 'actions', width: '120px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
            ],
            size:'small',
            tableIsLoading:false,
            scrollSize: { x:1100, y: window.innerHeight - 120},
            // rowSelection:{
            //   selectedRowKeys: [],
            //   onChange: this.onSelectChange,
            //   columnWidth:'20px',
            // }
            rowSelection:null,
            pagination:{
              total:0,
              current:1,
              pageSize:10,
              pageSizeOptions:['10','20','50','100','500']
            },
          },
          bgxxTable:{
            dataSource:[],
            columns:[
              {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
              {title: '变更时间',dataIndex: 'changetime', width: '100px', align: 'center'},
              {title: '变更人', dataIndex: 'uchangeuser', width: '80px', align: 'center'},
              {title: '变更内容', dataIndex: 'changecontent', width: '150px', align: 'center',},
              {title: '变更说明', dataIndex: 'changedesc', width: '150px', align: 'center',},
              {title: '审核人', dataIndex: 'uaudituser', width: '80px', align: 'center',},
              {title: '审核时间', dataIndex: 'audittime', width: '100px', align: 'center',},
              {title: '审核状态', dataIndex: 'auditstate', width: '60px', align: 'center',},
              {title: '审核意见', dataIndex: 'auditdesc', width: '150px', align: 'center',},
              // {title: '操作', dataIndex: 'actions', width: '50px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
            ],
            size:'small',
            tableIsLoading:false,
            scrollSize: { x:950, y: window.innerHeight - 120},
            // rowSelection:{
            //   selectedRowKeys: [],
            //   onChange: this.onSelectChange,
            //   columnWidth:'20px',
            // }
            rowSelection:null,
            pagination:{
              total:0,
              current:1,
              pageSize:10,
              pageSizeOptions:['10','20','50','100','500']
            },
          },
        }
      },
      created(){
        this.reqQySfaq()
        this.reqQyInfo()
        this.reqAqfzrTableData()
        this.reqAqglzdTableData()
        this.reqQyzzTableData()
        this.reqBgxxTableData()
        this.aqfzrTable.columns=initColumn(this.aqfzrTable.columns)
        this.aqglzdTable.columns=initColumn(this.aqglzdTable.columns)
        this.qyzzTable.columns=initColumn(this.qyzzTable.columns)
        this.bgxxTable.columns=initColumn(this.bgxxTable.columns)
      },
      mounted(){

      },
      methods: {
        ...mapGetters(['get_qiye_info','get_qiye_sfaq','get_qiye_aqfzr','get_qiye_aqglzd','get_qiye_qyzz','get_qiye_bgxx']),
        ...mapActions(['queryQySfaq','queryAjdwInfoByDepart','reqQyAqfzrList','reqQyAqglzdList','reqQyZzList','reqQyBgxxList']),

        handleAnchorClick (e, link) {
          e.preventDefault();
          console.log(link);
        },
        rowClass(record,index){
          if (index%2==1) return 'even-rows'
        },
        reqQySfaq(){
          const parameter={
            param1:this.qyId
          }
          this.queryQySfaq(parameter)
            .then((res)=>{
              this.sfaq=this.get_qiye_sfaq()
            })
            .catch(err=>console.log(JSON.stringify(err)))
        },
        reqQyInfo(){
          const parameter={
            param1:this.qyId
          }
          this.queryAjdwInfoByDepart(parameter)
            .then((res)=>{
              this.qiyeInfo=this.get_qiye_info()[0]
            })
            .catch(err=>console.log(JSON.stringify(err)))
        },
        reqAqfzrTableData(){
          this.aqfzrTable.tableIsLoading=true
          const parameter={
            param1:this.qyId,
            limit:this.aqfzrTable.pagination.pageSize,
            start:(this.aqfzrTable.pagination.current -1)*this.aqfzrTable.pagination.pageSize
          }
          this.reqQyAqfzrList(parameter)
            .then((res)=>{
              this.aqfzrTable.dataSource=this.get_qiye_aqfzr()
              this.aqfzrTable.pagination.total=res.totalCount
              this.aqfzrTable.dataSource.forEach(item=>item.index=(this.aqfzrTable.pagination.current -1)*this.aqfzrTable.pagination.pageSize+item.index)
              this.aqfzrTable.tableIsLoading=false
            })
            .catch(err=>console.log(JSON.stringify(err)))
        },
        changeAqfzrCurrentPage(page, pageSize){
          this.aqfzrTable.pagination.current=page
          this.aqfzrTable.pagination.pageSize=pageSize
          this.reqAqfzrTableData()
        },
        showAqfzrSizeChange(current, size){
          const start=(this.aqfzrTable.pagination.current-1 )* this.aqfzrTable.pagination.pageSize
          if(start==0){
            this.aqfzrTable.pagination.current=1
          }else{
            this.aqfzrTable.pagination.current= Math.ceil(start/size)
          }
          this.aqfzrTable.pagination.pageSize=size
          this.reqAqfzrTableData()
        },

        reqAqglzdTableData(){
          this.aqglzdTable.tableIsLoading=true
          const parameter={
            param1:this.qyId,
            limit:this.aqglzdTable.pagination.pageSize,
            start:(this.aqglzdTable.pagination.current -1)*this.aqfzrTable.pagination.pageSize
          }
          this.reqQyAqglzdList(parameter)
            .then((res)=>{
              this.aqglzdTable.dataSource=this.get_qiye_aqglzd()
              // debugger
              this.aqglzdTable.dataSource.forEach((item)=>{
                item.updateTime=moment(item.updateTime).format('YYYY-MM-DD HH-MM')
                item.index=(this.aqglzdTable.pagination.current -1)*this.aqglzdTable.pagination.pageSize+item.index
              })
              this.aqglzdTable.pagination.total=res.totalCount
              this.aqglzdTable.tableIsLoading=false
            })
            .catch(err=>console.log(JSON.stringify(err)))
        },
        changeAqglzdCurrentPage(page, pageSize){
          this.aqglzdTable.pagination.current=page
          this.aqglzdTable.pagination.pageSize=pageSize
          this.reqAqglzdTableData()
        },
        showAqglzdSizeChange(current, size){
          const start=(this.aqglzdTable.pagination.current-1 )* this.aqglzdTable.pagination.pageSize
          if(start==0){
            this.aqglzdTable.pagination.current=1
          }else{
            this.aqglzdTable.pagination.current= Math.ceil(start/size)
          }
          this.aqglzdTable.pagination.pageSize=size
          this.reqAqglzdTableData()
        },


        reqQyzzTableData(){
          this.qyzzTable.tableIsLoading=true
          const parameter={
            param1:this.qyId,
            limit:this.qyzzTable.pagination.pageSize,
            start:(this.qyzzTable.pagination.current -1)*this.aqfzrTable.pagination.pageSize
          }
          this.reqQyZzList(parameter)
            .then((res)=>{
              this.qyzzTable.dataSource=this.get_qiye_qyzz()
              this.qyzzTable.dataSource.forEach(item=>item.index=(this.qyzzTable.pagination.current -1)*this.qyzzTable.pagination.pageSize+item.index)
              this.qyzzTable.pagination.total=res.totalCount
              this.qyzzTable.tableIsLoading=false
            })
            .catch(err=>console.log(JSON.stringify(err)))
        },
        changeQyzzCurrentPage(page, pageSize){
          this.qyzzTable.pagination.current=page
          this.qyzzTable.pagination.pageSize=pageSize
          this.reqQyzzTableData()
        },
        showQyzzSizeChange(current, size){
          const start=(this.qyzzTable.pagination.current-1 )* this.qyzzTable.pagination.pageSize
          if(start==0){
            this.qyzzTable.pagination.current=1
          }else{
            this.qyzzTable.pagination.current= Math.ceil(start/size)
          }
          this.qyzzTable.pagination.pageSize=size
          this.reqQyzzTableData()
        },


        reqBgxxTableData(){
          this.bgxxTable.tableIsLoading=true
          const parameter={
            param1:this.qyId,
            limit:this.bgxxTable.pagination.pageSize,
            start:(this.bgxxTable.pagination.current -1)*this.aqfzrTable.pagination.pageSize
          }
          this.reqQyBgxxList(parameter)
            .then((res)=>{
              this.bgxxTable.dataSource=this.get_qiye_bgxx()
              this.bgxxTable.dataSource.forEach((item)=>{
                item.changetime=moment(item.changetime).format('YYYY-MM-DD HH-MM')
                item.audittime=item.audittime?moment(item.audittime).format('YYYY-MM-DD HH-MM'):''
                item.index=(this.bgxxTable.pagination.current -1)*this.bgxxTable.pagination.pageSize+item.index
              })
              this.bgxxTable.pagination.total=res.totalCount
              this.bgxxTable.tableIsLoading=false
            })
            .catch(err=>console.log(JSON.stringify(err)))
        },
        changeBgxxCurrentPage(page, pageSize){
          this.bgxxTable.pagination.current=page
          this.bgxxTable.pagination.pageSize=pageSize
          this.reqBgxxTableData()
        },
        showBgxxSizeChange(current, size){
          const start=(this.bgxxTable.pagination.current-1 )* this.bgxxTable.pagination.pageSize
          if(start==0){
            this.bgxxTable.pagination.current=1
          }else{
            this.bgxxTable.pagination.current= Math.ceil(start/size)
          }
          this.bgxxTable.pagination.pageSize=size
          this.reqBgxxTableData()
        },

      }
    }
</script>

<style lang="scss" scoped>
.content-list{
  width: calc(100% - 150px);
  padding:36px;
  .content-wrapper{
    width: 100%;
    margin-bottom: 50px;
    .header{
      margin-bottom: 15px;
      .title{
        border-left: 4px solid #1478f0;
        padding-left: 8px;
        font-size: 16px;
        color: #575757;
        font-weight: 600;
      };
      .button-bar{

      }
    };
  };
}

.wry-col-title{
  text-align: right;
  display: inline-block;
  width: 18%;
  padding:3px;
  /*min-height: 32px;*/
}
.wry-col-content{
  display: inline-block;
  width: 32%;
  padding:3px;
  /*min-height: 32px;*/
}
  .width-82{
    width: 82% !important;
  }

</style>