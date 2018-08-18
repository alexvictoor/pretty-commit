// @flow
const nodegit = require('nodegit');
const path = require('path');

const retrieveCommits = require('./retrieve-commits');


const [repoPath, lastCommitHash] = process.argv.slice(2);


(async () => {
    const commits = await retrieveCommits(repoPath, lastCommitHash);
    commits.forEach(c => console.log(c));

})();
