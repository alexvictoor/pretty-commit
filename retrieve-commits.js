const nodegit = require('nodegit');
const path = require('path');
const fs = require('fs');

const retrieveCommits = (repoPath, lastCommitHash) => (
    new Promise((resolve) => {

        const fullPath = [ 
            path.resolve(`${repoPath}/.git`), 
            path.resolve(__dirname, `${repoPath}/.git`), 
        ].find(fs.existsSync); 

        if (!fullPath) {
            console.error(`Git repository not found with path ${repoPath}`);
            throw new Error('Incorrect command line arguments');
        }

        nodegit.Repository.open(fullPath)
        .then(
            repo => repo.getMasterCommit()
        ).then(function(firstCommitOnMaster){
            // History returns an event.
            var history = firstCommitOnMaster.history(nodegit.Revwalk.SORT.TIME);
            
            // History emits "commit" event for each commit in the branch's history
            let lastCommitInProdFound = false;
            
            const commits = [];
            history.on("commit", function(commit) {
                if (lastCommitInProdFound) {
                    return;
                };
                lastCommitInProdFound = lastCommitInProdFound || commit.sha() === lastCommitHash;
                const firstRepoCommit = commit.parentcount() === 0;
                if (lastCommitInProdFound || firstRepoCommit) {
                    resolve(commits);
                } else {
                    commits.push(commit.summary());
                }
            
            });
            // Don't forget to call `start()`!
            history.start();
        })
        .done()
    }
));

module.exports = retrieveCommits;