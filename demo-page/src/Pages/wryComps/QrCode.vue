<template>
  <div>
    <canvas id="zf"></canvas>
  </div>
</template>

<script>
  import QRCode from 'qrcode'

  export default{
    name:'QRCode',
    props:{

    },
    mounted(){
      this.createQrCode()
    },
    methods:{
      createQrCode(){
        let canvas = document.getElementById('zf')
        QRCode.toCanvas(canvas, 'http://218.104.194.132:6200/asrsajj/AS_SYSTEM/weixindown/saoma_zf.html', function (error) {
          if (error) console.error(error)
        })
      }
    }
  }
</script>

