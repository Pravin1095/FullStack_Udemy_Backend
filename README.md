# FullStack_Udemy_Backend

Filtering routes in middleware:

In the placeRouter middleware , we are geiving the 1st argument as /api/places which means that whatever routes we are setting in placeRouter file that takes the 1st argument value in front of that. Eg: if I give router.get('/:pid',...) , I'll get api/places/:pid as the url.

92 . Getting a place by userID

In this lecture we have an important point that when we give any param after places, that will be considered as :pid as it is a dynamic value so express thinks that to be dynamic value and executes the /:pid route . Eg: If we give /api/places/user, the user will be taken as :pid by express. So to avoid this we can put the api/places/user function in top of /:pid if we have one.

Error handling:

When we put error as 1st argument in the middleware express will take it as an error handling middleware. So this middleware works for the requests where an error is thrown as a response .
We use res.headerSent to check if a response is already sent or not . If not the next line. Now we set the status of the code in next line . Now in next line we check for an error message is present or not or we'll send an unknown error. 
The throw error in the requests will trigger the error handling middleware
