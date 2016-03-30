/** sets the cookies
* name(name of the cookie)
* value(value of the cookie)
* expiryDays(number of days to keep the Cookie)
*/

function setCookie(name, value, expiryDays){
  var today = new Date();
  var expiry = new Date(today.getTime() + expiryDays * 24 * 60 * 60 * 1000);
  document.cookie=name + "=" + escape(value) + "; path=/; expires=" + expiry.toGMTString();
 }

// get the Cookie from the name proviced in the argument (cname)
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

// delete the cookie provided by cname
function deleteCookie(cname){
  var today = new Date();
  var expired = new Date(today.getTime() - 24 * 3600 * 1000); // less 24 hours
  document.cookie=cname + "=null; path=/; expires=" + expired.toGMTString();
}