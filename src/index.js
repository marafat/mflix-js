import app from "./server"
import { MongoClient } from "mongodb"
import MoviesDAO from "../src/dao/moviesDAO"
import UsersDAO from "./dao/usersDAO"
import CommentsDAO from "./dao/commentsDAO"

const port = process.env.PORT || 8000

/**
Ticket: Connection Pooling - Done

Please change the configuration of the MongoClient object by setting the
maximum connection pool size to 50 active connections.
*/

/**
Ticket: Timeouts - Done

Please prevent the program from waiting indefinitely by setting the write
concern timeout limit to 2500 milliseconds.
*/

/**
Ticket: Principle of Least Privilege - Done

After creating a new user with readWrite role on only the `mflix` db
DB_URI was updated in .env file and ticket was passed with verification
code from `status` page.
*/

MongoClient.connect(process.env.MFLIX_DB_URI, {
  poolSize: 50,
  useNewUrlParser: true,
  wtimeout: 2500,
})
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await MoviesDAO.injectDB(client)
    await UsersDAO.injectDB(client)
    await CommentsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })
