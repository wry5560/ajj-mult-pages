<template>
  <div class="ajj-login">
    <div class="login-header">
      <div class="header-wapper">
        <img :src="logoUrl" />
        <span>横琴新区安全生产实时动态监管平台</span>
      </div>
    </div>
    <div class="login-content">
      <div  class="content-wappaer">
        <a-row type="flex"  align="middle">
          <a-col :lg="16" >
            <div style="margin:auto">
              <p class="title-main">安全生产实时动态监管平台</p>
              <p class="title-two">风险分级管控&nbsp;&nbsp;&nbsp;&nbsp;隐患排查治理</p>
            </div>
          </a-col>
          <a-col :lg="8">
            <div class="form-panel">
              <div class="title">欢迎登录</div>
              <a-divider style="margin-top: 0;"></a-divider>
              <a-form :form="form" style="padding:0 24px">
                <a-form-item>
                  <a-input size="large" type="text" placeholder="请输入帐户名" v-decorator="['ueserLoginId',{rules: [{ required: true, message: '请输入帐户名', whitespace: true}]}]">
                    <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input  size="large"type="password" autocomplete="false" placeholder="请输入密码" v-decorator="['pwd',{rules: [{ required: true, message: '请输入密码', whitespace: true}]}]">
                    <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input size="large" style="width: calc(100% - 80px);" type="text" placeholder="验证码" v-decorator="['randCode',{rules: [{ required: true, message: '请输入验证码', whitespace: true}]}]">
                  </a-input>
                  <span class="login-code" style="width:80px;display: inline-block" onclick="chengeCode()"><img /></span>
                </a-form-item>
                <a-form-item style="text-align: left;margin:-12px 0">
                  <a-checkbox v-model="formLogin.rememberPwd">记住密码</a-checkbox>
                </a-form-item>
                <a-form-item style="margin-top:16px">
                  <a-button
                    style="width: 100%;"
                    size="large"
                    type="primary"
                    htmlType="submit"
                    class="login-button"
                    @click.stop.prevent="handleSubmit"
                  >登录</a-button>
                </a-form-item>
              </a-form>
              <a-divider>APP下载</a-divider>
              <a-row class="qrCode-bar">
                <a-col :lg="12">
                  <a-popover>
                    <template slot="content" style="padding:0">
                      <div style="width:100px;height: 100px">
                        <vue-qr  logoSrc="" text="http://218.104.194.132:6200/asrsajj/AS_SYSTEM/weixindown/saoma_zf.html" :size="100" :margin="0" />
                      </div>
                      <p style="margin-bottom: 0px;text-align: center">政府端APP下载</p>
                    </template>
                    <img :src="zfImageUrl"/>
                    <p>政府端</p>
                  </a-popover>

                </a-col>

                <a-col :lg="12">
                  <a-popover>
                    <template slot="content">
                      <div style="width:100px;height: 100px">
                        <vue-qr  logoSrc="" text="http://218.104.194.132:6200/asrsajj/AS_SYSTEM/weixindown/saoma_qy.html" :size="100" :margin="0" />
                      </div>
                      <p style="margin-bottom: 0px;text-align: center">企业端APP下载</p>
                    </template>
                    <img :src="qyImageUrl"/>
                    <p>企业端</p>
                  </a-popover>
                </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>

  import VueQr from 'vue-qr'

  export default{
      name:'loginPage',
      components:{
        VueQr,
      },
      data(){
        return {
          logoUrl:host +"img/logo/ajlogo.png",
          zfImageUrl:host +"img/logo/logo_zf.png",
          qyImageUrl:host +"img/logo/logo_qy.png",
          form: this.$form.createForm(this),
          formLogin:{
            rememberPwd:false
          }
        }
      },
    mounted(){
    },
    methods:{
      handleSubmit(){

      },
      chengeCode(){

      }
    }
  }
</script>

<style lang="scss">
  .ajj-login{
    height: 100%;
    .login-header{
      text-align: center;
      font-size: 24px;
      padding:12px 0;
      .header-wapper{
        display: inline-block;
        text-align: left;
        width: 1200px;
        img{
          width: 80px;
          margin-right: 12px;
        }
      }
    }
    .login-content{
      background-image: url( 'http://feooe.myds.me:6200/asrsajj/img/loginBg.png');
      background-repeat: no-repeat;
      background-position: center top;
      overflow: hidden;
      width: 100%;
      height: 70%;
      text-align:center;
      display: inline-block;
      vertical-align:middle;

      .content-wappaer{
        width:1200px;
        position:relative;
        top:-30px;
        display: inline-block;
        .title-main{
          font-size: 56px;
          color:#ffffff;
          margin-bottom: 12px;
        }
        .title-two{
          font-size: 42px;
          font-weight:200;
          color:#ffffff;
        }
        .form-panel{
          background-color: #ffffff;
          border-radius: 10px;
          color: #8b8b8b;
          .title{
            padding:16px;
            font-size: 16px;
            font-weight: 500;
          }
          .ant-form-item{
            margin-bottom: 16px;
          }
        }
      }
    }
    .login-content:after{
      content:'';
      width:0;
      height:100%;
      display:inline-block;
      vertical-align:middle;
    }
    .qrCode-bar{
      text-align: center;
      margin-top:-12px;
      img{
        width:50px;
      }
    }
  }

</style>