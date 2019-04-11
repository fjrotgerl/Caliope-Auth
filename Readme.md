# Caliope
### Servidor de autorización local + Google

Para iniciar el servidor introduce el siguiente comando en el directorio principal:

```javascript
node index.js
```

### Endpoints

Obtener el token local:
```url
POST /token-local
```

Obtener el token de google:
```url
GET /token-google
```

Callback de google:
```url
GET /token-google/callback
```

Verificar el token:
```url
POST /verify-token
```

Refrescar el token:
```url
POST /refresh-token
```