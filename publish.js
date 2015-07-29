var tag = 'v1.1.114';

require('shelljs/global');

console.log('clone PDFJS');

exec('git clone https://github.com/mozilla/pdf.js');

pushd('pdf.js');

console.log('checkout tag ' + tag);

exec(['git checkout ', tag].join(''));

console.log('install dependencies');

exec('npm install');

console.log('build generic bundle');

exec('node make generic');
popd();

console.log('copy viewer files to dist directory');

exec('mkdir dist/generic');
exec('cp -a ./pdf.js/build/generic/web/. ./dist/generic');
