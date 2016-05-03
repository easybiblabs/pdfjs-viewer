var tag = 'v1.5.188';
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
popd();

log('Copy viewer files to dist directory');

exec('mkdir dist');
exec('cp -a ./pdf.js/build/generic/web/. ./dist');
exec('cp -a ./pdf.js/build/generic/build/. ./dist');
exec('cp ./pdf.js/LICENSE ./dist');

pushd('dist');

log('Done');

