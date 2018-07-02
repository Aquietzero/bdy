const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const cmd = require('commander');
const loader = require('../loader');

let boilerplate = module.exports = {};


boilerplate.component = (component) => {
    let base = loader.base;
    let targetDir = path.join(base, './public/javascripts/components');
    let componentDir = path.join(targetDir, component);

    fs.ensureDirSync(componentDir);

    let jsTemplate = loader.loadText('./utils/component_template/js.template');

    fs.writeFileSync(
        path.join(componentDir, `${component}.js`),
        _.template(jsTemplate)({component}));
    fs.writeFileSync(path.join(componentDir, `${component}.sass`), '');
    fs.writeFileSync(path.join(componentDir, `${component}.html`), '');
}

boilerplate.page = (page) => {
    let base = loader.base;
    let targetDir = path.join(base, './public/javascripts/pages');
    let pageDir = path.join(targetDir, page);

    fs.ensureDirSync(pageDir);

    let jsTemplate = loader.loadText('./utils/page_template/js.template');
    let htmlTemplate = loader.loadText('./utils/page_template/html.template');

    fs.writeFileSync(
        path.join(pageDir, `${page}.js`),
        _.template(jsTemplate)({page}));
    fs.writeFileSync(
        path.join(pageDir, `${page}.html`),
        _.template(htmlTemplate)({page}));
    fs.writeFileSync(path.join(pageDir, `${page}.sass`), '');
}


cmd
    .command('page <page>')
    .action((page, cmd) => boilerplate.page(page));
cmd
    .command('component <component>')
    .action((component, cmd) => boilerplate.component(component));

cmd.parse(process.argv);

