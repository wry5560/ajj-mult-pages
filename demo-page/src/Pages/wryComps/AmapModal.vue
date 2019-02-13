<template>
  <div>
    <div><a-input id="pickerInput" placeholder="输入关键字选取地点" :value="searchAddress" @change="searchChange"></a-input></div>
    <a-card class="addressPanel">
      <div class="title">经纬度：</div>
      <div id="lnglat"></div>
      <div class="title">地址：</div>
      <div id="address"></div>
      <div class="title">最近的路口：</div>
      <div id="nearestJunction"></div>
      <div class="title">最近的路：</div>
      <div id="nearestRoad"></div>
      <div class="title">最近的地点（POI）：</div>
      <div id="nearestPOI"></div>
    </a-card>
    <div id="pageMap" :style="{height:mapHeight + 'px' }" ></div>
    <div style="padding: 6px">

      <span >
        <a-popconfirm title="您确认保存当前选定的位置信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="postGps">
          <a-button size="small" type="primary"style="float: right" :loading="postLoading" >保存位置</a-button>
        </a-popconfirm>
          <a-button size="small" style="float: right;margin-right: 8px" id="gpsBack">复 位</a-button>
          <a-button size="small" style="float: right;margin-right: 8px"@click="goBack">返 回</a-button>
        <div style="float: right;margin-right: 16px">请拖动标识选定位置</div>
        <div style="clear: both"></div>
      </span>
    </div>
  </div>
</template>

<script>
  import AMap from 'AMap'
  import {mapGetters,mapActions} from 'vuex'

  var map

  export default{
    name:'mapModel',
    props:{
      height:String,
      recordId:String,
      recordGps:Object,
      city:String,
      commitGpsAction:String,
      defaultCenter:Object
    },
    data(){
      return{
        map:{},
        searchAddress:'',
        gpsToPose:{},
        tmpGps:{},
        postLoading:false,
      }
    },
    mounted(){
      var _this=this
      this.gpsToPose.lng=this.recordGps.lng  && this.recordGps.lat ? this.recordGps.lng :this.defaultCenter.lng
      this.gpsToPose.lat=this.recordGps.lng  && this.recordGps.lat ? this.recordGps.lat :this.defaultCenter.lat
      this.init(_this)
    },
    computed:{
      mapHeight(){
        return this.height.substring(0,this.height.length-2) - 36
      },
    },
    methods: {

      goBack(){
        this.$emit('closeMap')
      },
      postGps(){
        // this.$emit('commitGps',this.gpsToPose)
        this.postLoading=true
        const parameter={
          param1: this.recordId,
          param2: this.gpsToPose.lng,
          param3: this.gpsToPose.lat,
        }
        this.$store.dispatch(this.commitGpsAction,parameter)
          .then((res)=>{
            if(res.success){
              this.$message.success("位置信息保存成功！")
              this.postLoading=false
              setTimeout(()=>this.$emit('closeMap','post'),500)
            }else{
              this.$message.error(res.message)
              this.postLoading=false
            }
          })
          .catch((err)=>{
            console.log(JSON.stringify(err))
            this.postLoading=false
          })
      },
      init: function (_this) {
        map = new AMap.Map('pageMap', {
          center:[_this.gpsToPose.lng,_this.gpsToPose.lat],
          resizeEnable: true,
          zoom: 15
        })
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale','AMap.Autocomplete','AMap.PlaceSearch','AMap.OverView'], function () {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.Scale())
          map.addControl(new AMap.Autocomplete())
          map.addControl(new AMap.PlaceSearch())
          map.addControl(new AMap.OverView())
        })

        //加载PoiPicker，加载PositionPicker,loadUI的路径参数为模块名中 'ui/' 之后的部分
        AMapUI.loadUI(['misc/PoiPicker','misc/PositionPicker'], function(PoiPicker,PositionPicker) {
          var poiPicker = new PoiPicker({
            city:_this.city ,
            input: 'pickerInput' //输入框id
          });
          //监听poi选中信息
          poiPicker.on('poiPicked', function(poiResult) {
            _this.searchAddress=poiResult.item.name
            console.log(JSON.stringify(poiResult.item))
            console.log([poiResult.item.lng,poiResult.item.lat])
            // positionPicker.stop()
            positionPicker.start([poiResult.item.location.lng,poiResult.item.location.lat])
          });

          var positionPicker = new PositionPicker({
            mode:'dragMarker',//设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
            map:map//依赖地图对象
          });
          //TODO:事件绑定、结果处理等
          positionPicker.on('success', function(positionResult) {
            document.getElementById('lnglat').innerHTML = positionResult.position;
            document.getElementById('address').innerHTML = positionResult.address;
            document.getElementById('nearestJunction').innerHTML = positionResult.nearestJunction;
            document.getElementById('nearestRoad').innerHTML = positionResult.nearestRoad;
            document.getElementById('nearestPOI').innerHTML = positionResult.nearestPOI;
            _this.gpsToPose.lng=positionResult.position.lng
            _this.gpsToPose.lat=positionResult.position.lat
          });
          positionPicker.on('fail', function(positionResult) {
            console.log('dragMap fail')
            // 海上或海外无法获得地址信息
            document.getElementById('lnglat').innerHTML = ' ';
            document.getElementById('address').innerHTML = ' ';
            document.getElementById('nearestJunction').innerHTML = ' ';
            document.getElementById('nearestRoad').innerHTML = ' ';
            document.getElementById('nearestPOI').innerHTML = ' ';
            _this.gpsToPose.lng=positionResult.position.lng
            _this.gpsToPose.lat=positionResult.position.lat
          });
          positionPicker.start([_this.gpsToPose.lng,_this.gpsToPose.lat])
          var btn = document.getElementById("gpsBack")
          AMap.event.addDomListener(btn,'click',function () {
            const tmplng =_this.recordGps.lng  && _this.recordGps.lat ? _this.recordGps.lng :_this.defaultCenter.lng
            const tmplat =_this.recordGps.lng  && _this.recordGps.lat ? _this.recordGps.lat :_this.defaultCenter.lat
            positionPicker.start([tmplng,tmplat])
          })
        });
      },
      searchChange(e){
        this.searchAddress=e.target.value
      }
    }
  }
</script>
<style lang="scss">
  #pageMap{
    width: 100% ;
  }
  #pickerInput{
    position: absolute;
    top: 60px;
    left: 80px;
    width: 250px;
    z-index: 101;
    /*box-shadow: 0px 0px 2px #888888;*/
  }
  .addressPanel{
    position: absolute;
    top: 100px;
    left: 80px;
    width: 250px;
    z-index: 101;
    /*box-shadow: 0px 0px 2px #888888;*/
    .ant-card-body{
      padding: 6px 6px 16px 12px;
      .title{
        font-weight: bold;
        margin-top: 5px;
      }
    }
  }
</style>
