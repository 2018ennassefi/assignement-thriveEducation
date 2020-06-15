# Assignement:Thrive-Education

## Getting started

Start by cloning the repository to your computer.

### Prerequisites
You will need to have *Docker* for this to work.

### Technical stack
In this project, Sqlite3 was used for the database, SQLAlchemy for the database connexion , Flask for the back and react for the front.

### Installation
Go to folder you have just cloned in your cmd line, and run 
```
docker-compose up -d --build
```
This will build two containers, one for the server service and one for the client service.
The server container will be automatically run.
However you will need to run the following commands to run the client container.
```
docker ps -a
```
Get the name of the client container , it will most likely be  assignement-thriveeducation-master_client then run :

```
docker run -it -p 3000:3000 assignement-thriveeducation-master_client

```
This is necessary due to React requiring an interactive cli, otherwise it will exit.

### Ports
The server container is listening on port 5000.

The client container is listening on port 3000.

### Initiliazing the database
To intiliaze the database, simply go to localhost:5000/init.
### Conclusion
We are done ! You can now see the page with all its content is localhost:3000.
