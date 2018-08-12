var chai       = require('chai');
var chaiSubset = require('chai-subset');
var expect     = chai.expect;
var assert     = chai.assert;
var request    = require('superagent');
var data       = require(process.cwd() + '/data/sampleTest.data.js');
var testData   = data();


chai.use(chaiSubset);

describe('Test Cases for REST API', function(){
  describe('Post Resource Test', function(){
    it('it should return status 201', function(done){
      var url   = testData.url;
      var param = testData.postTestData;


      request
        .post(url)
        .send(param)
        .end(function(err, res){
          expect(res.status).to.deep.equal(201);
          expect(res.body).to.containSubset(param);
          done();
        });
    });
  });


  describe('Get Resource Test', function(){
    it('it should return status OK', function(done){
      var url = testData.url;

      request
        .get(url)
        .end(function(err, res){
          expect(res.status).to.deep.equal(200);
          expect(res.body.length).to.equal(100);
          done();
        });

      //done();
    });
  });

  describe('Get Resource Test for a specific user', function(){
    it('it should return status OK', function(done){
      var url = testData.url;
      var userId = 1;
      var getUrl = url + "/" + userId;
      var expParams = testData.getExpData;

      request
        .get(getUrl)
        .end(function(err, res){
          expect(res.status).to.deep.equal(200);
          expect(res.body).to.deep.equal(expParams);
          done();
        });

      //done();
    });
  });


  describe('Get Comment Test with query parameter', function(){
    it('it should return status OK', function(done){
      var url = 'https://jsonplaceholder.typicode.com/comments';
      var queryParam = {
        "postId" : 1
      }

      request
        .get(url)
        .query(queryParam)
        .end(function(err, res){
          expect(res.status).to.deep.equal(200);
          expect(res.body.length).to.equal(5);
          done();
        });

      //done();
    });
  });


  describe('Put Resource Test', function(){
    it('it should return status 201', function(done){
      var url    =  testData.url;
      var param  = testData.putTestData;
      var postId = 1;


      request
        .put(url + "/" + postId)
        .send(param)
        .end(function(err, res){
          expect(res.status).to.deep.equal(200);
          expect(res.body).to.containSubset(param);
          done();
        });

    });
  });

  describe('Patch Resource Test', function(){
    it('it should return status 201', function(done){
      var url    = testData.url;
      var param  = testData.patchTestData
      var postId = 1;


      request
        .put(url + "/" + postId)
        .send(param)
        .end(function(err, res){
          expect(res.status).to.deep.equal(200);
          expect(res.body).to.containSubset(param);
          done();
        });

    });
  });


});
