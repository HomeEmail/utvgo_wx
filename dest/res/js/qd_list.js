function getTypeData(){var e=serverAddress+"/utvgoClient/appAPI/GetTypeJson.jsp";$.ajax({type:"GET",url:e,data:{supplierId:supplierId,channelId:channelId,pageSize:pageSize,pageNo:pageNo,publishYear:yearId,typeId:typeId,areaId:areaId},dataType:"json",success:function(e){hideLoading(),renderTypeData(e),ajaxMore||getNewData("new")},error:function(e,t){alert("network error!")}})}function renderTypeData(e){var t="",i=[],a=0,p=0,s="",n="";for(t+='<div id="listType-type" class="listType-row listType-type swiper-container"><div class="swiper-wrapper">',i=e.types||[],a=0,p=i.length,t+='<div class="swiper-slide listType-item on" data-id="0"><div class="listType-item-text">全部类型</div></div>';a<p;a++)s=i[a].typeName,t+='<div class="swiper-slide listType-item '+n+'" data-id="'+i[a].typeId+'"><div class="listType-item-text">'+s+"</div></div>";t+="</div></div>",$("#listTypeBox").html(t),t=t.replace('id="listType-type"','id="listType-type-fixed"'),$("#listTypeBoxFixed").html(t),initListTypeSwiper(),initListTypeEvent()}function initListTypeEvent(){$(".listType-type .listType-item").on("tap",function(e){typeId=$(this).attr("data-id"),typeName=$(this).children().html(),$(".listType-type .listType-item.on").removeClass("on"),$("#listType-type .listType-item").eq($(this).index()).addClass("on"),$("#listType-type-fixed .listType-item").eq($(this).index()).addClass("on");try{ajaxMore.abort()}catch(t){}getNewData("new"),setListTypeSelectedBox()})}function setListTypeSelectedBox(){$(".listTypeSelectedBox").html("当前选择: "+typeName)}function getNewData(e){var e=e||"new";"new"==e?pageNo=1:pageNo++,"new"==e&&showLoading();var t=serverAddress+"/utvgoClient/interfaces/qiangDang_getQDList.action";ajaxMore=$.ajax({type:"GET",url:t,data:{supplierId:supplierId,channelId:channelId,pageSize:pageSize,pageNo:pageNo,publishYear:yearId,typeId:typeId,areaId:areaId},dataType:"json",success:function(t){hideLoading(),renderListData(t.result||[],e)},error:function(e,t){ajaxMore=null,alert("network error!")}})}function renderListData(e,t){for(var i="",e=e||[],a=0,p=e.length;a<p;a++)i+='<div class="rdzx-item"> <a href="qd_list_set.html?qdId='+e[a].id+"&qdName="+encodeURIComponent(e[a].name)+'" class="rdzx-item-link"><img src="'+e[a].img+'" /> <p class="rdzx-text">'+e[a].name+'<br/><span class="rdzx-text-source">来源:'+e[a].tvName+"</span></p></a> </div>";t&&"new"!=t?$("#listContentBox").append(i):$("#listContentBox").html(i),$(".nomore").length>0?$(".nomore").hide():$("#listContent").append('<div class="nomore">正在加载...</div>'),e.length<pageSize?($(".nomore").show().html("没有更多了!"),ajaxMore=!0):ajaxMore=null}function updateListTypeFixedSwiper(){listTypeTypeFixed.reInit()}function initListTypeSwiper(){listTypeType=new Swiper("#listType-type",{paginationClickable:!0,slidesPerView:"auto",freeMode:!0}),listTypeTypeFixed=new Swiper("#listType-type-fixed",{paginationClickable:!0,slidesPerView:"auto",freeMode:!0})}$(".list-page-main").on("scroll",function(e){var t=$(this),i=t.scrollTop(),a=t.height();if(i<=54?($(".listTypeBox").show(),$(".listTypeBox.fixed").hide(),$(".listTypeSelectedBox").hide()):($(".listTypeBox").hide(),$(".listTypeSelectedBox").show()),i+a-46+5>=$("#listContent").height()){if(ajaxMore)return;$(".nomore").length>0?$(".nomore").show().html("正在加载..."):$("#listContent").append('<div class="nomore">正在加载...</div>'),getNewData("more")}});var ajaxMore=null;$(".listTypeSelectedBox").on("tap",function(e){e.stopPropagation(),e.preventDefault(),e.stopImmediatePropagation(),$(this).hide(),$(".listTypeBox.fixed").show(),updateListTypeFixedSwiper()});var channelId,pageNo,typeId,areaId,yearId,pageSize,supplierId,spName,channelName,urlParaObj=getUrlPara();channelId=12,supplierId=urlParaObj.supplierId||"",spName=urlParaObj.spName||"",channelName=urlParaObj.channelName||"",pageNo=1,typeId=0,areaId=0,yearId=0,pageSize=10;var typeName="全部类型";getTypeData();var listTypeType,listTypeTypeFixed;