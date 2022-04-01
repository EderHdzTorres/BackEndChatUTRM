import App from './config/app.js';

// Puerto de escucha para la app
const port = process.env.APP_PORT || 8081; // default port to listen

// Inicializa la app
App.http.listen(port, () => console.log(`API is running. port: ${port}`));
