let fs = require("fs");
let browserify = require("browserify");

let options = {
    standalone: "entrypoint"
};

browserify("./packages/entrypoint/index.js", options)
    .transform("babelify", {
        presets: [ 
            "@babel/preset-env"
        ]
    })
    .bundle()
    .pipe(fs.createWriteStream("./dist/bundle.js"));