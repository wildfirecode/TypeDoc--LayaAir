const fs = require('fs');
const gulp = require('gulp');
const typedoc = require('gulp-typedoc');
const stripJsonComments = require("strip-json-comments");

//load tsconfig
const tsconfigStr = fs.readFileSync('tsconfig.json').toString();
const tsconfig = JSON.parse(stripJsonComments(tsconfigStr));
let compilerOptions = tsconfig.compilerOptions;

gulp.task('default', () => {
    const globs = [];
    globs.push('./src');
    globs.push('./libs/*.d.ts');//add third-part declarations

    Object.assign(compilerOptions, {
        name: 'LayaAir-TypeDoc-Demo',
        includeDeclarations: false, //exclude LayaAir declaration file
        version: true,
        mode: 'file',
        out: './typedocs/LayaAir-TypeDoc-Demo',
        theme: 'minimal'
    });

    const stream = gulp.src(globs)
        .pipe(typedoc(compilerOptions));
    return stream;
})