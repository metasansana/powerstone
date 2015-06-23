import ServerFactory from '../ServerFactory';
import express from 'express';
import http from 'http';
import https from 'https';
import restify from 'restify';
import must from 'must';

describe('ServerFactory', function () {

    it('createNativeWebServer', function () {
        must(ServerFactory.createNativeWebServer(express())).to.be.instanceOf(http.Server);
    });

    it('createSecureNativeWebServer', function () {
        must(ServerFactory.createSecureNativeWebServer({
            key: require('./assets/alice.key.js'),
            cert: require('./assets/alice.crt.js')
        }, express())).to.be.instanceOf(https.Server);
    });

    it('createRESTServer', function () {
        must(ServerFactory.createRESTServer(express())).to.be.instanceOf(require('restify/lib/server'));
    })

});