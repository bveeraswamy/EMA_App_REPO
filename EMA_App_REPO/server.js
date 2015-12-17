#!/bin/env node
'use strict';
/*process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./config/mongoose'),
express = require('./config/express'),
passport = require('./config/passport');
var db = mongoose();
var app = express();
var passport = passport();
app.listen(3000);
module.exports = app;
console.log('Server running at http://localhost:3000/');*/






process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
express = require('./config/express'),
passport = require('./config/passport');

var SampleApp = function() {

    var self = this; 


    self.setupVariables = function() {
       
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

        if (typeof self.ipaddress === "undefined") {
         
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    self.initializeServer = function() {
        self.db  = mongoose();
        self.app = express();
        self.passport = passport();

        self.app.use('/', function(req, res) {
            res.send('Hello World');
    });

            module.exports = self.app;
        
    };


   
    self.initialize = function() {
        self.setupVariables();
        self.initializeServer();
    };


    self.start = function() {
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   



var zapp = new SampleApp();
zapp.initialize();
zapp.start();
