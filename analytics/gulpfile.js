/*
 *  Copyright 2018 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *  Created by: Emily Walpole
 *
 *  this gulp script helps move around git files from one repo to another and build a kirby starting manifest
 *
 *
 */

var gulp = require('gulp'),
debug = require('gulp-debug'),
cleanDest = require('gulp-clean-dest'),
log = require('gulp-util').log,
gutil = require('gulp-util'),
es = require('event-stream'),
appRoot = require('app-root-path'),
path = require('path'),
path = require('path'),
git = require('gulp-git');

var appRootPath = appRoot.path;
var manifest = {};
var ascPathPrefix = 'AdobeAtAdobe/kirby_docs/master/';
var PRODUCT_NAME = 'Analytics';
var BRANCH = 'gh-pages';
var REPOSITORY = 'git@git.corp.adobe.com:AdobeAnalyticsWeb/analytics_services_devportal.git';

gulp.task('default', defaultTask);

function defaultTask(done) {
  // place code for your default task here
  done();
}

//Only clone the specific branch here
gulp.task('clone-documents', done => {
    git.clone(REPOSITORY,{args:'-b ' + BRANCH, cwd:'../../'}, function(err){
        if (err){
            console.log('ERROR ' + PRODUCT_NAME + ' Cloning Documents',err);
            done();
        }else{
            console.log('SUCCESS ' + PRODUCT_NAME + ' Cloning Documents');
            done();
        }
    });
})

//Pull only the specific branch
gulp.task('pull-new-documents', done => {
    git.pull('origin',BRANCH,{cwd: "../../analytics_services_devportal/"},function(err,stdout){
        if (err){
            console.log('ERROR ' + PRODUCT_NAME + ' Pulling New Documents',err);
            done();
        }else{
            console.log('SUCCESS ' + PRODUCT_NAME + ' Pulling New Documents',stdout);
            done();
        }
    });
})

gulp.task('add-new-documents', function() {
    return gulp.src('../analytics/**/*')
    .pipe(git.add())
})

gulp.task('commit-new-documents', function() {
    return gulp.src('.')
      .pipe(git.commit('Auto Import ' + PRODUCT_NAME + ' ' + (new Date).toISOString()));
});

gulp.task('push-new-documents', done => {
    git.push('origin', 'master',function(err,stdout){
        if (err){
            console.log('ERROR ' + PRODUCT_NAME + ' Pushing New Documents',err);
            done();
        }else{
            console.log('SUCCESS ' + PRODUCT_NAME + ' Pushing New Documents',stdout);
            done();
        }
    });
});

gulp.task('move-markdown', function() {
    /* move in tutorials */
    return gulp.src('../../analytics_services_devportal/reference-guide/markdown/**/*.{png,gif,jpg,md,PNG,GIF,JPG,MD}')
    .pipe(debug())
    .pipe(cleanDest('analytics_services_devportal/reference-guide/markdown'))
    .pipe(gulp.dest('analytics_services_devportal/reference-guide/markdown'));
});

gulp.task('pull-kirby-documents', done => {
    git.pull('origin', 'master',function(err){
        if (err){
            console.log('ERROR ' + PRODUCT_NAME + ' Pulling Kirby Docs', err);
            done();
        }else{
            console.log('SUCCESS ' + PRODUCT_NAME + ' Pulling Kirby Docs');
            done();
        }
    });
})

gulp.task('docsImport',gulp.series('clone-documents','pull-new-documents','pull-kirby-documents','move-markdown','add-new-documents','commit-new-documents','push-new-documents',function(done) {
    console.log(PRODUCT_NAME + ' Docs Import...');
    done();
}))


function getMMDDYY(targetDate) {
    var dd = targetDate.getDate();
    var mm = targetDate.getMonth()+1; //January is 0!

    var yyyy = targetDate.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    return dd+'/'+mm+'/'+yyyy;
}

buildBaseManifest = function(params) {
    if(typeof params === "undefined"){
        params = {};
    }
    manifest = {}; //reset or init
    manifest["name"] = params.name || "THIS_IS_WHERE_YOUR_MANIFEST_NAME_GOES";
    manifest["version"] = params.version || "1.0.0";
    manifest["description"] = params.description || "manifest description";
    manifest["author"] = params.author || "Bucky Wizzlecheeks";
    manifest["view_type"] =  params["view_type"] || "mdbook";
    manifest["meta_keywords"] = params["meta_keywords"] || "defaultkeyword,defaultkeyword2";
    manifest["meta_description"] = params["meta_description"] || "default description";
    manifest["publish_date"] = params["publish_date"] || getMMDDYY(new Date());
    manifest["show_edit_github_banner"] = params["show_edit_github_banner"] || false;
    manifest["base_path"] = params["base_path"] || "https://raw.githubusercontent.com";
    manifest["pages"] = [];
}

stringToFile = function(filename, pFileContent) {
    var src = require('stream').Readable({ objectMode: true })
    src._read = function () {
      this.push(new gutil.File({
        cwd: "",
        base: "",
        path: filename,
        contents: new Buffer(pFileContent)
      }))
      this.push(null)
    }
    return src;
}

pagesHasObject = function(pageCollection,importedFileNameToMatch) {
    var foundObject;
    for(var pi = 0; pi < pageCollection.length; pi++){
        if(!foundObject){
            //does it exist
            //log("checking for existing on ",pageCollection[pi]);
            //log("does " + pageCollection[pi].importedFileName + " match "+ importedFileNameToMatch);
            if(pageCollection[pi].importedFileName === importedFileNameToMatch){
                //log("MATCH");
                foundObject = pageCollection[pi];
            }
        }
    }

    return foundObject;
}

buildTree = function(es) {
    return es.map(function(file, cb) {
        log(" ============================START============================= ");

        var filename = path.parse(file.path).name;
        log("filename " + filename);
        log("appRootPath " + appRootPath);

        var relPath = file.path.replace(appRootPath,"").substring(1);

        var filenameBreakPath;
        var currentDepth;
        if(process.platform === "win32"){
            filenameBreakPath = relPath.substring(0,relPath.lastIndexOf('\\'));
            currentDepth = filenameBreakPath.split("\\");
        }else if(process.platform === "darwin"){
            filenameBreakPath = relPath.substring(0,relPath.lastIndexOf('/'));
            currentDepth = filenameBreakPath.split("/");
        }
        log("filenameBreakPath "  + filenameBreakPath);
        log("currentDepth = " + currentDepth);
        var currentCollection = manifest.pages;
        var currentItem;

        //build the sub tree for item
        var newItem;
        for(var i = 2; i < currentDepth.length; i++){
            currentItem = pagesHasObject(currentCollection,currentDepth[i]);
            //get for first level
            if(typeof currentItem !== "undefined"){
                currentCollection = currentItem.pages;
            }else{
                var title = currentDepth[i].replace(/_/g, ' '); /* pretty up title, remove underscore and replace with space*/
                newItem = {"importedFileName":currentDepth[i],"pages":[],"title":title};
                currentCollection.push(newItem);
                currentCollection = newItem.pages;
            }
        }

        //clean rel path
        relPath = relPath.replace(/\\/g,"/");
        var title = filename.replace(/_/g, ' '); /* pretty up title, remove underscore and replace with space*/
        currentCollection.push({"importedFileName":filename,"pages":[],"path":ascPathPrefix + relPath,"title":title});

        log("file.path = " + file.path);
        log(" relPath " + relPath);
        log(" ============================END============================= ");

        return cb();
    });
  };
