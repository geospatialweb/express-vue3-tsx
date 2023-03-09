import 'reflect-metadata'
import dotenv from 'dotenv'
import express from 'express'
// import fs from 'fs'
import http from 'http'
// import https from 'https'
import { Container } from 'typedi'

import { router } from './router'
import { LogService, PostgresService } from './services'

if (!dotenv.config()) throw new Error('.env file MISSING')

const setPoolConnection = (): void => {
  const postgresService = Container.get(PostgresService)
  postgresService.setPoolConnection()
}
// DEVELOPMENT
const startServer = (): void => {
  const app = express()
  http
    .createServer(app.set('env', <string>process.env.NODE_ENV).use(<string>process.env.API_PREFIX, router()))
    .listen(Number(process.env.PORT), (): void => {
      const blue = '\x1b[34m%s\x1b[0m'
      const logService = Container.get(LogService)
      logService.consoleLog(`HTTP server listening at ${<string>process.env.HOST}:${<string>process.env.PORT}`, blue)
    })
}
// PRODUCTION
// const startServer = (): void => {
//   const app = express()
//   https
//     .createServer(
//       {
//         key: fs.readFileSync(<string>process.env.SSL_KEY, { encoding: 'utf8', flag: 'r' }),
//         cert: fs.readFileSync(<string>process.env.SSL_CERT, { encoding: 'utf8', flag: 'r' })
//       },
//       app.set('env', <string>process.env.NODE_ENV).use(<string>process.env.API_PREFIX, router())
//     )
//     .listen(Number(process.env.PORT), (): void => {
//       const blue = '\x1b[34m%s\x1b[0m'
//       const logService = Container.get(LogService)
//       logService.consoleLog(`HTTPS server listening at ${<string>process.env.HOST}:${<string>process.env.PORT}`, blue)
//     })
// }
setPoolConnection()
startServer()
