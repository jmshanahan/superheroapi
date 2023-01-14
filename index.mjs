import app from 'server'
import http from 'http'



const server = http.createServer(app)
server.listen(port, () => console.log(`Strted on port ${port}`));

