# obitasks
A simple  yet web app that serves as a personal task manager.

You can **create** a task, **modify** it by clicking it's text, mark it as complete, and **delete** it. The App lists all your created tasks. 

## How to run

### Clone & open
Clone this repo and open it in vscode.

### Sign in to MongoDB
- Sign into into your mongodb account and deploy a free database.
![image](https://github.com/ilya2s/obitasks/assets/42526358/6b9f54ef-4e8e-408d-948b-ae9c73d9b2c6)
- Create and username and **save your password**!
![image](https://github.com/ilya2s/obitasks/assets/42526358/3ac92dec-118c-44ca-b3a7-99395cd574de)
- Make sure your IP address is added (should be done by default) You can **Finish and Close**

### Get URI
- In the overview page goto Database (Left menu) then Click connect
![image](https://github.com/ilya2s/obitasks/assets/42526358/2440d57b-a829-4a7a-b8ba-7a8cf03b46d4)
- Select MongoDB for VScode
- copy the connection string provided : `mongodb+srv://<username>:<password>@cluster0.htkorea.mongodb.net/` Replace **\<password\>** by your password from above.

### Allow acces from anywhere
Make sure you go to Security -> Network Access -> Add IP Address -> Allow Access from anywhere.
![image](https://github.com/ilya2s/obitasks/assets/42526358/e84109c8-0c06-4940-a9b0-2b5fd9a85fed)


### Add URI to vscode
- In the project, goto the server directory and create a new file called `.env`
- Add these lines to the file:
```
MONGODB_URI=YOUR_CONNECTION_STRING
PORT=5000
TOKEN_KEY=Secret
```

### Add Base URL to client
- In the project, goto the `client` directory and create new file called `.env`
- Add this line to the file:
```
BASE_URL=http://localhost:5000
```

### Run Docker-compose
Run the following commands (make sure you're in the project root directory):
```
docker-compose build
docker-compose up
```
The application will be running in `localhost:5000`. You can stop it by running `docker-compose stop`
