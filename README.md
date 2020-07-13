# Side Hustle

## Description
The web application that connects potential customers with the people that are willing to sell their service.\
Services, escpecially tutoring, are usually advertised on pin-walls and street poles by people who have the potential of making more money.\
The change that their advertisement is seen is based on the number of people that pass by the advertisement, and not most of them need the service.\
Side Hustle could be the break through for this problem by centralizing these parties on a single platform, where talents could make themselves a profile and the custoers could just look up the service name on the search bar.

## Table Of Contents
1. [User](#User)
2. [Developer](#Developer)
    - [BackEnd](#BackEnd)
    - [FrontEnd](#FrontEnd)

## User
All users, whether suppliers or customers, **should have a profile** made for themselves.\
The profile being made must include **contact info** (mandatory: email, optional: social media fields listed) and an **address**, as it is necessary to enable both parties to get in touch and to meet up if applicable.\
The email is going to be registered once the user has signed up and the address is going to be prompted when creating or editing the user's own profile in the **dashboard**.\
For customers to be able to search up talents, click the **search** tab and type-in the talent in the search bar.\
For supploers, each field in the profile creation is crucial to give customers the details you want them to know, and follow the prompt details for each field.\
\
Each customer that has been served can rate their supplier after he/she has given the service.

## Developer
To briefly introduce, this web application is built using the **MERN** (MongoDB, Express.js, React.js, Node.js) stack, in the manner where the client file (the React App) is inside the root.\
To re-explain the **file organization**, the root of the project contains the React App (the client folder), the server.js (equivalent to index.js), and the back-end routes (in routes/api).

## BackEnd
The **Express Router** is used for the different routes, which are defined in the routes/api folder.\
\
**User routes** are in auth.js and users.js, in which the auth.js post request registers the user and the user.js post request logs the user in.\
The get request in auth.js is used to load the user into the React App later in the front-end.\
\
For authentication, we use **JSONWebToken**, and the function for this is located in the middleware folder (inside auth.js).\
The profile routes are in profile.js (within the routes/api folder).\
The profile creation/update route is also responsible for utilizing **OpenCage API** to get the geometry latitude and longtitude of the address, while a **Google Maps API** is being sent to the React App by the profile.
The connection to **MongoDB** is in the config folder (inside db.js).

## FrontEnd
This section is within the client folder.\
\
The public folder is for the HTML file and for the favicon to be displayed.\
The rest of the code is located within the src folder.\
\
One crucial element is **Redux** state management to keep hold of the data needed at the moment, which includes auth (the token stored), profile (the profile(s) being displayed), and alerts to inform users after their actions.\
And as usual, The Redux boilerplate, is placed in store.js.\
\
The actions folder contains functions that call the back-end using **axios**. For it to be able to communicate with the back-end, the base URL is listed in the package.json as **proxy** (at the bottom of the file).\
\
