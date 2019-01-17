<%@ page language="java" contentType="text/html; charset=utf-8"
pageEncoding="utf-8" errorPage="/hasNoRight.jsp"%>
  <!DOCTYPE html>
<html lang=zh-cmn-Hans>
<head>
  <meta charset=utf-8>
  <meta http-equiv=X-UA-Compatible content="IE=edge">
  <meta name=viewport content="width=device-width,initial-scale=1">
  <link rel=icon href=/asrsajj/90_asrs/sgkb/paiban_v/logo.png>
  <title>排班</title>
  <link href=/asrsajj/90_asrs/sgkb/paiban_v/css/index.8455212d.css rel=prefetch>
  <link href=/asrsajj/90_asrs/sgkb/paiban_v/css/test.7d6f7f33.css rel=prefetch>
  <link href=/asrsajj/90_asrs/sgkb/paiban_v/js/index.535c6974.js rel=prefetch>
  <link href=/asrsajj/90_asrs/sgkb/paiban_v/js/test.ab44061b.js rel=prefetch>
  <link href=/asrsajj/90_asrs/sgkb/paiban_v/css/app.e913810d.css rel=preload as=style>
  <link href=/asrsajj/90_asrs/sgkb/paiban_v/css/chunk-vendors.d125ae16.css rel=preload as=style>
  <link href=/asrsajj/90_asrs/sgkb/paiban_v/js/app.cd33641c.js rel=preload as=script>
  <link href=/asrsajj/90_asrs/sgkb/paiban_v/js/chunk-vendors.8de52573.js rel=preload as=script>
  <link href=/asrsajj/90_asrs/sgkb/paiban_v/css/chunk-vendors.d125ae16.css rel=stylesheet>
  <link href=/asrsajj/90_asrs/sgkb/paiban_v/css/app.e913810d.css rel=stylesheet>
  <script>
  var departmentId = '<%=((cn.com.gsoft.base.listener.UserSession) request.getSession().getAttribute("userSession")).getDepartmentId()%>';
  </script>
</head>
<body onmousewheel="top.document.body.scrollTop-=event.wheelDelta">
<noscript><strong>We're sorry but vue-antd-pro doesn't work properly without JavaScript enabled. Please enable it to
  continue.</strong></noscript>
<div id=app></div>
<script src=/asrsajj/90_asrs/sgkb/paiban_v/js/chunk-vendors.8de52573.js></script>
<script src=/asrsajj/90_asrs/sgkb/paiban_v/js/app.cd33641c.js></script>
</body>
</html>