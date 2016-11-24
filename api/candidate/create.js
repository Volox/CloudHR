const express = require('express');
const _ = require('lodash');
const MongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');


const MONGO_URL = process.env.MONGO_URL || '';

module.exports = function( req, res, next ) {
  const collection = db.collection(  );

  
  collection
  .findOne( {
    date: 
  } )
  .
}