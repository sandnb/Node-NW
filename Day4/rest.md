## Key Principles of RESTful API's

1. ** Client-Server Seperation of responsibility:
    -  Clear Seperation btw client & server responsibilities.
    - Clients handle the user interface,  while servers manage data storage & processing
<!--Ecommerce
Users
Reviews
Products
Bookings
Returns
-->
app.get("/getUser")-> app.get("/user")
app.get("/reviewOfIphone")->app.get("/review")

2. ** API's should be statelessness

3. -*GET* -> getting data back
   - *POST* -> Creating resource
   - *PATCH* -> Update an exsisting resource
   - *DELETE* -> Delete resource