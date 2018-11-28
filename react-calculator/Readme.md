### Test task

Middle/Senior React/Redux/Node developer at 6Systems, Kyiv

### For usage do:
````bash
npm i --development
npm run dev
````
### Problem statement

For developers it is extra required to know math. However, some mathematical operations better execute on a calculator (if you don’t agree, please, extract square root from 12345). For the following task you need to implement your own calculator with basic operations - plus (+), minus (-), multiply (*), divide (/), parentheses, x in power of y (^), and cancel operation. All calculations should be made on server side, all input on front-end. You can use attached image as a source of inspiration. As a result we want to see sources of your application on Github or any alternative git hosting.

#### Technical requirements (Basic implementation) - 100 points

The task should be made using React + Redux. For styling please use SASS css-modules, or styled-components. It would be a plus if you will use css grids. One of requirements is to make application works same way on mobile as on the desktop, and sure, the markup should be responsive. For type checking we prefer seeing Flow, but TypeScript is also fine. We would be super satisfied if you will use airbnb ESLint config for code style. Front-end + back-end communications could be done in REST way, or using websocket. Please, don’t trigger too much xhr’s - you should send to backend only one request, triggered by (=) sign containing operations and operands to execute. For extra points you could have server-side rendering.

#### ***EXTRA POINTS COULD BE ACQUIRED IN NEXT WAYS:

- Implement data storage - store on backend side 5 last operations, and display them for client. Example - mongoDB, redis, or any other prefered data storage. You can use ORM’s as well as raw SQL to handle data operations (Local storage, Session storage, or cookies won’t give you extra points, however, if user didn’t press “calculate” button, it would be nice to store his input in local storage for restoring on reload). - 25 points.
- Use GraphQL to fetch last operations from backend. - 10 points.
- Add error handling for your application. - 5 points.
- Add multilanguage support for those errors. - 5 points
- Show visual effects for loading, calculation, and input. - 10 points.
- User could use results of previous operation by clicking ANS button. - 5 points.
- Availability to use not only buttons, but keyboard input (we would like to see string parsing, and this could be helpful). - 10 points.
- Handwriting recognition (own implementation - 30 points, 3d party library - 10 points.)
- Calculate and show up the results on typing - 5 points.
- Cache and preload snapshots for often used/repeated operations/results (For example, if user makes 2^2 3 times in a row, on next launch of app, show 2^2=4 as a suggestion) - 5 points.
- Suggestions - based on previous user input, try to predict next one - if user enters 2^2, then 2^3, then 2^4, suggest him the result of 2^5. - 25 points.
- Live demo - deploy your application on any cloud platform (e.g. heroku) - 5 points.
- Dockerizing - you can wrap your application into a docker container. - 5 points.