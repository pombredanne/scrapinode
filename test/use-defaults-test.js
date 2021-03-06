/**
 * Modules dependencies
 */

var mocha = require('mocha'),
	assert = require('chai').assert,
	libPath = process.env['SCRAPINODE_COV'] ? '../lib-cov' : '../lib',
	scrapinode = require( libPath + '/scrapinode'),
	ScrapinodeError = require(libPath + '/error/scrapinode-error'),
	express = require('express'),
	filed = require('filed');

// Web app
var app = express();

app.get('/page-open-graph.html',function(req,res){
	req.pipe(filed(__dirname + '/resources/page-open-graph.html')).pipe(res);
});

app.get('/page-schema-org.html',function(req,res){
	req.pipe(filed(__dirname + '/resources/page-schema-org.html')).pipe(res);
});

app.get('/page-generic-tags.html',function(req,res){
	req.pipe(filed(__dirname + '/resources/page-generic-tags.html')).pipe(res);
});

app.listen(1102);

// Test suite

['jsdom','cheerio','jsdom+zepto'].forEach(runTestSuite);

function runTestSuite(engine){
	describe('scraper using the default operators thanks to ' + engine,function(){
		beforeEach(function(){
			scrapinode.clearRouter();
		});
		describe('and scraping by following the Open Graph protocol',function(){
			describe('#get("title")',function(){

				it('should retrieve the text representating the title',function(done){
					scrapinode.useAll(scrapinode.defaults());
					var options = {
						url : 'http://localhost:1102/page-open-graph.html',
						engine : engine
					};
					scrapinode.createScraper(options,function(err,scraper){
						assert.notInstanceOf(err,Error);
						assert.isNull(err);
						assert.equal(scraper.get('title'),'The Rock');
						done();
					});
				});
			});
			describe('#get("descriptions")',function(){
				it('should retrieve a list of text representating the descriptions',function(done){
					scrapinode.useAll(scrapinode.defaults());
					var options = {
						url : 'http://localhost:1102/page-open-graph.html',
						engine : engine
					};
					scrapinode.createScraper(options,function(err,scraper){
						assert.notInstanceOf(err,Error);
						assert.isNull(err);
						assert.deepEqual(scraper.get('descriptions'),['Sean Connery found fame and fortune as the suave, sophisticated British agent, James Bond']);
						done();
					});
				});
			});
			describe('#get("images")',function(){
				it('should retrieve a list of images url',function(done){
					scrapinode.useAll(scrapinode.defaults());
					var options = {
						url : 'http://localhost:1102/page-open-graph.html',
						engine : engine
					};
					scrapinode.createScraper(options,function(err,scraper){
						assert.notInstanceOf(err,Error);
						assert.isNull(err);
						assert.deepEqual(scraper.get('images'),['http://ia.media-imdb.com/images/rock.jpg']);
						done();
					});
				});
			});
			describe('#get("videos")',function(){
				it('should retrieve a list of videos [urls or html representations of the videos]',function(done){
					scrapinode.useAll(scrapinode.defaults());
					var options = {
						url : 'http://localhost:1102/page-open-graph.html',
						engine : engine
					};
					scrapinode.createScraper(options,function(err,scraper){
						assert.notInstanceOf(err,Error);
						assert.isNull(err);
						assert.deepEqual(scraper.get('videos'),['http://example.com/awesome.flv']);
						done();
					});
				});
			});
		});
		describe('and scraping by following the Schema.org specifications',function(){
			describe('#get("title")',function(){
				it('should retrieve the text representating the title',function(done){
					scrapinode.useAll(scrapinode.defaults());
					var options = {
						url : 'http://localhost:1102/page-schema-org.html',
						engine : engine
					};
					scrapinode.createScraper(options,function(err,scraper){
						assert.notInstanceOf(err,Error);
						assert.isNull(err);
						assert.equal(scraper.get('title'),'Call of Duty: Modern Warfare III');
						done();
					});
				});
			});
			describe('#get("descriptions")',function(){
				it('should retrieve a list of text representating the descriptions',function(done){
					scrapinode.useAll(scrapinode.defaults());
					var options = {
						url : 'http://localhost:1102/page-schema-org.html',
						engine : engine
					};
					scrapinode.createScraper(options,function(err,scraper){
						assert.notInstanceOf(err,Error);
						assert.isNull(err);
						assert.deepEqual(scraper.get('descriptions'),['First Person Shooter game available on consoles and PCs.']);
						done();
					});
				});
			});
			describe('#get("images")',function(){
				it('should retrieve a list of images url',function(done){
					scrapinode.useAll(scrapinode.defaults());
					var options = {
						url : 'http://localhost:1102/page-schema-org.html',
						engine : engine
					};
					scrapinode.createScraper(options,function(err,scraper){
						assert.notInstanceOf(err,Error);
						assert.isNull(err);
						assert.deepEqual(scraper.get('images'),['http://www.journaldugamer.com/files/2011/11/mw3-header.jpg']);
						done();
					});
				});
			});
		});
		describe('and scraping by searching the generic html tags',function(){
			describe('#get("title")',function(){
				it('should retrieve the text representating the title',function(done){
					scrapinode.useAll(scrapinode.defaults());
					scrapinode.createScraper('http://localhost:1102/page-generic-tags.html',function(err,scraper){
						assert.notInstanceOf(err,Error);
						assert.isNull(err);
						assert.equal(scraper.get('title'),'generic tags page');
						done();
					});
				});
			});
			describe('#get("descriptions")',function(){
				it('should retrieve a list of text representating the descriptions',function(done){
					scrapinode.useAll(scrapinode.defaults());
					var options = {
						url : 'http://localhost:1102/page-generic-tags.html',
						engine : engine
					};
					scrapinode.createScraper(options,function(err,scraper){
						assert.notInstanceOf(err,Error);
						assert.isNull(err);
						assert.deepEqual(scraper.get('descriptions'),['description of the generics tag page']);
						done();
					});
				});
			});
			describe('#get("images")',function(){
				it('should retrieve a list of images url',function(done){
					scrapinode.useAll(scrapinode.defaults());
					var options = {
						url : 'http://localhost:1102/page-generic-tags.html',
						engine : engine
					};
					scrapinode.createScraper(options,function(err,scraper){
						assert.notInstanceOf(err,Error);
						assert.isNull(err);
						assert.deepEqual(scraper.get('images'),['http://localhost/img1.png','http://localhost/img2.png']);
						done();
					});
				});
			});
			describe('#get("videos")',function(){
				it('should retrieve a list of videos [urls or html representations of the videos]',function(done){
					scrapinode.useAll(scrapinode.defaults());
					var options = {
						url : 'http://localhost:1102/page-generic-tags.html',
						engine : engine
					};
					scrapinode.createScraper(options,function(err,scraper){
						assert.notInstanceOf(err,Error);
						assert.isNull(err);
						assert.deepEqual(scraper.get('videos'),['http://localhost:1102/videofile.ogg','http://localhost:1102/movie.mov']);
						done();
					});
				});
			});
		});
	});
}
