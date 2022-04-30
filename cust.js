$(function(){
    if(IsLogin()) getData('message/list', messageList, { messageType : 2});
    function messageList(data){
        if (data.status == 200) {
            var notice = false;
            var ln = data.data.messageList.length;
            var md = data.data.messageList;
            for (var i = 0; i < ln; i++) {
                if(!md[i].isRead){
                    notice = true;
                    break;
                }
            }
            if(notice) $("#goMemberCenter").addClass("notice");
            if(!notice) $(".nav-icon-user .nav-icon-dotted").hide();
        }
    }
})
setTimeout(function(){$(".page-loader").fadeOut(600)},1000);

$(document).on('click', '.user-log, .go-login', function(e){
  if (parseInt(getCookie("dbCrashFlag")) != 911 ){
    setRedir();
    location.href = login_url;
  }
});

$(document).on('click', '.user-register', function(e){
  if (parseInt(getCookie("dbCrashFlag")) != 911 ){
    setRedir();
    location.href = register_url;
  }
});

$(document).on('click', '.go-packages', function(e){
    location.href = "/packages";
});

function movieURI(ctype, cid){
    switch (ctype.toString()) {
    case "1":
        return "/movie/detail/" + cid ;
        break;
    case "2":
        return "/drama/detail/" + cid ;
        break;
    case "3":
        return "/anime/detail/" + cid ;
        break;
    case "4":
        return "/show/detail/" + cid ;
        break;
    }
}

function propertyTagList(cType, isEmpty, effectiveDate, propertyTagList, newestEpisode, totalEpisode, expireDate){
    var ptDesc = "" ;
    if (isEmpty) {
        var eDate = new Date(effectiveDate); 
        var month = ("0" + (eDate.getMonth() + 1)).slice(-2); 
        var date = ("0" + eDate.getDate()).slice(-2); 
        ptDesc = "<h6 class=\"tag-top\"><span>" + month + "/" + date + "即將上映</span></h6>";
    } else {
        var pt = propertyTagList;
        if (pt) {
            var ptDesc = "";
            for (var p = 0; p < pt.length; p++) {
                var propertyTag = parseInt(pt[p]);
                ptDesc = "";
                if (propertyTag == 3) {
                    ptDesc = "<h6 class=\"tag-top\"><span>跟播中</span></h6>";
                } else {
                    switch (propertyTag) {
                        case 1:
                            ptDesc = "<h6 class=\"tag-top\"><span class=\"tag-note\">獨家</span></h6>";
                            break;
                        case 6:
                            ptDesc = "<h6 class=\"tag-top\"><span class=\"tag-4k\">4K</span></h6>";
                            break;
                        case 2:
                            ptDesc = "<h6 class=\"tag-top\"><span>院線</span></h6>";
                            break;
                        case 4:
                            ptDesc = "<h6 class=\"tag-top\"><span>新上架</span></h6>";
                            break;
                        case 5:
                            var exDate = "";
                            if(expireDate !== undefined && expireDate != "") exDate = expireDate.substr(-5); 
                            ptDesc = "<h6 class=\"tag-top\"><span>" + exDate + "即將下架</span></h6>";
                            break;
                        case 7:
                            ptDesc = "<h6 class=\"tag-top\"><span class=\"tag-mv\">多視角</span></h6>";
                            break;
                    }
                }
                if(ptDesc != "") { break; }
            }
        }
    }
    return ptDesc;
}

function paymentTagList(pTList){
    var ptDesc = "";
    var showTvodTag = true ;
    var showTicket = true;
    
    if(pTList.length >1) {
        const index = pTList.indexOf(4);
        if (index > -1) {
        	pTList.splice(index, 1);
        }
    }
    
    if((pTList.indexOf(2) != -1 || pTList.indexOf(3) != -1) && pTList.indexOf(4) != -1 )
    	showTicket = false
    if (pTList) {
        for (var p = 0; p < pTList.length; p++) {
            switch (pTList[p]) {
                case 0:
                    showTvodTag = false;
                    ptDesc += "<span class=\"tag-free\">免費</span>";
                    break;
                case 1:
                    showTvodTag = false;
                    ptDesc += ""; // <span class="tag-drama">影劇</span>
                    break;
                case 2:
                	if(showTvodTag) 
                		ptDesc += "<span class=\"tag-usetic\" >用券</span>";
                	break;
                case 3:
                    if(showTvodTag) ptDesc += "<span>單次付費</span>";
                    break;
                case 4:
                	if(showTvodTag && showTicket) ptDesc += "<span class=\"tag-est\">數位珍藏</span>";
                    break;
                case 5:
                    // ptDesc += "<span class=\"tag-pili\">霹靂</span>";
                    break;
            }
        }
        if(ptDesc != "") ptDesc = "<h6 class=\"tag-btm\">"+ ptDesc +"</h6>";
    }
    return ptDesc;
}

