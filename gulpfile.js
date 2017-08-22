const fs = require('fs');
const gulp = require('gulp');
const typedoc = require('gulp-typedoc');
const stripJsonComments = require("strip-json-comments");

//load tsconfig
const tsconfigStr = fs.readFileSync('tsconfig.json').toString();

const getGlobs = () => {
    const globs = [];
    globs.push('./src');
    globs.push('./libs/*.d.ts');//add third-part declarations
    return globs;
};

const params = {
    name: 'LayaAir-TypeDoc-Demo',
    includeDeclarations: false, //exclude LayaAir declaration file
    version: true,
    mode: 'file',
    out: './typedocs/LayaAir-TypeDoc-Demo',
    theme: 'minimal'
};

const getCompilerOptions = () => {
    const tsconfig = JSON.parse(stripJsonComments(tsconfigStr));
    const compilerOptions = tsconfig.compilerOptions;
    return Object.assign(compilerOptions, params);
}

const generateDoc = () =>
    gulp.src(getGlobs())
        .pipe(typedoc(getCompilerOptions()));

gulp.task('default', () => {
    generateDoc();
    gulp.watch('./src/*.ts', generateDoc);
})