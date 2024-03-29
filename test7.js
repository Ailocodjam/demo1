/**
 * create by lgmcolin 2013/4/4
 */

window.onload = function(){
    init(); 
}
function init(){
    var oOpen = $("open");
    var oShow = $("show");
    var btn = true;
    var oList = $("list");  
    var oList_ul = $("list_ul");
    var oList_li = oList_ul.getElementsByTagName("li");
    
    var oWebIm = $("webIm");
    var oList_src = $("list_src");
    var oList_title = $("list_title");
    var oSetting = $("setting");
    var oMin = $("min");
    var oClose = $("close");
    var oSetUl = $("set_ul");
    var aSetLi = oSetUl.getElementsByTagName("li");

    var goTop = $("go_top");
    var oContent_ul = $("content_ul");
    var aContent_li = oContent_ul.getElementsByTagName("li");
    var goBot = $("go_bot"); 
    
    var oSendUp = $("send_up");
    var listScroll = $("scroll");
    var oContent = $("content");
    
    var oBtn_list = $("btn_list");
    var oBtn_list_ul = oBtn_list.getElementsByTagName("ul")[0];
    var oBtn_list_li = oBtn_list.getElementsByTagName("li");
    console.log('here');
    //获取在线的人
    ajax('/getPerson',function(str){
        console.log('gag'+str);
        var json = eval('('+str+')');
        for(var i=0,j=json.list.length;i<j;i++){
            var oLi = document.createElement("li"); 
            oLi.innerHTML = '<div class="list_li">'+'<img src="/images/'+json.list[i].src+" title="+json.list[i].title+"/></div>";
            oLi.name = oLi.list[i].name;
            oLi.title = oLi.list[i].title;
            oList_ul.appendChild(oLi);
        }
    }); 
    getList();
    //阻止冒泡
    oWebIm.onClick = function(ev){
        if(window.event){
            ev.cancelBubble = true; 
        }else{
            ev.stopPropagation(); 
        } 
    }
    oList.onClick = function(ev){
        if(window.event){
            ev.cancleBubble = true; 
        }else{
            ev.stopPropagation(); 
        }
    }
        
    //
    oOpen.onClick = function(){
        if(btn){
            oShow.innerHTML = "隐藏聊天";
            startRun(oList,{right:0});
            btn = false;
            for(var i=0;i<oList_li.length;i++){
                oList_li[i].index = i;
                addEvent(oList_li[i],"click",function(){
                    if(getStyle(oWebIm,"display")=="none"){
                          oWebIm.className="webim_now";
                          oList_src.src = "";
                          oList_title.innerHTML = "";
                          oContent.innerHTML="";
                          oList_src.src="images/"+this.title+".jpg";
                          oList_title.innerHTML = this.title;
                          oWebIm.style.display = "block";
                          oOpen.style.display = "none";
                          getList(); //获取聊天信息
                          startMove(oSendUp,listScroll,oContent);
                          

                    } 
                
                });                       
            }
        }else{
        
        } 
    }
}

function ajax(url,fnSuccess,fnFail){
    console.log('ajax');
    var oAjax = null;
    if(window.ActiveXObject){
        oAjax = new ActiveXObject("Msxml.XMLHTTP") || new ActiveXObject("Microsoft.XMLHTTP"); 
    }else{
        oAjax = new XMLHttpRequest();
    }
    oAjax.open('get',url,true);
    oAjax.onreadystatechange = function(){
        if(oAjax.readyState==4){
            if(oAjax.status ==200){
                console.log("请求结果："+oAjax.responseText); 
                if(fnSuccess){
                    fnSuccess(oAjax.responseText); 
                }
            }else{
                if(fnFail){
                    fnFail(oAjax.status); 
                } 
            } 
        } 
    };
    oAjax.send();
    oAjax.onreadystatechange = null;
    oAjax = null;
}

function ajaxPost(url,sData,fnSuccess,fnFail){ 
    var oAjax = null;
    if(window.ActiveXObject){
        oAjax = new ActiveXObject("Msxml2.XMLHTTP")||new ActiveXObject("Microsoft.XMLHTTP");
    }else{
        oAjax = new XMLHttpRequest(); 
    }
    oAjax.open();
    oAjax.onreadystatechange = function(){
        if(oAjax.readyState == 4){
            if(oAjax.status == 200){
                if(fnSuccess){
                    fnSuccess(oAjax.responseText); 
                }
            }else{
                    if(fnFail){
                        fnFail(oAjax.status); 
                    } 
            } 
        } 
    };
    oAjax.sendRequestHeader('content-type','urlencode');
    oAjax.send(sData);
}

function $(id){
    return document.getElementById(id);
}

function startRun(){

}

function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr]; 
    }
};

function getList(){
    ajax("/getChat",function(str){
         oContent.innerHTML = "";
         var json = eval('('+str+')');
         for(var i=0,j=json.list.length;i<j;i++){
             var oDiv = document.createElement('div');
             if(json.list[i].type == "speak"){
                oDiv.className = "content_r"; 
             }else{
                oDiv.className = "content_l"; 
             }
             oDiv.innerHTML = '<div class="time">'+json.list[i].time+'</div>'+'<div class="speak"><p>'+json.list[i].content+'</p></div>'
             oContent.append(oDiv);
             startMove(oSendUp,listScroll,oContent);
             setTimeout(function(){
                goScroll(listScroll,oContent); 
             },200);
         }
    });
}

function startMove(oParent,obj,oContent){
    
}

function addEvent(obj,event,fn){
    if(obj.addEventListener){
        obj.addEventListener(event,fn,true); 
    }else{
        obj.attachEvent("on"+event,function(){
            fn.call(obj); 
        }); 
    }
}

