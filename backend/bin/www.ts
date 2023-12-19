require('module-alias/register');
import app from '../src/app';
import http from 'http';
import dotenv from "dotenv";

dotenv.config()

// Get port from environment and store in Express.
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);
server.listen(port, ()=>{
	console.log(`Server listening on port ${port}`);
});
server.on('error', (e) => {console.log(e)});
