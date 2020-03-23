# GitLab project pipeline status checker
> NodeJS script for checking pipelines status

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)

## General info
Script made to keep track of successful, failed and cancelled pipelines triggered by a specific user in a project.

## Technologies
* NodeJS - version 12.14.1

## Setup
Clone the repo and type `npm install`

## Code Examples
Show examples of usage:
`pipeline-checker [options]` 

`pipeline-checker -t TOKEN -p PROJECT ID -u USERNAME --pg PAGE`

Options: `--version`, `-h`, `-t`, `-p`, `-u`, `--pg`

## Features
List of features ready and TODOs for future development
* Get all project's pipeline triggered by a user
* Save output to a `.csv` file
* List URLs to all failed pipelines

To-do list:
* TBD
* TBD

## Status
Project is: _in progress_

