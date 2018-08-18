const renderer = classifiedCommits => {

    return (
`# Changelog
## Features
${renderCommits(classifiedCommits.feat)}
## Fixes
${renderCommits(classifiedCommits.fix)}
`);
}

const renderCommits = commits => (
    Object.keys(commits)
        .sort()
        .map(scope => `### ${scope}\n` 
                        + commits[scope].map(msg => `* ${msg}`).join('\n')
        )
        .join('\n')
);

module.exports = renderer;