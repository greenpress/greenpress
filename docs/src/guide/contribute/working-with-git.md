# Working with Git

We prefer working with rebase and NOT with merge.
To explain why let's take a real world scenario:

You’re working on a custom branch, while the master branch was also updated.

You finished some work and want to be updated with the master branch.
If you will do pull from master the tree of commits will look like this:

* master-branch--commit1\
* master-branch--commit2\
-------------------------------------\
* yourBranch--commit1\
* yourBranch--commit2\
-------------------------------------\
* master-branch--commit3

BUT If we will do rebase, our tree will look like this:
* master-branch--commit1\
* master-branch--commit2\
* master-branch--commit3\
-------------------------------------\
* yourBranch--commit1\
* yourBranch--commit2

As you can see, it makes an order with our commits and branch master’s commits.

Now that we understand why we prefer to rebase we should learn how to rebase.
In the terminal type the following commands \


    $ git fetch

    $ git rebase origin/master
   

It will re-commit all the commits you have made one after another.
if it will find a conflict, you must handle it and then type
$ git rebase —continue

on any stage, if something goes wrong, you can do \


    $ rebase —abort

to undo the rebase

done successfully?


    $ npm install


commit the package-lock.json
** only if the package.json file has changed in both master and [yourBranch].

Be aware that git rebase creates a new tree. It means that our commits have
new HASHES so you CANNOT push regularly to [yourBranch] anymore,
but we have two options:/
* push with:



    $ origin my-branch -f (it’s faster if you’re working alone on the branch).


* checkout to a new branch (from [yourBranch]):



    $ git checkout -b [yourNewBranch]
    $ git push --set-upstream origin [yourNewBranch]


If other developers work with you on the same [yourBranch] - you must informed them and tell them to checkout to [yourNewBranch] and commit their work to that branch.
If they issue a problem :


		$ git stash
		$ git checkout yourNewBranch
		$ git stash pop
