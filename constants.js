//Configuration server LoginOauth-VerifyToken

PORTSERVER = 3002;

exports.PORTSERVER           = PORTSERVER;

exports.API_URL              = "http://caliope.sytes.net:8080/caliopebackend/";
exports.CLIENT_URL           = "http://caliope.sytes.net";

exports.CLIENT_ID            = "91443692844-f36ejvfve1oi4n0voktmk5qkspkq042o.apps.googleusercontent.com";
exports.CLIENT_SECRET        = "yUEYFbJoAithER9yt_AdYJ5c";
exports.CALLBACK_URL         = "http://caliope.sytes.net:" + PORTSERVER + "/token-google/callback";

exports.SECRET_KEY           = "secreto";
exports.TOKEN_EXPIRE         = 60 * 60 * 60;
exports.SECRET_KEY_REFRESH   = "secreto_refrescante";
exports.TOKEN_REFRESH_EXPIRE = 24 * 60 * 60;