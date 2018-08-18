const nodegit = require('nodegit');
const path = require('path');

const retrieveCommits = (repoPath, lastCommitHash) => (
    new Promise((resolve) => (
        nodegit.Repository.open(path.resolve(__dirname, `${repoPath}/.git`))
        .then(
            repo => repo.getMasterCommit()
        ).then(function(firstCommitOnMaster){
            console.log('aaaaaaaaa', JSON.stringify(firstCommitOnMaster, null, 2));
            // History returns an event.
            var history = firstCommitOnMaster.history(nodegit.Revwalk.SORT.TIME);
            
            // History emits "commit" event for each commit in the branch's history
            let lastCommitInProdFound = false;
            
            const commits = [];
            history.on("commit", function(commit) {
                console.log('sha', commit.message());
                lastCommitInProdFound = lastCommitInProdFound || commit.sha() === lastCommitHash;
                if (lastCommitInProdFound) {
                    console.log('done');
                    resolve(commits);
                } else {
                    commits.push(commit);
                }
            
            });
            // Don't forget to call `start()`!
            history.start();
        })
        .done()
    )
));

module.exports = retrieveCommits;