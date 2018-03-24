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
 *  Created by: David bEnGe
 *  not my circus, not my monkeys
 * 
 *  this gulp script helps move around git files from one repo to another and build a kirby starting manifest 
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
run = require('gulp-run')
path = require('path'),
runSequence = require('run-sequence'),
git = require('gulp-git');

var cwd = new run.Command('cwd');
var appRootPath = appRoot.path;
var manifest = {};
var ascPathPrefix = "AdobeAtAdobe/kirby_docs/master/";

gulp.task('default', defaultTask);
//gulp.task('acsImport', acsImport);
gulp.task('acsBuildCatalogManifest', acsBuildCatalogManifest);
gulp.task('acsBuildTutorialsManifest', acsBuildTutorialsManifest);

function defaultTask(done) {
  // place code for your default task here
  done();
}

gulp.task('clone-documents', done => {
    git.clone('git@git.corp.adobe.com:experience-platform/documentation.git',{cwd: "../"},function(err){
        if (err){
            console.log('clone-documents error',err);
            done();
        }else{
            done();
        }
    });
})

gulp.task('pull-new-documents', done => {
    git.pull('origin', 'master',{cwd: "../documentation/"},function(err,stdout){
        if (err){
            console.log('pulling new documents error',err);
            done();
        }else{
            console.log('pulling new documents',stdout);
            done();
        }
    });
})

gulp.task('add-new-acp-documents', function() {
    return gulp.src('.')
    .pipe(git.add())
})

gulp.task('commit-new-acp-documents', function() {
    return gulp.src('.')
      .pipe(git.commit((new Date).toISOString()));
});

gulp.task('push-new-acp-documents', done => {
    git.push('origin', 'master',function(err,stdout){
        if (err){
            console.log('pulling new documents error',err);
            done();
        }else{
            console.log('pulling new documents',stdout);
            done();
        }
    });
});

gulp.task('acs-move-catalog', function() {
    /* move in foundation catalog */
    return gulp.src('../documentation/api-specification/markdown/apis/foundation/catalog/markdown/**/*.md')
    .pipe(debug())
    .pipe(cleanDest('acpdr/catalog'))
    .pipe(gulp.dest('acpdr/catalog'));
});

gulp.task('acs-move-tutorials', function() {
    /* move in tutorials */
    return gulp.src('../documentation/api-specification/markdown/narrative/tutorials/**/*.md')
    .pipe(debug())
    .pipe(cleanDest('acpdr/tutorials'))
    .pipe(gulp.dest('acpdr/tutorials'));
});

gulp.task('acs-move-markdown', function() {
    /* move in tutorials */
    return gulp.src('../documentation/api-specification/markdown/**/*.md')
    .pipe(debug())
    .pipe(cleanDest('acpdr/api-specification/markdown'))
    .pipe(gulp.dest('acpdr/api-specification/markdown'));
});

gulp.task('acsImport',gulp.series('clone-documents','pull-new-documents','acs-move-catalog','acs-move-tutorials','acs-move-markdown','add-new-acp-documents','commit-new-acp-documents','push-new-acp-documents', function(done) {
    console.log('acsImport...');
    /* move in the files 
     * https://git.corp.adobe.com/experience-platform/documentation
     */
      
    /* move in foundation catalog */
    //gulp.src('../documentation/api-specification/markdown/apis/foundation/catalog/markdown/**/*.md')
    //.pipe(debug())
    //.pipe(cleanDest('acpdr/catalog'))
    //.pipe(gulp.dest('acpdr/catalog'))

    /* move in tutorials */
    //gulp.src('../documentation/api-specification/markdown/narrative/tutorials/**/*.md')
    //.pipe(debug())
    //.pipe(cleanDest('acpdr/tutorials'))
    //.pipe(gulp.dest('acpdr/tutorials'));
    done();

    //run('git add .');
    //run('git commit -m "test"');
    //run('git push');
}))

function acsBuildCatalogManifest(done) {
    /* build a manifest */
    return Promise.all([
        new Promise(function(resolve, reject) {
            buildBaseManifest();
            resolve();
        }),
        new Promise(function(resolve, reject) {
            gulp.src('./acpdr/catalog/**/*.md')
            .pipe(buildTree(es))
            .on('end', resolve)
        })
    ])
    .then(function(){
        return stringToFile('acpdr_catalog.json', JSON.stringify(manifest, null, '\t'))
        .pipe(gulp.dest('./'));
    })
    
    //log(JSON.stringify(manifest)); 
    done();
}

function acsBuildTutorialsManifest(done) {
    /* build a manifest */
    return Promise.all([
        new Promise(function(resolve, reject) {
            buildBaseManifest();
            resolve();
        }),
        new Promise(function(resolve, reject) {
            gulp.src('./acpdr/tutorials/**/*.md')
            .pipe(buildTree(es))
            .on('end', resolve)
        })
    ])
    .then(function(){
        return stringToFile('acpdr_tutorials.json', JSON.stringify(manifest, null, '\t'))
        .pipe(gulp.dest('./'));
    })
    
    //log(JSON.stringify(manifest)); 
    done();
}

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