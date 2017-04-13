/**
 * Created by Wolf on 2017/4/12.
 */
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('babel-runtime'); // This method adds support for a `--babel` flag
    }

    installingLodash() {
        this.npmInstall([
            'react',
            'react-dom'
        ], { 'save': true },() => {
            this.npmInstall([
                'babel-runtime',
                'babel-core',
                'babel-loader',
                'babel-plugin-transform-runtime',
                'babel-preset-es2015',
                'babel-preset-react',
                'html-loader',
                'webpack',
                'webpack-dev-server'
            ], { 'saveDev': true },() => {
                this.log('项目构建完毕');
            });
        });
    }

    //
    doing() {
        this.log('项目构建中...');
    }

    paths() {
        this.destinationRoot();
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationRoot()
        );
    }
};