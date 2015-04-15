var dns = require('dns');
var fs = require('fs');
var dateFormat = require('dateformat');
var Client = require('ssh2').Client;

var i = 0;
var currDate = dateFormat();

var usr = "live.[SITE UUID FROM PANTHEON DASHBOARD]";
var nginxRemote = "logs/nginx-error.log";
var phpRemote = "logs/php-error.log";

// Make a local directory for your log files.
fs.mkdir("/[CHOOSE YOUR OWN ADVENTURE]/" + currDate);

// Look up IPs
dns.resolve4('appserver.live.[SITE UUID FROM PANTHEON DASHBOARD].drush.in', function (err, addresses) {
addresses.forEach(function (a) { // For each IP Address

// Where to store the files
var nginxFile = "/[CHOOSE YOUR OWN ADVENTURE]/" + currDate + "/nginx-error" + i++ + ".log";
var phpFile = "/[CHOOSE YOUR OWN ADVENTURE]/" + currDate + "/php-error" + i++ + ".log";

  var conn = new Client();
  conn.on('ready', function() {
    conn.sftp(function(err, sftp) {
      if (err) throw err;
      // Get nginx-error.log files
      sftp.fastGet(nginxRemote, nginxFile,function(err) {
      if (err) throw err;
      console.log('Getting file...');
      });
      // Get php-error.log files
      sftp.fastGet(phpRemote, phpFile,function(err) {
      if (err) throw err;
      console.log('Getting file...');
      // End the connection when you've downloaded all the files: 2 files on 6 different servers.
      // This will be your number of app servers x 2.
      if (i == 12) {
        conn.end();
      }
      });            
    });
  }).connect({
      host: a,
      port: 2222,
      username: usr,
      privateKey: fs.readFileSync('[/YOUR PATH TO FREEDOM].ssh/id_rsa', 'utf8')
    });

   }); // End of forEach.
});

