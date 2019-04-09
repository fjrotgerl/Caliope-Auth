//Configuration server LoginOauth-VerifyToken

PORTSERVER = 3001;

exports.PORTSERVER = PORTSERVER;
exports.CLIENT_ID = "91443692844-f36ejvfve1oi4n0voktmk5qkspkq042o.apps.googleusercontent.com",
exports.CLIENT_SECRET = "yUEYFbJoAithER9yt_AdYJ5c",
exports.CALLBACK_URL = "http://localhost:" + PORTSERVER + "/auth/google/callback"
exports.SECRET_JWT = "jwtClave",
exports.TOKEN_EXPIRE = 60 * 60,
exports.URL_LOGIN_GROC = "https://www.google.es" //http://172.16.12.42:8081/login"