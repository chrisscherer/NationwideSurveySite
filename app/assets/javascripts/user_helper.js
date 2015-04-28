    function setCookie(cname, cvalue, exdays, path) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/" + path;
    }

    var deleteCookie = function(cname) {
        document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    };

    function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
    }

    function checkLoggedIn() {
    var username=getCookie("username");
    if (username!="") {
        $('#user_nav_bar').show();
        $('#userless_nav_bar').hide();
    }else{
        $('#user_nav_bar').hide();
        $('#userless_nav_bar').show();
    }
    }

    function navigate(ref){
      window.location.replace(ref);
    };

    function sign_in(username, password){
      var ref = new Firebase("https://asurveyclone.firebaseio.com/users");
      ref.on('child_added', function(snap) {
        var result = snap.val();

        if(username == result.username && password == result.password){
          setCookie('username', username, 365, '');
          if(window.location.pathname == "/user/new"){
            window.location.replace('/');
          }
          else{
            window.location.reload();
          };
        }

      });
      //alerts = [{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' }];
    };
