
# Editor.md

<div style="display:flex;justify-content:center;">
<img src="https://cdn.freebiesupply.com/logos/large/2x/nodejs-1-logo-png-transparent.png"/ style="max-height:100px;">
</div>


###guia instalacion:
Después de descargarlo abri la terminal y ejecutar: 

`$ npm install `

#####modificar los templates
    
en el archivo .env conectalo a base datos mysql

    PORT = YOUR PORT
	HOST = 
	DATABASE = books
	USER = 
	PASS =
	DB_LIMIT= LIMIT USER

#####Luego en app.js porner el localhost del frontend en origin

```javascript
const corsOptions = {
    origin: ['YOUR HOST FRONTEND'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
```
#####Lo mismo en app.jsx del fontend
```javascript
export const URI = "YOUR HOST BACKEND"
```
