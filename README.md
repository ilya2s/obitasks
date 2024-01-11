# obitasks
A simple  yet web app that serves as a personal task manager.

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

### Add URI to vscode
- In the project, goto the server directory and create a new file called `.env`
- Add these lines to the file:
```
MONGODB_URI=YOUR_CONNECTION_STRING
PORT=5000
```
- save
- in a terminal run `npm start`
