const express = require('express');
const _ = require('lodash');
const MongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');


const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/CloudHR';

// My lib
const auth = require( './auth' );
const createCandidate = require( './candidate/create' );
// const apiAuth = require( './api-auth' );


(async function () {
  const db = MongoClient.connect(MONGO_URL);
  
  const app = express();
  app.locals.db = db;


  // Dashboard
  const dashboard = express.Router();
  dashboard.get( '/' );
  dashboard.get( '/login' );
  dashboard.post( '/login' );
  dashboard.get( '/candidates', auth(), viewCandidates );
  dashboard.get( '/interviews', auth(), viewInterviews );
  dashboard.get( '/interviews/prev', auth(), viewPrevInterview );

  // API
  const api = express.Router();
  // api.use( apiAuth() );

  api.get( '/candidate', getCandidates );
  api.post( '/candidate', createCandidate );
  api.put( '/candidate/:id', modifyCandidate );
  api.delete( '/candidate/:id', modifyCandidate );
  
  api.get( '/interview', getInteviews );
  api.post( '/interview', createInteview );
  api.put( '/interview/:id', modifyInteview );
  
  api.get( '/interview', getInteviews );
  api.post( '/interview', createInteview );
  api.put( '/interview/:id', modifyInteview );



  app.use( dashboard );
  app.use( '/api', api );




})
  .catch(err => console.error(err.stack));