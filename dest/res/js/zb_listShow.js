function getTvShowList(){$.ajax({type:"GET",url:serverAddress+"/utvgoClient/interfaces/tvShow_listTvShow.action?tvId="+urlParaObj.contentId+"&userId=",data:{},dataType:"json",success:function(e){var t=e.result||[];0==e.status&&renderTVShow(t)},error:function(e,t){}})}function renderTVShow(e){for(var t=$("#detailTabContentBox_0"),a=e,s="",i="",l="",o="",n="",d={1:"一",2:"二",3:"三",4:"四",5:"五",6:"六",0:"日"},r=0,v=a.length;v>r;r++){s=a[r].showDate.split("-").slice(1).join("-"),i=a[r].tvShows,n+='<li class="weekItem " ><div class="text">周'+d[""+new Date(a[r].showDate).getDay()]+'<br><span class="tvShowDate">'+s+"</span></div></li>";for(var c=0,p=i.length;p>c;c++){var h=new Date(i[c].showTime.replace(/-/g,"/"))-new Date;0>h?(isOverClass="isOver",isOverTips="已结束"):i[c].showId==contentId?(isOverClass="onPlay",isOverTips="正在<br>播放"):(isOverClass="notStart",isOverTips=""),l+='<li data-showid="'+i[c].showId+'" class="listItem '+isOverClass+'"> <div class="icon "><b class="top"></b><b class="bottom"></b><i></i><span class="playTipsText">'+isOverTips+'</span></div> <div class="tvShowItem ellipsis"> <span class="tvShowtime">'+i[c].showTime+"&nbsp;&nbsp;"+i[c].showName+"</span> </div> </li>"}i.length<=0&&(l='<li class="listItem nolist">没有资源</li>'),o+='<ul class="tvListBox overflow-scroll-y ">'+l+"</ul>",l=""}n='<ul class="weekBox">'+n+"</ul>",t.append(n),$("#detailTabContentBox_0 .weekBox  .weekItem").eq(0).addClass("on"),t.append(o),$("#detailTabContentBox_0 .tvListBox").eq(0).addClass("show");var w=$(window).height()-.37*$(window).height()-80;$("#detailTabContentBox_0 .tvListBox").height(w)}function getBackShowsList(){$.ajax({type:"GET",url:serverAddress+"/utvgoClient/interfaces/tvShow_listPlayBackTvShow.action?tvId="+contentId+"&userId=",data:{},dataType:"json",success:function(e){var t=e.result||[];0==e.status&&BackShowsList_render(t)},error:function(e,t){}})}function BackShowsList_render(e){for(var t=$("#detailTabContentBox_1"),a=e,s="",i="",l="",o="",n="",d={1:"一",2:"二",3:"三",4:"四",5:"五",6:"六",0:"日"},r=0,v=a.length;v>r;r++){s=a[r].showDate.split("-").slice(1).join("-"),n+='<li class="weekItem " ><div class="text">周'+d[""+new Date(a[r].showDate).getDay()]+'<br><span class="tvShowDate">'+s+"</span></div></li>",i=a[r].playBackShows;for(var c=0,p=i.length;p>c;c++)l+='<li data-playurl="'+i[c].cliPlayUrl+'" data-tvname="'+i[c].showName+'" data-showid="'+i[c].backId+'" class="listItem on"> <div class="icon "><b class="top"></b><b class="bottom"></b><i></i><span class="playTipsText"></span></div> <div class="tvShowItem ellipsis"> <span class="tvShowtime">'+i[c].showTime+"&nbsp;&nbsp;"+i[c].showName+"</span> </div> </li>";i.length<=0&&(l='<li class="listItem nolist">没有资源</li>'),o+='<ul class="tvListBox overflow-scroll-y ">'+l+"</ul>",l=""}n='<ul class="weekBox">'+n+"</ul>",t.append(n),$("#detailTabContentBox_1 .weekBox  .weekItem").eq(0).addClass("on"),t.append(o),$("#detailTabContentBox_1 .tvListBox").eq(0).addClass("show");var h=$(window).height()-.37*$(window).height()-80;$("#detailTabContentBox_1 .tvListBox").height(h)}var urlParaObj=getUrlPara(),playUrl=urlParaObj.playUrl||"",contentId=urlParaObj.contentId||"",playName=urlParaObj.playName||"",islive=!1,liveAuth="?id=utvgo&uid=3a163d973ed4c23a8e150212099db671&user=vrrvrmnuwsihilggucfnhhchjidjbjijafgej&appid=10057&uuid=13BD6592188244D0A92C156532C06D372566000006566B00C122";$(document).ready(function(){getTvShowList(),getBackShowsList(),window.document.title=playName,document.getElementById("videoView").src=playUrl+liveAuth}),$(document).on("tap",".detailTabItem ",function(){var e=$(this);e.addClass("on").siblings().removeClass("on"),$(".detailTabContentBox").eq(e.index()).addClass("show").siblings().filter(".detailTabContentBox").removeClass("show")}).on("tap",".weekItem",function(){var e=$(this);e.addClass("on").siblings().removeClass("on"),e.parent().siblings().filter(".tvListBox").removeClass("show").eq(e.index()).addClass("show")}).on("tap","#detailTabContentBox_0 .listItem",function(){$(this);islive||(window.document.title=playName,document.getElementById("videoView").src=playUrl+liveAuth,$(".video-play-play-icon").hide(),$(".video-play-img").hide(),document.getElementById("videoView").play(),islive=!0)}).on("tap","#detailTabContentBox_1 .listItem",function(){var e=$(this);return e.hasClass("onPlay")?!1:(document.getElementById("videoView").src=e.attr("data-playurl")+liveAuth,window.document.title=e.attr("data-tvname"),e.addClass("onPlay").siblings().removeClass("onPlay").find(".playTipsText").html(""),e.find(".playTipsText").html("正在<br>播放"),$(".video-play-play-icon").hide(),$(".video-play-img").hide(),document.getElementById("videoView").play(),void(islive=!1))}),$(".video-play-wrapper").one("tap",function(e){$(".video-play-play-icon").hide(),$(".video-play-img").hide(),document.getElementById("videoView").play(),islive=!0}),isWeiXin()&&($(".video-top-bar").hide(),$(".video-play-wrapper").css("padding-top","0px")),$(".video-top-bar-back").on("tap",function(e){window.history.back()});