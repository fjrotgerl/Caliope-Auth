# Caliope
### Servidor de autorización local + Google

Para iniciar el servidor introduce el siguiente comando en el directorio principal:

```javascript
node index.js
```

### Endpoints

Obtener el token local:
```
POST /token-local
```

Obtener el token de google:
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