# Caliope
### Servidor de autorización local + Google

Para iniciar el servidor introduce el siguiente comando en el directorio principal:

```javascript
node index.js
```

### Endpoints

Obtener el token local (pasar por parámetros "username" y "password") :
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

Verificar el token:
```
POST /verify-token
```

Refrescar el token:
```
POST /refresh-token
```