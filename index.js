const mssql = require('mssql')

module.exports = function (options,query) {

    if (!options) {
        throw new Error(`options must be provided`)
    }

    if(!query){
        throw new Error(`query must be provided`)
    }

    let server = options.server
    if (!server || !server.trim()) {
        return options.emit(`error`, new Error(`server must be defined`), null, true)
    }

    let port = options.port
    if (!Number.isInteger(port) || port < 1) {
        return options.emit(`error`, new Error(`port must be a number greater than 0`), null, true)
    }

    let user = options.user
    if (!user || !user.trim()) {
        return options.emit(`error`, new Error(`user must be defined`), null, true)
    }

    let password = options.password
    if (!password || !password.trim()) {
        return options.emit(`error`, new Error(`password must be defined`), null, true)
    }

    let database = options.database
    if (!database || !database.trim()) {
        return options.emit(`error`, new Error(`database must be defined`), null, true)
    }

    return new Promise(

        function(resolve, reject) {

            var connection = new mssql.Connection({
              user : options.user,
              password : options.password,
              server : options.server,
              port : options.port,
              database : options.database
            })

            connection.connect(function(err) {
                if (err) {
                    reject(err)
                }
                var request = new mssql.Request(connection)
                request.stream = true
                request.query(query)
                request.on('error', function(err) {
                    reject(err)
                })
                request.on('done',function(){
                    connection.close()
                })
                resolve(request)
            })

        }
    )

}
