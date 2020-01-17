const fs = require('fs');
const gitRev = require('git-rev');

const pkg = require('../package.json');

// Read file.
const contents = fs.readFileSync('./index.js', 'utf-8');

// Update log message in index.js.
const timestamp = getBuildTimestamp();
gitRev.short(hash => {
    const newContents = contents.replace(
        /console.log\('A-Frame Proxemic Components Version.*\)/,
        `console.log('A-Frame Proxemic Components Version: ${pkg.version} (Date ${timestamp}, Commit #${hash})')`);
    fs.writeFileSync('./index.js', newContents);
});

/**
 * @returns {string} of format `2017-12-25`.
 */
function getBuildTimestamp () {
    const timestamp = new Date().toISOString().slice(0, 10);
    return timestamp;
}