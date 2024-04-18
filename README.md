
# crud

<div style="display: flex; justify-content: center;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png" style="width:250px;">
</div>


## guia instalacion:
Después de descargarlo abri la terminal y ejecutar: 

`$ npm install `

##### modificar los templates
    
en el archivo .env conectalo a base datos mysql

    PORT = YOUR PORT
	HOST = 
	DATABASE = books
	USER = 
	PASS =
	DB_LIMIT= LIMIT USER

##### Luego en app.js porner el localhost del frontend en origin

```javascript
const corsOptions = {
    origin: ['YOUR HOST FRONTEND'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
```
##### Lo mismo en app.jsx del fontend
```javascript
export const URI = "YOUR HOST BACKEND"
```
