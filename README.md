# Mental Health Assistant

Hello! Mental Health Assistant is a tool to help people struggling with health issues have a safe space to share their thoughts in a secure and personal manner.

## Tech Stack Used

Flask (Python), React (JS), PostgreSQL

## Project Requirements

**Web Server**: Our project has a backend API coded in Flask, as well as frontend in React. The Flask backend and React frontend have been containerized separately as well!

**Database**: We have a PostgreSQL Database for our project, which is also containerized separately.

**Containers**: We have five total containers (React frontend, Flask backend, nginx certbot, Postgres, and cadvisor).

**CI/CD**: We use Github Actions for auto-deploying to AWS, containerizing, and linting when we make pull requests and pushes to the main branch.

**Monitoring**: We used a Cadvisor container to monitor the state of our website.

**Deployment**: We are deployed to AWS on [mentalhealthme.tech](https://mentalhealthme.tech/) using nginx reverse proxy.

![docker ps output](./img/docker-ps-output.png)
![monitoring](./img/cadvisor.png)

## Production Engineering

### **Containers**

We containerized each portion of the website **separately** to ensure that they could be updated separately. We used **networks** to link the containers together as needed, which improved the security of the data since only the required containers were exposed. The frontend container utilizes GET and POST fetch queries in React to communicate with the Flask backend. In turn, the Flask backend container communicates with the MhaDB container to retrieve the desired information. The nginx container reverse proxies our website at port 80 to ensure that the frontend interface is accessible to our users. The Cadvisor container monitors the performance of our containers.

### **CI/CD**

We implemented CI/CD via Github Actions to auto-deploy to our AWS instance, as well as containerize and lint our code. We also configured the linter to automatically make the changes desired for the linter to pass.

### **Organization**

We stayed organized through these past three weeks through the use of Github's project boards and daily calls. We stayed up to date on all the latest changes to the code by ensuring that at least one other member was able to approve and merge a pull request. We avoided major git conflicts through this strategy, and we were able to complete our tasks in an efficient manner.

### **Challenges we ran into**

- The major challenge we ran into was properly containerizing the frontend and backend folders so that it would compile on Amazon's side. We were able to solve this through looking back at Trainual content as well as getting help from our pod leader.
- Another challenge we faced after containerizing the folders was configuring the nginx to work properly when redirecting to our React frontend when using our production docker-compose file as well as our development one. We succeeded in solving this issue after configuring React to build during the containerizing process.

### **Next Steps**

If given more time, something that our team was looking forward to implementing was using Prometheus and Grafana to build interactive dashboards to simplify monitoring for our site.

### Pre-requisites

- git
- python 3
- pip
- node
- docker

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
