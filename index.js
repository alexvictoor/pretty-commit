// @flow
const nodegit = require('nodegit');
const path = require('path');

const retrieveCommits = require('./retrieve-commits');
const classifyCommits = require('./classify-commits');


const [repoPath, lastCommitHash] = process.argv.slice(2);


(async () => {
    const commits = await retrieveCommits(repoPath, lastCommitHash);
    const classifiedCommits = classifyCommits(commits);
    console.log(JSON.stringify(classifiedCommits));

})();
