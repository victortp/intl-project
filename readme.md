# Intl CLI project

![GitHub repo size](https://img.shields.io/github/repo-size/victortp/intl-project?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/victortp/intl-project?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/victortp/intl-project?style=for-the-badge)
![Github open issues](https://img.shields.io/github/issues/victortp/intl-project?style=for-the-badge)

Intl CLI is a project created to try out the JavaScript Internalization API

## Features

- Get user input and save to a JSON file
- Display formatted output into the console according to chosen language
- 100% of the code covered with tests

## TODO

- Add validation

## Requirements

- You need to have installed Node.js on version 14.3 ([download](https://nodejs.org/en/download/))

## Installation

```
  $ git clone https://github.com/victortp/intl-project
  $ cd intl-project
  $ npm ci
```

## Usage

In the CLI, enter a text following the template below to add data to the JSON file:

```
  {id} {comma separated vehicles} {Km traveled} {date from (yyyy-mm-dd)} {date to (yyyy-mm-dd)}
  $ 2 Boat,Ferry 10000 2022-03-01 2022-03-28
```

## Running the project

```
  $ npm run start
```

## Running the project with live-reload

```
  $ npm run dev
```

## Running tests

```
  $ npm run test
  $ npm run test:coverage
```
