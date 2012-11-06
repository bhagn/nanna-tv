@ECHO OFF
start /MIN cmd /k mongod
ECHO Waiting for MongoDB to come up
TIMEOUT 5
node dojo/dojo.js load=app/run
@ECHO ON