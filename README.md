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
* git add . //添加当前目录中的所有文件到索引
* git commit -m "first commit" //提交到本地源码库，并附加提交注释
* git remote add origin https://github.com/chape/test.git //添加到远程项目，别名为origin (将本地目录和远程目录关联起来)
* git push -u origin master //把本地源码库push到github 别名为origin的远程项目中，确认提交

##更新代码##
* git pull origin master //从github上pull 到本地源码库
* git add .
* git commit -m "update test" //检测文件改动并附加提交注释
* git push -u origin master //提交修改到项目主线

##github 常用命令##

* git push origin master //把本地源码库push到Github上
* git pull origin master //从Github上pull到本地源码库
* git config --list //查看配置信息
* git status //查看项目状态信息 
