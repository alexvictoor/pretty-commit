const classify = commits => {
    const featureCommits = commits.filter(commit => commit.substring(0, 4) === 'feat');
    const classifiedFeatureCommits = doClassify(featureCommits);
    const fixCommits = commits.filter(commit => commit.substring(0, 3) === 'fix');
    const classifiedFixCommits = doClassify(fixCommits);
    return {
        feat: classifiedFeatureCommits,
        fix: classifiedFixCommits,
    };
}

const doClassify = commits => commits.reduce((scopes, commit) => {
    const commitScope = scope(commit);
    const commitMessage = message(commit);
    if (scopes[commitScope]) {
        scopes[commitScope].push(commitMessage);
    } else {
        scopes[commitScope] = [ commitMessage ];
    }
    return scopes;
}, {})

const message = commit => {
    const collonIndex = commit.indexOf(':');
    if (collonIndex < 0) {
        return commit;
    }
    return commit.substring(collonIndex + 1).trim();
}

const scope = message => {
    const openIndex = message.indexOf('(');
    const closeIndex = message.indexOf(')');
    if (openIndex < 0 || closeIndex < 0) {
        return 'common';
    }
    return message.substring(openIndex + 1, closeIndex);
}

module.exports = classify;