# create-pretty-commit

This is a very simple CLI tool that generates changelogs based on commit messages. It works if you follow the Angular commit convention. It is build with a 'trunk based' workfow in mind, where releases happens often, no tags involved. The tool will take as a parameter the last commit that has been deployed in production and will generate a changelog   from the following commit messages.    
For now, only 'feat' and 'fix' commits are taken into account, chore/tests/docs commits are ignored.  

To give it a try on your project, the more efficient way is to use **yarn**:
```
  yarn create pretty-commit changelog  REPO_PATH  LAST_COMMIT
```
**REPO_PATH** is the path to your git repository  
**LAST_COMMIT** is the sha of the last commit you do not want to appear in the changelog  

If you prefer **npx**, you can try something like that:
```
  npx create-pretty-commit changelog  REPO_PATH  LAST_COMMIT
```
NOTE: npx will be a little bit slower (seems to be related to how npx reinstall everything at each run)