function propertyTagListV2(cType, isEmpty, effectiveDate, propertyTagList, newestEpisode, totalEpisode, expireDate){
    var ptDesc = "" ;
    if (isEmpty) {
        var eDate = new Date(effectiveDate); 
        var month = ("0" + (eDate.getMonth() + 1)).slice(-2); 
        var date = ("0" + eDate.getDate()).slice(-2); 
        ptDesc = "<h6 class=\"feature-item purple\"><span>" + month + "/" + date + "即將上映</span></h6>";
    } else {
        var pt = propertyTagList;
        if (pt) {
            var ptDesc = "";
            for (var p = 0; p < pt.length; p++) {
                var propertyTag = parseInt(pt[p]);
                ptDesc = "";
                if (propertyTag == 3) {
                    ptDesc = "<div class=\"feature-item purple\">跟播中</div>";
                } else {
                    switch (propertyTag) {
                        case 1:
                            ptDesc = "<div class=\"feature-item red\">獨家</div>";
                            break;
                        case 6:
                            ptDesc = "<div class=\"feature-item orange\">4K</div>";
                            break;
                        case 2:
                            ptDesc = "<div class=\"feature-item purple\">院線</div>";
                            break;
                        case 4:
                            ptDesc = "<div class=\"feature-item purple\">新上架</div>";
                            break;
                        case 5:
                            var exDate = "";
                            if(expireDate !== undefined && expireDate != "") exDate = expireDate.substr(-5); 
                            ptDesc = "<div class=\"feature-item purple\">" + exDate + "即將下架</div>";
                            break;
                        case 7:
                            ptDesc = "<div class=\"feature-item multiblue\">多視角</div>";
                            break;
                    }
                }
                if(ptDesc != "") { break; }
            }
        }
    }
    return ptDesc;
}

function paymentTagListV2(pTList){
    var ptDesc = "";
    var showTvodTag = true ;
    var showTicket = true;
    
    if(pTList.length >1) {
        const index = pTList.indexOf(4);
        if (index > -1) {
            pTList.splice(index, 1);
        }
    }
    
    if((pTList.indexOf(2) != -1 || pTList.indexOf(3) != -1) && pTList.indexOf(4) != -1 )
        showTicket = false
    if (pTList) {
        for (var p = 0; p < pTList.length; p++) {
            switch (pTList[p]) {
                case 0:
                    showTvodTag = false;
                    ptDesc += "<div class=\"program-item pink\">免費</div>";
                    break;
                case 1:
                    showTvodTag = false;
                    ptDesc += ""; // <div class=\"program-item purple\">影劇</div>
                    break;
                case 2:
                    if(showTvodTag) 
                        ptDesc += "<div class=\"program-item purple\">用券</div>";
                    break;
                case 3:
                    if(showTvodTag) ptDesc += "<div class=\"program-item blue\">單次付費</div>";
                    break;
                case 4:
                    if(showTvodTag && showTicket) ptDesc += "<div class=\"program-item green\">數位珍藏</div>";
                    break;
                case 5:
                    // ptDesc += "<div class=\"program-item purple\">霹靂</span>";
                    break;
            }
        }
        // if(ptDesc != "") ptDesc = "<div class=\"program-item purple\">"+ ptDesc +"</div>";
    }
    return ptDesc;
}

$("body").on("click", ".autoplay", function(e){
    e.preventDefault();
    setCookie("recommend_autoplay", "1");
    location.href = movieURI($(this).attr("ctype"), $(this).attr("cid"));
})

function popup_login(msg, cancelUrl){
    if(msg) $("#login-modal h4").html(msg);
    $.magnificPopup.open({
        modal: true,
        removalDelay: 300,
        mainClass: "mfp-fade",
        items: {
            src: "#login-modal",
            type: "inline"
        },callbacks: {
            open: function() {
                $('html').css('margin-right',0);
            }
        }
    })
    if(cancelUrl){
        $(".login-cancel").on("click",function(e){location.href = cancelUrl ;});     
    }else{
        $(".login-cancel").on("click",function(e){$("#login-modal").magnificPopup("close")});   
    }
}

function popup_block(popupSrc, msg, cancelUrl){
    if(msg) $(popupSrc).find("h4").html(msg);
    $.magnificPopup.open({
        modal: true,
        removalDelay: 300,
        mainClass: "mfp-fade",
        items: {
            src: popupSrc,
            type: "inline"
        },callbacks: {
            open: function() {
                $('html').css('margin-right',0);
            }
        }
    })
    if(cancelUrl != ""){
        $(".login-cancel").on("click",function(e){location.href = cancelUrl ;});     
    }else{
        $(".login-cancel").on("click",function(e){$(popupSrc).magnificPopup("close")});   
    }
}

