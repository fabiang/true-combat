var gulp = require('gulp');
var exec = require('child_process').exec;

var commonIgnore = [
    '.git/',
    '.vagrant/',
    '.gitattributes',
    '.gitignore',
    'node_modules/',
    'nbproject/',
    'Vagrantfile',
    'package.json',
    'gulpfile.js',
    'dist/',
];

var linuxIgnore = [
    'ET.exe',
    'ETDED.exe',
];

var windowsIgnore = [
    'tce',
    'tceded',
    'openurl.sh',
    'etded',
    'etded.x86',
    'et',
    'et.x86',
    'ET.xpm',
    'install.sh',
];

var cwd = process.cwd();

gulp.task('default', ['build-linux', 'build-windows']);

gulp.task('build-linux', function (done) {
    var excludes = commonIgnore.concat(linuxIgnore).map(function (item) {
        if ('/' === item.substr(-1, 1)) {
            item = item.substr(0, item.length - 1);
        }
        return "--exclude='" + item + "'";
    });

    var command = '/bin/tar --exclude-vcs -cvz ' + excludes.join(' ') + ' -f '
        + 'dist/true-combat-linux-complete-0.49b.tar.gz *';
    exec(command, { cwd: cwd }, done);
});

gulp.task('build-windows', function (done) {
    var excludes = commonIgnore.concat(windowsIgnore).map(function (item) {
            var newItem = '"' +  item;
            if ('/' === newItem.substr(-1, 1)) {
                newItem += '*';
            }
            return newItem + '"';
        })
        .join(' ');
    var command = '/usr/bin/zip -9rq "dist/true-combat-windows-complete-0.49b.zip" . -x ' + excludes;
    exec(command, { cwd: cwd }, done);
});
