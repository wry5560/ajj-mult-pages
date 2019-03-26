<template>
  <div class="guidang" >
    <div class="account-settings-info-main" >
      <div class="account-settings-info-left">
        <div class="account-settings-info-title">
          <span>归档类型</span>
        </div>
        <a-menu
          mode="inline"
          :style="{ border: '0', width:'auto'}"
          :defaultSelectedKeys="defaultSelectedKeys"
          type="inner"
          @openChange="onOpenChange"
        >
          <a-menu-item key="guidang_qiyejiancha">
            <router-link :to="{ name: 'guidang_qiyejiancha' }">
              企业检查
            </router-link>
          </a-menu-item>
          <a-menu-item key="guidang_shigukuaibao">
            <router-link :to="{ name: 'guidang_shigukuaibao' }">
              事故快报
            </router-link>
          </a-menu-item>
          <a-menu-item key="guidang_anjiangongzuo">
            <router-link :to="{ name: 'guidang_anjiangongzuo' }">
              日常工作
            </router-link>
          </a-menu-item>
          <a-menu-item key="guidang_anjianyewu">
            <router-link :to="{ name: 'guidang_anjianyewu' }">
              安监业务
            </router-link>
          </a-menu-item>
        </a-menu>
      </div>
      <div class="account-settings-info-right">
        <!--<div class="account-settings-info-title">-->
          <!--<span>{{ $route.meta.title }}</span>-->
        <!--</div>-->

        <!--带keep alive判断的路由包装-->
        <!--<route-view></route-view>-->
        <!--vue router原生路由-->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  import RouteView from '@/components/layouts/RouteView'

  export default{
    name:'GuidangIndex',
    components:{
      RouteView,
    },
    data(){
        return {
          defaultSelectedKeys:['guidang_qiyejiancha'],
        }
    },
    methods:{
      onOpenChange(){

      }
    }
  }
</script>

<style lang="scss">
  .guidang{
    height: 100%;
    .ant-tabs-bar{
      margin-bottom: 0;
    }
    .account-settings-info-main {
      width: 100%;
      display: flex;
      height: 100%;
      overflow: auto;

      .account-settings-info-left {
        border-right: 1px solid #e8e8e8;
        width: 172px;
        .account-settings-info-title {
          color: rgba(0,0,0,.85);
          font-size: 18px;
          font-weight: 500;
          line-height: 24px;
          /*margin-bottom: 12px;*/
          border-bottom: 1px solid #e8e8e8;
          padding: 8px 16px;
        }
      }

      .account-settings-info-right {
        flex: 1 1;
        /*padding: 8px 16px;*/

        .account-settings-info-title {
          color: rgba(0,0,0,.85);
          font-size: 18px;
          font-weight: 500;
          line-height: 24px;
          margin-bottom: 12px;
        }
        .account-settings-info-view {
          padding-top: 12px;
        }
      }
    }
  }


</style>