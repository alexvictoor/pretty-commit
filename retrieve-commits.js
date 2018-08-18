const nodegit = require('nodegit');
const path = require('path');

const retrieveCommits = (repoPath, lastCommitHash) => (
    new Promise((resolve) => (
        nodegit.Repository.open(path.resolve(__dirname, `${repoPath}/.git`))
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
    )
));

module.exports = retrieveCommits;