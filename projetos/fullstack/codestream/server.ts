import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { createSocketServer } from './src/lib/socket-server'

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT ?? '3003', 10)

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  })

  // Anexa Socket.io ao mesmo servidor HTTP
  await createSocketServer(httpServer)

  httpServer.listen(port, () => {
    console.log(`> Server running on http://localhost:${port} [${dev ? 'dev' : 'prod'}]`)
  })
})
