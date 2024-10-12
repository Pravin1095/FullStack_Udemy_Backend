# FullStack_Udemy_Backend

Filtering routes in middleware:

In the placeRouter middleware , we are geiving the 1st argument as /api/places which means that whatever routes we are setting in placeRouter file that takes the 1st argument value in front of that. Eg: if I give router.get('/:pid',...) , I'll get api/places/:pid as the url.

92 . Getting a place by userID

In this lecture we have an important point that when we give any param after places, that will be considered as :pid as it is a dynamic value so express thinks that to be dynamic value and executes the /:pid route . Eg: If we give /api/places/user, the user will be taken as :pid by express. So to avoid this we can put the api/places/user function in top of /:pid if we have one.

Error handling:

When we put error as 1st argument in the middleware express will take it as an error handling middleware. So this middleware works for the requests where an error is thrown as a response .
We use res.headerSent to check if a response is already sent or not . If not the next line. Now we set the status of the code in next line . Now in next line we check for an error message is present or not or we'll send an unknown error. 
The throw error in the requests will trigger the error handling middleware

When you pass an argument to next() in Express, it signals to the framework that an error has occurred. Express then skips all remaining non-error-handling middleware and routes, jumping directly to the error-handling middleware. This is a crucial mechanism for handling errors in an Express application.

Validating API input request :

Install a dependency express-validator with command npm install --save express-validator

Model View Controller (MVC):

PAssing ourrouting logics to controllers

bodyParser: 

bodyParser.json() : This converts javascript data to regular objects and arrays


MongoDB :

We should never connect React (client) directly to MongoDB di=ue to security reasons as users can access the database. So we need to connect React to Backend Node Express and from there to MongoDB

Always use cooncetion string that has Node version above 2.2 in 'connect to your application' under divers

Transactions and sessions in mongoose:

Transactions allows you to perform multiple operations in isolation of each other and transactions are built on sessions. So to work with these transactions we need to first start the sessions, then we can initiate the transaction, with that the place is created and the place is stored in our users document