function msg_popup(msg){
    if(msg) $("#msg-modal h4").text(msg);
    $.magnificPopup.open({
      items: {
        src: "#msg-modal" ,
        type: 'inline'
      },
      removalDelay: 300,
      mainClass: 'mfp-fade',
      closeOnContentClick : false,
      closeOnBgClick : true,
      showCloseBtn : false,
      enableEscapeKey : true,
      callbacks: {
        close:function(){
        }
      },
    }, 0);   
}

function msg_popup2(msg){
    if(msg) $("#msg-modal2 h4").text(msg);
    $.magnificPopup.open({
      items: {
        src: "#msg-modal2" ,
        type: 'inline'
      },
      removalDelay: 300,
      mainClass: 'mfp-fade',
      closeOnContentClick : false,
      closeOnBgClick : true,
      showCloseBtn : false,
      enableEscapeKey : true,
      callbacks: {
        close:function(){
        }
      },
    }, 0);   
}

function popup_block_msg(popupSrc, title, msg, cancelUrl){
    if(title) $(popupSrc).find("h4").html(title);
    if(msg) $(popupSrc).find(".contractInfo").html(msg);
    $.magnificPopup.open({
        modal: true,
        removalDelay: 300,
        mainClass: "mfp-fade",
        items: {src: popupSrc,type: "inline"
        },callbacks: {
            open: function() {$('html').css('margin-right',0);}
        }
    })
    if(cancelUrl != ""){
      $(".login-cancel").on("click",function(e){location.href = cancelUrl ;});     
    }else{
      $(".login-cancel").on("click",function(e){$(popupSrc).magnificPopup("close")});   
    }
}

function getDatac(){
	var cl,ca,sv,check=0;
	var updateTimer;
	var flag = true;
	var updateFlag = false;
	setInterval(function(){
		if (flag) {
			var date = new Date();
			date.setSeconds(date.getSeconds()+2);
			var checktime = date.getFullYear().toString() +"/"+ pad2(date.getMonth() + 1) +"/"+ pad2(date.getDate()) +" "
								+ pad2(date.getHours()) +":"+ pad2(date.getMinutes()) +":"+ pad2(date.getSeconds());

			getData('lvc/get', function(data) {
				if (data.status == 200){
					flag = false;
					cl = data.cl;
					ca = data.ca;
										
					if (cl!=0) {
						cl = cl.substring(cl.length-2) + cl.substring(2,cl.length-2) + cl.substring(0,2);
						var hour;
						updateTimer = setInterval(function(){
							var dt = new Date();
							if (dt.getMinutes() >= 30) {
								var v1 = ((dt.getMinutes()-30)*60 + dt.getSeconds()) * ca;
								sv = Number(cl) + Number(v1);
							} else {
								var v1 = (dt.getMinutes()*60 + dt.getSeconds()) * ca;
								sv = Number(cl) + Number(v1);
							}
							
							var rnd = getRI(-5,6);			
							sv = sv + rnd;
							if (((dt.getMinutes()==29 && dt.getSeconds()>58) || (dt.getMinutes()==30 && dt.getSeconds()<=30) 
									|| (dt.getMinutes()==59 && dt.getSeconds()>58) || (dt.getMinutes()==0 && dt.getSeconds()<=30))) {
								if (!updateFlag) {
									updateFlag = true;
									flag = true;
									clearInterval(updateTimer);							
								}
							} else {
								updateFlag = false;
							}
							$("#ttv").html("<span><img src=\"/img/icon/eye-open.png\" alt=\"\" width=\"24\" /></span><p style=\"display:inline;\">&nbsp;&nbsp;"+sv+"</p>");
						},1000);
					}
				} else{
					check = check+1;
					if (check>=3) {
						flag = false;
					}
				}
			},{checktime:checktime});
		}
	},1000);
}

function system_popup(title, body, url){
    var pLanding = encodeURI(sessionStorage.getItem("pLanding"));
    var title = encodeURI(title);
    var body = encodeURI(body);
	
	if(title) $("#alert-modal h4").text(decodeURI(title));
    $("#alert-modal #popup-pBody").html(decodeURI(body));
    $("#alert-modal #popup-pAlert").html("<input id=\"nonAlert_"+ decodeURI(pLanding) +"\" type=\"checkbox\"><label for=\"nonAlert_"+ decodeURI(pLanding) +"\"></label><span class=\"label-text\">本日不再提醒</span>");

    if(url) {
    	$("#alert-modal #popup-pUrl-area").html(
    		"<button type=\"button\" class=\"btn btn-info btn-dismiss\" onclick=\"checkSystemPopNoAlert();\">取消</button>"+
        	"<button type=\"button\" class=\"btn btn-primary\" onclick=\"window.open('"+pUrl+"');\">前往下載</button>"
        );
    }
    		
    $.magnificPopup.open({
      modal: true,
      removalDelay: 300,
      mainClass: "mfp-fade",
      items: {
        src: "#alert-modal" ,
        type: 'inline'
      },
      showCloseBtn : false,
      callbacks: {
          open: function() {
              $('html').css('margin-right',0);
          }
      }
    });
}

