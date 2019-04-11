# Caliope
### Servidor de autorizaci�n local + Google

Para iniciar el servidor introduce el siguiente comando en el directorio principal:

```javascript
node app.js
```

### Endpoints

Obtener el token local (pasar por par�metros "username" y "password") :
```
POST /token-local
```

Obtener el token de google (entras por "web" y te logeas):
```
GET /token-google
```

Callback de google:
```
GET /token-google/callback
```

Verificar el token (verifica el access token):
```
POST /verify-token
```

Refrescar el token:
```
POST /refresh-token
```