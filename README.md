# Mental Health Assistant

## Pre-requisites
- git
- python 3
- pip
- npm

## Installation

Clone and cd to repo

Create and python virtual environment
```bash
$ python -m venv venv
```

Start virtual environment using venv

Linux/MacOS:
```bash
$ source venv/bin/activate
```
Windows:
```cmd
> venv\Scripts\activate
```

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install all dependencies
```bash
$ pip install -r requirements.txt
```
## Usage

Use developement .env file
Linux/MacOS:
```bash
$ cp example.env .env
```

Windows:
```cmd
$ copy example.env .env
```

Start flask development server
```bash
$ flask run
```

Install node_modules
```bash
$ cd frontend
$ npm install
```
Run react
```bash
$ yarn start (for development)
$ yarn start (for production)
$ npm start
```
