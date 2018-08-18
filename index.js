#!/usr/bin/env node

const retrieveCommits = require('./retrieve-commits');
const classifyCommits = require('./classify-commits');
const markdown = require('./markdown-renderer');


const [command, repoPath, lastCommitHash] = process.argv.slice(2);

if (command === 'changelog') {
    (async () => {
        const commits = await retrieveCommits(repoPath, lastCommitHash);
        const classifiedCommits = classifyCommits(commits);
        //console.log(JSON.stringify(classifiedCommits));
        console.log(markdown(classifiedCommits));
    
    })();
} else {
    console.log('-- Pretty commit ---------------------------------------------------------------------------');
    console.log('-                                                                                          -');
    console.log('-  Usage:    npx  pretty-commit  changelog  REPO_PATH  LAST_COMMIT                         -');
    console.log('-                                                                                          -');
    console.log('--------------------------------------------------------------------------------------------');
}

