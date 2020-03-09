# CS682 Modern E-commerce System

Authors:  
Fangda Chi  
Zhen Rong 'Dennis' Liew  
James Michaud

---
Boilerplate app based on [this tutorial](https://www.djamware.com/post/5ab6397c80aca714d19d5b9c/building-spring-boot-mongodb-and-reactjs-crud-web-application).  
  
---

To start, run the following script:  

`bash start_docker_compose`  

This will build the three containers, then start them all using docker daemons (in the background).  If you'd like to watch any of the container output (I do, and recommend you do too), create 3 new terminal tabs, then find the container IDs using  

`docker ps`  

You should see some containers listed. You're interested in the ones with `frontserver`, `backserver`, and `mongo` or `database` in their names. To view the realtime output of a container, type:  

`docker logs -f 5ea1be7f9bf9`, where `5ea1be7f9bf9` is replaced by whatever your containers ID is.

---

### Old instructions:

---

To start the back end:  
`backend$ ./gradlew bootRun`

---

You may need to install npm in the frontend directory  
`npm install`  

Build the front end:  
`frontend$ npm run build`  

This will cause the front end code to be built and moved into the `backend/src/main/resources/static` folder

---

You will also need to start MongoDB. On my mac I installed it using a package manager (homebrew) and started it with the command `mongod`.  
I'm not yet sure where the data lives on my computer, but  I'm sure I'll figure it out soon.