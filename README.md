Reads data from a mssqlserver database

## Example

```
const MSSQLReader = require('mssqlreader-stream'),
      eventEmitter = require('events').EventEmitter,
      options = new eventEmitter();
.
.
.

options.server = ''
options.port =
options.database = ''
options.user = ''
options.password = ''


MSSQLReader(options,query).then(
  request=>{
    .
    .
    request.pipe(stream)
  }
)
.catch(err=>{
  .
  .
})

```
