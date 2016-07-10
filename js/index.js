$(document).ready(function() {

  var twitchUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "comster404", "noobs2ninjas", "brunofin"];

  twitchUsers.forEach(function(user) {
    var urlStreams = "streams";
    var urlChannels = "channels";
    var game, status, channelURL, channelStatus, logo;

    function createAPI(index, twitchUser) {
      return "https://api.twitch.tv/kraken/" + index + "/" + twitchUser + "?callback?";
    };

    $.ajax({
      url:createAPI("streams", user),
      dataType:"jsonp",
      data: {
        format:"json"
      },
      success:function(data) {
        if (data.stream === null) {
          status = "offline";
          game = "Offline";
        } else if (data.error) {
          $("#twitchTVApp").append("<div class='row twitchList offline'><div class='col-md-2'><img src='http://www.clipartbest.com/cliparts/RcG/yxE/RcGyxEAXi.jpeg' class='profileLogos' ></div><div class='profileName col-md-2'><a href='https://www.twitch.tv/"+user+"'  target='_blank'>" + user + "</a></div><div class='col-md-8 profileName'><p>Account Closed</p></div></div>")
        } else {
          game = data.stream.game;
          status = "online";
          channelStatus = data.stream.channel.status;
        }

        $.getJSON(createAPI("channels", user), function(data) {
          logo = data.logo;
          channelURL = data.url;
          status === "online" ? $("#twitchTVApp").prepend("<div class='row twitchList " + status + "'><div class='col-md-2'><img src='" + logo + "' class='profileLogos' ></div><div class='col-md-2 profileName'><a href='" + channelURL + "' class='' target='_blank'>" + user + "</a></div><div class='col-md-8 profileName '> " + game + ":" + channelStatus + "</div></div>") : $("#twitchTVApp").append("<div class='row twitchList " + status + "'><div class='col-md-2'><img src='" + logo + "' class='profileLogos' ></div><div class='profileName col-md-2'><a href='" + channelURL + "'  target='_blank'>" + user + "</a></div><div class='col-md-8 profileName'> " + game + "</div></div>")
        });
      },
       error: function () {
         console.log(createAPI("streams", user));
         $("#twitchTVApp").append("<div class='row twitchList'><div class='col-md-2'><img src='http://questionmark.guide/wp-content/uploads/2015/04/question-mark.png' class='profileLogos' ></div><div class='profileName col-md-2'><a href='#'  target='_blank'>" + user + "</a></div><div class='col-md-8 profileName'><p>Account Closed</p></div></div>")
      }
    });
  });
})