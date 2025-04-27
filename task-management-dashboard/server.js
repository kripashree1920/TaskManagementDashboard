const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors({
  origin: 'https://task-management-kripashreebhat.netlify.app',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
server.use(middlewares);
server.use(router);
server.listen(process.env.PORT || 3001, () => {
  console.log('JSON Server is running');
});