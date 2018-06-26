const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'mapapp', shell: true };
require('child_process').spawn('yarn', args, opts);
