var tag = 'v1.1.114';
var logPadding = '####### ';

var log = function(msg){
  console.log(logPadding);
  console.log(logPadding + msg);
  console.log(logPadding);
};

require('shelljs/global');

log('Clone PDF.js');

exec('git clone https://github.com/mozilla/pdf.js');

pushd('pdf.js');

log('Checkout tag ' + tag);

exec(['git checkout ', tag].join(''));

log('Install dependencies');

exec('npm install');

log('Build generic bundle');

exec('node make generic');
exec('node make singlefile');
popd();

log('Copy viewer files to dist directory');

exec('mkdir dist');
exec('cp -a ./pdf.js/build/generic/web/. ./dist');
exec('cp -a ./pdf.js/build/singlefile/build/. ./dist');

pushd('dist');
exec('sed -i s/..\\\\/build\\\\/pdf.js/pdf.combined.js/g viewer.html');

log('Done');

