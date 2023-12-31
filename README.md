# Moneyhub Tech Test - Investments and Holdings

At Moneyhub we use microservices to partition and separate the concerns of the codebase. In this exercise we have given you an example `admin` service and some accompanying services to work with. In this case the admin service backs a front end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

## Requirements

- An admin is able to generate a csv formatted report showing the values of all user holdings
    - The report should be sent to the `/export` route of the investments service
    - The investments service expects the csv report to be sent with content-type application/json 
    - The csv should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
    - The holding should be the name of the holding account given by the financial-companies service
    - The holding value can be calculated by `investmentTotal * investmentPercentage`
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages)
- Make effective use of git

We prefer:
- Functional code 
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

### Notes
All of you work should take place inside the `admin` microservice

For the purposes of this task we would assume there are sufficient security middleware, permissions access and PII safe protocols, you do not need to add additional security measures as part of this exercise.

You are free to use any packages that would help with this task

We're interested in how you break down the work and build your solution in a clean, reusable and testable manner rather than seeing a perfect example, try to only spend around *1-2 hours* working on it

## Deliverables
**Please make sure to update the readme with**:

- Your new routes
  Admin - localhost:8083
  - `/userHoldings` get user holding data and send it to `/export` route of investments service
- How to run any additional scripts or tests you may have added
  - run `npm install axios` to install required library 
- Relating to the task please add answers to the following questions;
    1. How might you make this service more secure?
        - In order to make this application more secure, firstly we can restrict the allowable file types and also include input validations for any data being captured at the frontend. We can avoid using inline javascript and opt for content security policy , that will secure the communication between client and server and will disable running any inline script on our application.
    2. How would you make this solution scale to millions of records?
       - The solution can be scaled to millions of records by splitting the data into features based on most important details. We could have separate service/lookup for each feature and few main services which use these microservices to retrieve the data internally. This would ensure clean and readable code, while also make API calls faster.
    3. What else would you have liked to improve given more time?
       - I would add try and catch blocks to capture and handle all possible errors 
         I would have spent some more time debugging the code to understand why the .csv file was not written.
         I would have added comments explaining the code making it more readable.
  

On completion email a link to your repository to your contact at Moneyhub and ensure it is publicly accessible.

## Getting Started

Please clone this service and push it to your own github (or other) public repository

To develop against all the services each one will need to be started in each service run

```bash
npm start
or
npm run develop
```

The develop command will run nodemon allowing you to make changes without restarting

The services will try to use ports 8081, 8082 and 8083

Use Postman or any API tool of you choice to trigger your endpoints (this is how we will test your new route).

### Existing routes
We have provided a series of routes 

Investments - localhost:8081
- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082
- `/companies` get all companies details
- `/companies/:id` get company by id

Admin - localhost:8083
- `/investments/:id` get an investment record by id
