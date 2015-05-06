//JQuery Twitter Feed. Coded by Tom Elliott @ www.webdevdoor.com (2013) based on https://twitter.com/javascripts/blogger.js
//Requires JSON output from authenticating script: http://www.webdevdoor.com/php/authenticating-twitter-feed-timeline-oauth/

$(document).ready(function () {
	console.log("READY");
    var displaylimit = 10;
    
    var twitterprofile = "";
	var screenname = "";
    var showdirecttweets = false;
    var showretweets = true;
    var showtweetlinks = true;
    var showprofilepic = true;
	var showtweetactions = true;
	var showretweetindicator = true;
	
	var headerHTML = '';
	var loadingHTML = '';
	headerHTML += '<a href="https://twitter.com/" target="_blank"><img src="images/twitter-bird-light.png" width="34" style="float:left;padding:3px 12px 0px 6px" alt="twitter bird" /></a>';
	headerHTML += '<h1>'+screenname+' <span style="font-size:13px;"><a href="https://twitter.com/'+twitterprofile+'" target="_blank">Prefered Journalist Tweets</a></span></h1>';
	loadingHTML += '<div id="loading-container"><img src="images/ajax-loader.gif" width="32" height="32" alt="tweet loader" /></div>';
	
	$('#twitter-feed').html(headerHTML + loadingHTML);
	 
	$.ajax({
				url:"http://localhost:8080/api/preferedJournalists",
			    type:"POST",
			    data:JSON.stringify({
				        username: "Nathan Lee",
				        password: "norsecoders"
				    }),
			    contentType:"application/json",
				dataType:"json",
				error:function(jqXHR, textStatus, errorThrown) {
						var error = "";
						var exception = "";
							 if (jqXHR.status === 0) {
				               error = 'Connection problem. Check file path and www vs non-www in getJSON request';
				            } else if (jqXHR.status == 404) {
				                error = 'Requested page not found. [404]';
				            } else if (jqXHR.status == 500) {
				                error = 'Internal Server Error [500].';
				            } else if (exception === 'parsererror') {
				                error = 'Requested JSON parse failed.';
				            } else if (exception === 'timeout') {
				                error = 'Time out error.';
				            } else if (exception === 'abort') {
				                error = 'Ajax request aborted.';
				            } else {
				                error = 'Uncaught Error.\n' + jqXHR.responseText;
				            }	
				       		alert("error: " + error);
				    }
			}).done(
		    function(data, status) {   
            var feedHTML = '';
            var displayCounter = 1; 
            var tweets = data.timeline;
            console.log("tweets.length");
            for (var i=0; i<tweets.length; i++) {
				var tweetscreenname = tweets[i].name;
                var tweetusername = tweets[i].screen_name;
                var profileimage = tweets[i].profile_image_url_https;
                var status = tweets[i].text; 
				var isaretweet = false;
				var isdirect = false;
				var tweetid =tweets[i].id_str;

				 if (tweets[i].text.substr(0,1) == "@") {
					 isdirect = true;
				 }
				 
				 if (((showretweets == true) || ((isaretweet == false) && (showretweets == false))) && ((showdirecttweets == true) || ((showdirecttweets == false) && (isdirect == false)))) { 
					if ((tweets[i].text.length > 1) && (displayCounter <= displaylimit)) {             
						if (showtweetlinks == true) {
							status = addlinks(status);
						}
						 
						if (displayCounter == 1) {
							feedHTML += headerHTML;
						}
									 
						feedHTML += '<div class="twitter-article" id="tw'+displayCounter+'">'; 										                 
						feedHTML += '<div class="twitter-pic"><a href="https://twitter.com/'+tweetusername+'" target="_blank"><img src="'+profileimage+'"images/twitter-feed-icon.png" width="42" height="42" alt="twitter icon" /></a></div>';
						feedHTML += '<div class="twitter-text"><p><span class="tweetprofilelink"><strong><a href="https://twitter.com/'+tweetusername+'" target="_blank">'+tweetscreenname+'</a></strong> <a href="https://twitter.com/'+tweetusername+'" target="_blank">@'+tweetusername+'</a></span><span class="tweet-time"><a href="https://twitter.com/'+tweetusername+'/status/'+tweetid+'" target="_blank">'+relative_time(tweets[i].createdAt)+'</a></span><br/>'+status+'</p>';
						
						if ((isaretweet == true) && (showretweetindicator == true)) {
							feedHTML += '<div id="retweet-indicator"></div>';
						}						
						if (showtweetactions == true) {
							feedHTML += '<div id="twitter-actions"><div class="intent" id="intent-reply"><a href="https://twitter.com/intent/tweet?in_reply_to='+tweetid+'" title="Reply"></a></div><div class="intent" id="intent-retweet"><a href="https://twitter.com/intent/retweet?tweet_id='+tweetid+'" title="Retweet"></a></div><div class="intent" id="intent-fave"><a href="https://twitter.com/intent/favorite?tweet_id='+tweetid+'" title="Favourite"></a></div></div>';
						}
						
						feedHTML += '</div>';
						feedHTML += '</div>';
						displayCounter++;
					}   
				 }
            }
             
            $('#twitter-feed').html(feedHTML);

			if (showtweetactions == true) {				
				$('.twitter-article').hover(function(){
					$(this).find('#twitter-actions').css({'display':'block', 'opacity':0, 'margin-top':-20});
					$(this).find('#twitter-actions').animate({'opacity':1, 'margin-top':0},200);
				}, function() {
					$(this).find('#twitter-actions').animate({'opacity':0, 'margin-top':-20},120, function(){
						$(this).css('display', 'none');
					});
				});			
			
			
				$('#twitter-actions a').click(function(){
					var url = $(this).attr('href');
				  window.open(url, 'tweet action window', 'width=580,height=500');
				  return false;
				});
			}
			
			
    });
    

    function addlinks(data) {
        //Add link to all http:// links within tweets
         data = data.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
            return '<a href="'+url+'"  target="_blank">'+url+'</a>';
        });
             
        //Add link to @usernames used within tweets
        data = data.replace(/\B@([_a-z0-9]+)/ig, function(reply) {
            return '<a href="http://twitter.com/'+reply.substring(1)+'" style="font-weight:lighter;" target="_blank">'+reply.charAt(0)+reply.substring(1)+'</a>';
        });
		//Add link to #hastags used within tweets
        data = data.replace(/\B#([_a-z0-9]+)/ig, function(reply) {
            return '<a href="https://twitter.com/search?q='+reply.substring(1)+'" style="font-weight:lighter;" target="_blank">'+reply.charAt(0)+reply.substring(1)+'</a>';
        });
        return data;
    }
     
     
    function relative_time(time_value) {
      var values = time_value.split(" ");
      time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
      var parsed_date = Date.parse(time_value);
      var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
      var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
	  var shortdate = time_value.substr(4,2) + " " + time_value.substr(0,3);
      delta = delta + (relative_to.getTimezoneOffset() * 60);
     
      if (delta < 60) {
        return '1m';
      } else if(delta < 120) {
        return '1m';
      } else if(delta < (60*60)) {
        return (parseInt(delta / 60)).toString() + 'm';
      } else if(delta < (120*60)) {
        return '1h';
      } else if(delta < (24*60*60)) {
        return (parseInt(delta / 3600)).toString() + 'h';
      } else if(delta < (48*60*60)) {

		return shortdate;
      } else {
        return shortdate;
      }
    }
     
});