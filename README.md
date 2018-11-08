# Portfolio-Site-Express-LowDB
[![Build Status](https://travis-ci.org/sangumee/Portfolio-Site-Express-LowDB.svg?branch=master)](https://travis-ci.org/sangumee/Udacity-Build-a-Portfolio-Site-Express)
![](https://img.shields.io/badge/Code%20Statue-Close-Red.svg)

## Introduction 
This project redeveloped Udacity's portfolio project using NodeJS, Express Framework and LowDB.

This project allows you to add, read, delete and modify your portfolio information. That is, it performs CRUD function. Most bugs that may occur while using the current program are fixed.

This project is now separate. The current Commit is the final version using the LowDB database. In the future, this project will be changed in a way that is managed using MySQL, and future additions are also supported only in the MySQL version. However, support for code reviews or issues is still valid.

## DEMO
Currently, this project provides a demo version using Heroku NodeJS hosting.

You can access with this link  
[Link](https://sangumee-portfolio.herokuapp.com/)

## How to Install this Project

This Project is works with NodeJS. If NodeJS is not installed your system. You can download the NodeJS [Here](https://nodejs.org)
1. Download this Project with this [Link](https://github.com/sangumee/Udacity-Build-a-Portfolio-Site-Express/archive/master.zip)
2. Open the console (CMD, BASH... any) and move to the directory that you save this project.
3. Install dependencies with this command, and NPM will install all of the dependencies in package.json
    ```
    npm install
    ```
4. supervisor is installed in this project, so You can run with this command 'node' can also use it
    ```
    supervisor ./bin/www
    ```
5. Enjoy~

## About this Project

In this project my portfolio infomation's are uploaded so you can rename the db.json.bak 

Key features include:

- Adding a portfolio
- Read Portfolio
- Portfolio Update
- Delete a portfolio
- Portfolio sorting on the main page
- Parsing README.md file when entering Github link

The following bugs were fixed:

- Alternate image settings when importing data without image information from the main page

- Fixed the problem of changing the image information to NULL value when the image is not uploaded again when updating DB with image information.

- Fixed a problem that page breaks when Github's REAMD.md file does not exist

- Correspondence code for problems that may occur when the information in the DB and the information in the front do not match due to problems that may occur in other servers

## Issue

If you have some problem or find some bugs in this project, You can announce with Issue Tab with this [Link](https://github.com/sangumee/Udacity-Build-a-Portfolio-Site-Express/issues)

## Used Technology
- NodeJS
- Express
- LowDB

# License
This project is released under the [MIT License](https://choosealicense.com/licenses/mit/). If you think there is a problem with this license, please file an issue through the Issue section.