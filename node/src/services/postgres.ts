import { Pool } from 'pg'
import { Container, Service } from 'typedi'

import { LogService } from '../services'

@Service()
export default class PostgresService {
  private _pool: Pool = new Pool()

  constructor(private _logService: LogService) {
    this._logService = Container.get(LogService)
  }

  get pool(): Pool {
    return this._pool
  }

  setPoolConnection(): void {
    /* prettier-ignore */
    const { env: { POSTGRES_URI } } = process
    this._pool = new Pool({ connectionString: POSTGRES_URI }).on('error', ({ message }) => {
      this._logService.consoleError(message)
      process.exit(-1)
    })
    this.logPoolConnection()
  }

  private logPoolConnection(): void {
    const cyan = '\x1b[36m%s\x1b[0m'
    this._logService.consoleLog('PostgreSQL pool connected', cyan)
  }
}
