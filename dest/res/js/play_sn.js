function urlParaInit(e){urlParaObj=getUrlPara(e||""),type=urlParaObj.type||"",col=urlParaObj.col||"2",playUrl=urlParaObj.playUrl||"",playImg=urlParaObj.playImg||"",playName=urlParaObj.playName||"",mediaNumber=urlParaObj.mediaNumber||1,contentId=urlParaObj.contentId||0,currentIndex=0,col>2&&(isDuoji=!0)}function getLikeList(){$.ajax({type:"GET",url:serverAddress+"/utvgoClient/interfaces/content_getExtraInfo.action",data:{contentId:contentId,userId:userId},dataType:"json",success:function(e){return 0!=e.status?void alert(e.result):void renderLikeList(e)},error:function(e,t){alert("network error!")}})}function renderLikeList(e){var t="",i=e.result||[];likeDataList=i;for(var a=0,n=i.length;n>a;a++)t+='<div class="rdzx-item"> <a data-href="./play_sn.html?playName='+encodeURIComponent(i[a].name)+"&playUrl="+encodeURIComponent(i[a].playUrl)+"&playImg="+encodeURIComponent(i[a].img)+"&contentId="+encodeURIComponent(i[a].contentId)+"&col=2&type="+encodeURIComponent(i[a].type)+"&mediaNumber="+encodeURIComponent(i[a].mediaNumber)+'" class="rdzx-item-link"><img src="'+i[a].img+'" /> <p class="rdzx-text">'+i[a].name+"</p></a> </div>";$("#likeListBox").html(t),$("#likeListBox .rdzx-item-link").on("tap",function(e){var t=$(this).parent().index();urlParaInit($(this).attr("data-href")),setVideoTitle(playName),setVideoInfo(playUrl,playImg),setVideoIntroduce(likeDataList[t].remark||playName),document.getElementById("videoView").play(),$(".video-play-play-icon").hide(),$(".video-play-img").hide(),isDuoji&&($(".detail-jiList-item").off(),getDuojiList())})}function getDuojiList(){$.ajax({type:"GET",url:serverAddress+"/utvgoClient/interfaces/content_listContentTvs.action",data:{contentId:contentId},dataType:"json",success:function(e){return 0!=e.status?void alert(e.result):(duojiDataList=e.result||[],void renderDuojiList(e))},error:function(e,t){alert("network error!")}})}function renderDuojiList(e){for(var t=e.result||[],i="",a=0,n=t.length;n>a;a++)i+='<a data-playurl="'+t[a].playUrl+'" data-img="'+t[a].img+'" title="'+t[a].title+'" class="detail-jiList-item">'+t[a].mediaNum+"</a>";$("#duojiListBox").html(i),$(".detail-jiList-item").on("tap",function(e){var t=$(this),i=t.index();currentIndex=i;var a=t.attr("data-playurl"),n=(t.attr("title"),t.attr("data-img"));setVideoInfo(a,n),document.getElementById("videoView").play(),$(".detail-jiList-item.on").removeClass("on"),t.addClass("on"),$(".video-play-play-icon").hide(),$(".video-play-img").hide()}),$(".detail-jiList-item").eq(0).addClass("on")}function playDuojiNext(){var e=duojiDataList.length;currentIndex+1>=e||$(".detail-jiList-item").eq(++currentIndex).trigger("tap")}function renderVideoIntroduce(e){$("#videoIntroduceBox").html(e)}function renderDetailTab(e){var t="";t+='<div class="detailTabBar col'+col+' clearfix">',3==col&&(t+='<div class="detailTabItem on"> <span class="detailTab-text">选集</span> </div>'),t+='<div class="detailTabItem"> <span class="detailTab-text">猜你喜欢</span> </div> <div class="detailTabItem"> <span class="detailTab-text">简介</span> </div>',t+="</div>",t+='<div class="detailTabContentBox overflow-scroll-y">',3==col&&(t+='<div id="duojiListBox" class="detailTabItemContent detail-jiList clearfix">  </div>'),t+='<div id="likeListBox" class="detailTabItemContent indexContentBox clearfix"> </div> <div id="videoIntroduceBox" class="detailTabItemContent"> </div>',t+="</div>",$(".detailTabBox").each(function(e,i){$(i).html(t)}),detailTabInitShow()}function init(){setVideoTitle(playName),setVideoInfo(playUrl,playImg),isDuoji&&getDuojiList(),getLikeList(),setVideoIntroduce(localStorage.getItem("videoRemark")||playName),document.getElementById("videoView").addEventListener("ended",function(e){isDuoji&&playDuojiNext()})}function setVideoInfo(e,t){playUrl&&(document.getElementById("videoView").src=e),t&&$(".video-play-img").css("background-image","url("+t+")")}function setVideoIntroduce(e){var t='<div class="detail-profile"> <p>'+e.replace("\r\n","</p><p>")+"</p></div>";$("#videoIntroduceBox").html(t)}function setVideoTitle(e){document.title=e,$(".video-play-title").html(e)}var urlParaObj=getUrlPara(),contentId=0,type="",col="2",playUrl="",playImg="",playName="",mediaNumber=1,playDataList=[],likeDataList=[],duojiDataList=[],currentIndex=0,isDuoji=!1;$(".video-play-wrapper").one("touchstart",function(e){$(".video-play-play-icon").hide(),$(".video-play-img").hide(),document.getElementById("videoView").play()}),$(".video-top-bar-back").on("tap",function(e){window.history.back()}),isWeiXin()&&($(".video-top-bar").hide(),$(".video-play-wrapper").css("padding-top","0px")),urlParaInit(),renderDetailTab(),init();