function deviceCancel(obj) {
	var e = obj;
	var i = $('.device-block > ul > li').index($(e).parent()) + 1;

	getData("device/cancel", function(data) {

		$(obj).parent().addClass("unset");

		$(obj).parent().html(
				'<div class="device-msg">' + '第' + i + '台裝置<br/>尚未設定'
						+ '</div>').fadeIn("slow");
		eraseCookie("deviceOver");
		window.location.reload();
		document.URL=location.href;
	}, {
		deviceId : $(obj).attr('did')
    console.log(deviceId)
	})
}

function checkSystemPopNoAlert() {
	var pLanding = sessionStorage.getItem("pLanding");
	if($("#alert-modal #nonAlert_"+pLanding).prop("checked")) {
		var currentDate = new Date();
		var expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 0, 0, 0);
		var expires = "expires=" + expirationDate.toUTCString();
		document.cookie = "syspop_noalert_"+pLanding + "=" + encodeURIComponent(1) + "; " + expires + "; path=/";
	}
}

function checkSystemPop(landing) {
	if(getCookie("syspop_noalert_"+landing)==""){
		getData("popup/get", function(e){
			if (e.status == 200){
				pUrl = e.data.url;
				pTitle = e.data.title;
				pBody = e.data.popupBody;
				if (pBody) {
					sessionStorage.setItem("pLanding", landing);
					system_popup(pTitle, pBody, pUrl)
				}
			}	
		}, {
			version: commonBrowserVersion,
			landing: landing,
			browser: commonBrowserName,
			platform: "PC Web"
		});
	}
}

// 編輯小標
function cabinetPro(){
    $(".cabinet").each(function(){
        var is_pro_t = 0;
        $this = $(this);
        $this.find(".pro_t").each(function(){
            if($(this).html()!=""){
                is_pro_t = 1;
                return ;
            }
        })
        if(!is_pro_t){
            $this.find(".pro_t").remove();
        }
    })
}

function getPaymentTag_html(strPaymentTag, showTvodTag){
    PaymentTag_html = '';
    switch(strPaymentTag){
    case '免費':
        PaymentTag_html = '<div class="program-item pink">免費</div>';
        break;
    case '影劇':
        PaymentTag_html = ''; // <span class="tag-drama">影劇</span>
        break ;
    case '用券':
        if(showTvodTag) PaymentTag_html = '<div class="program-item purple">用券</div>';
        break;
    case '單片':
        if(showTvodTag) PaymentTag_html = '<div class="program-item blue">單次付費</div>';
        break;
    case '數位珍藏':
        if(showTvodTag) PaymentTag_html = '<div class="program-item green">數位珍藏</div>';
        break;
    }
    return PaymentTag_html;
}

function getPropertyTag_html(strPropertyTag){
	PropertyTag_html = '';
    switch(strPropertyTag){
    case '獨家':
    	PropertyTag_html = '<div class="feature-item red">'+strPropertyTag+'</div>';
        break;
    case '4K':
    	PropertyTag_html = '<div class="feature-item orange">'+strPropertyTag+'</div>';
        break ;
    case '新上架': case '院線':
    	PropertyTag_html = '<div class="feature-item purple">'+strPropertyTag+'</div>';
        break;
    case '多視角':
    	PropertyTag_html = '<div class="feature-item multiblue">'+strPropertyTag+'</div>';
        break;
    }
    return PropertyTag_html;
}

function pad2(n) { return n < 10 ? '0' + n : n }

function msg_popup_func(popupButtonClass, msg, tempFunc){
	
	if(msg) $('#msg-modal_func').find("h4").html(msg);
	
    $.magnificPopup.open({
      items: {
        src:  '#msg-modal_func',
        type: 'inline'
      },
      removalDelay: 300,
      closeBtnInside:false,
      mainClass: 'mfp-fade',
    }, 0); 
    
    $('#msg-modal_func :button').addClass(popupButtonClass);
    
    $('.'+popupButtonClass).click(function(){
    	
    	if(tempFunc != ""){
    		tempFunc();
    	}
    	
    	$('#msg-modal_func').magnificPopup("close");
    })
   
}
