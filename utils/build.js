const _ = require('lodash');
const fs = require('fs');
const path = require('path');


let buildPath = path.join(__dirname, '../public/build/js');
let viewsDestBase = path.join(__dirname, '../public/build/views');

let js = fs.readdirSync(buildPath);
let views = fs.readdirSync(viewsDestBase);

let pages = _.filter(js, (j) => {
    return !_.startsWith(j, 'vendors');
});

let vendors = _.filter(js, (j) => _.startsWith(j, 'vendors'));

_.each(pages, (page) => {
    let name = page.split('-')[0];
    let view = _.find(views, (v) => _.startsWith(v, name));

    if (!view) return;

    let viewPath = path.join(__dirname, '../views/', view);
    let viewContent = fs.readFileSync(viewPath).toString();

    viewContent = viewContent.replace('vendors.bundle.js', vendors);
    viewContent = viewContent.replace(`${name}.bundle.js`, page);

    let viewDestPath = path.join(viewsDestBase, view);
    fs.writeFileSync(viewDestPath, viewContent);
});

