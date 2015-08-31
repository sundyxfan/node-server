static server by node 
======================

##创建本地ssh##
* ssh-keygen -t rsa -C "email" 
##验证是否配置成功
* ssh -T git@github.com
* 出如下信息：Warning: Permanently added the RSA host key for IP address '192.30.252.131' to the list of known hosts.

Hi hawx1993! You've successfully authenticated, but GitHub does not provide shell access. 说明配置成功，可以连接上Github

##创建本地仓库
* git init
输出 Initialized empty Git repository in /Users/trigkit4/banner/.git/

* touch README.md //新建说明文件
* git init //在当前项目目录中生成本地git管理,并建立一个隐藏.git目录
* git add . //添加当前目录中的所有文件到索引 (添加文件到暂存区)
* git commit -m "first commit" //提交到本地源码库，并附加提交注释
* git remote add origin https://github.com/chape/test.git //添加到远程项目，别名为origin (将本地目录和远程目录关联起来)
* git push -u origin master //把本地源码库push到github 别名为origin的远程项目中，确认提交(将暂存区的文件提交到git目录)


##更新代码##
* git pull origin master //从github上pull 到本地源码库
* git commit -m "update test" //检测文件改动并附加提交注释
* git push -u origin master //提交修改到项目主线

##github 常用命令##

* git push origin master //把本地源码库push到Github上
* git pull origin master //从Github上pull到本地源码库
* git config --list //查看配置信息
* git status //查看项目状态信息 
* git diff aa.txt // 会具体显示aa.txt修改了那些内容
* git log // 查看提交日志
* git log --pretty=online 格式化查看
* git reset --head HEAD^ // 回退到上一个版本 HEAD^^ 前两版 HEAD~100 前100
* git checkout -- xx.js // 从缓存区恢复覆盖本地工作文件xx.js
* git rm xx.js 从工作区及缓存 git删除 再git commit 提交
* git reset HEAD xx.js //从HEAD区恢复覆盖缓存区工作文件
* git  log --graph // 查看分支合并图
* git reflog 查看命令历史
______
* 禁用fast forward 模式，git就会在merge 时生成一个新的commit,从分支历史上可以看到分支信息


# git diff test
# git diff --staged 缓存区和版本库之间的比较
# git reset
# git branch
# git master change
# git test-branch change
# 在master分支上开发  
# 在test-branch上开发
