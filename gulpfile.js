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
    'install.go',
];

var linuxIgnore = [
    'ET.exe',
    'ETDED.exe',
    'install.exe',
    'pb/*.dll',
    'pb/dll/',
    'etmain/*.dll',
    'etmain/pbsvc.exe',
    'tcetest/*.dll',
    'tcetest/*.exe',
    'Shortcut.exe',
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
    'install',
    'pb/*.so',
    'etmain/*.so',
    'tcetest/*.so',
    'TCE.lnk',
];

var cwd = process.cwd();

gulp.task('default', ['build-linux', 'build-windows']);
gulp.task('build-install', ['build-install-linux', 'build-install-windows']);

gulp.task('build-install-linux', function (done) {
    exec('go build install.go', { cwd: cwd, env: { GOOS: 'linux', GOARCH: 'amd64' }}, done);
})

gulp.task('build-install-windows', function (done) {
    exec('go build install.go', { cwd: cwd, env: { GOOS: 'windows', GOARCH: '386' }}, done);
})

gulp.task('build-linux', ['build-install'], function (done) {
    var excludes = commonIgnore.concat(linuxIgnore).map(function (item) {
        if ('/' === item.substr(-1, 1)) {
            item = item.substr(0, item.length - 1);
        }
        return "--exclude='" + item + "'";
    });

    var command = 'XZ_OPT=-9 GZIP=-9 BZIP=-9 /bin/tar --exclude-vcs --create --gzip ' + excludes.join(' ') + ' --file '
        + 'dist/true-combat-linux-complete-0.49b.tar.gz *';
    exec(command, { cwd: cwd }, done);
});

gulp.task('build-windows', ['build-install'], function (done) {
    var excludes = commonIgnore.concat(windowsIgnore).map(function (item) {
            if ('/' === item.substr(-1, 1)) {
                item += '*';
            }
            return '"' + item + '"';
        })
        .join(' ');
    var command = '/usr/bin/zip -9rq "dist/true-combat-windows-complete-0.49b.zip" . -x ' + excludes;
    exec(command, { cwd: cwd }, done);
});
