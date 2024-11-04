## HTTP Packet
* Header : metadate about the packet
* cookies -> part of the header
* Body : contains actual data that is bein sent

## Cookies
* Cookies is a client side storage
* it stores the data in the format of `key : value` pairs. These paris shoudl be of type string
* Server sends these cookies to the client
* On the client side these cookies are stored and mapped to the server that has send the cookies
* For next request -> client will automatically share this cookies with server

### Learning :
* used to share some data to the client that server can access later

## Identification vs Authentication vs Authorization

**Identification**: identification is the process of  stating or claiming whi you are, it is the initial stop where a user asserts an identity, but it doesn't validate the authenticity of the claim.

**Authentication**: is the process of verifying whether the claimed identity is  valid and accurate. It ensures that the user's identity is genine before granting access to protected resources or functionalities
        * login,otp,biometric
        * web token -> JSON Web Token(JWT) -> creation -> login
                                              validation -> when you want to acces a protected data/functionality
        * Constraints -> 
            * if every token is user specific -> we have to store all of their info -> O(n)
            * these should be secure 


**Authorization**: is the process of determining what actions an authenticated user is premitted to access within a system or application

## JSON Web Token
JSON web token is built out of 3 components
    * `Payload`: plain text(Identifier of user)
    * `Algorithm`: plain text in the name of algorithm
    * `Signature`: encrypted text build using an alogrithm encrypting three texts
                            (payload+algo+secret key)
    * secret key is only know by the server