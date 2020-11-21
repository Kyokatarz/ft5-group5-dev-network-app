import { startServer } from '../../../src/server/startServer'

//Overwrite NextJs' config
export const config = {
  api: {
    bodyParser: false,
  },
}

//Start server
export default startServer()
