# Mental Health Assistant

Hello! Mental Health Assistant is a tool to help people struggling with health issues have a safe space to share their thoughts in a secure and personal manner.

## Pre-requisites

- git
- python 3
- pip
- node
- docker

## Tech Stack Used

Flask (Python), React (JS), PostgreSQL

## Installation

Clone and cd to repo

Use developement .env file in **backend** folder.

```bash
$ cp ./backend/example.env ./backend/.env
```

Initialize db using the command while in the backend folder:

```bash
$ flask db init
```

Start the containers in the root folder using:

```bash
$ docker-compose up
```

## Contributing
