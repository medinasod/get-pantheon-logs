# get-pantheon-logs
If you have multiple app servers for your Pantheon.io hosted site, downloading all of the error logs can be really cumbersome. This is a node.js script that will download your log files from all of your app servers.

Requirements
============

* [node.js](http://nodejs.org/) -- v0.8.7 or newer
* [ssh2] (https://github.com/mscdex/ssh2)
* [dateformat] (https://github.com/felixge/node-dateformat)


Example
=======

// Enter this from the commandline.
node get-pantheon-logs.js
