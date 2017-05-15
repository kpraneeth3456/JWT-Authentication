Project Title:
JWT Authentication

Description:
This project is a basic Authorization and Authentication which exchanges JSON web tokens between the client and the server for more security.

Execution:
-Clone or download the repo from the GitHub link
-npm install (to download the dependencies)
-node index.js (To get the application running)

Working:
-User has to enter his email and password to register his account.(Use any third-party rest-client like Postman on port 3000)
-If the email already exists in the database it sends an error message and if the email does not exist it saves to the database.
-If the user is signed up then he can go ahead and Sign-in with same username and password.
-If the credentials are matched then a JSON web token will be sent to the client in the header.
-If the username and password do not match then it sends back an error message.
