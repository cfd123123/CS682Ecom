# CS682 Modern E-commerce System

Authors:  
Fangda Chi  
Zhen Rong 'Dennis' Liew  
James Michaud

---
Please visit the [wiki](https://github.com/JamesEdMichaud/UMBCS682Ecom/wiki) for detailed information.
  
---
### Quickstart info

Requires docker and docker-compose.  

To start, run `bash start_docker_compose` from a command line at the project folder.  

This will build three containers (frontend, backend, and database), then start them all using docker daemons.  

Press `ctrl+c` to stop the running containers

---

### Alternate instructions (not recommended, and instructions may not work on all machines):

---

To start the back end:  
`backend$ ./gradlew bootRun`

---

You may need to install npm in the frontend directory  
`frontend$ npm install`  

Build the front end:  
`frontend$ npm run build`  

This will cause the front end code to be built and moved into the `backend/src/main/resources/static` folder

---

You will also need to start MongoDB. On my mac I installed it using a package manager (homebrew) and started it with the command `mongod`.  
