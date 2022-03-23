import App from './config/app.js';

const port = process.env.APP_PORT || 8081;

//App.app.listen(port,() => console.log(`API is running. port: ${port}`));

App.Http.listen(port, () => console.log(`API is running. port: ${port}`));