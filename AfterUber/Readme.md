### For usage do:
````bash
npm i
npm run dev
````
### Required Functionality

We just started a new company called AfterUber. We offer much better prices than Uber — 20%
off. Write an application that gets the customer's start address and destination address, then uses the
Uber API to get Uber's pricing, and offers 20% off Uber's price (before the customer orders the
car). You can use any programming languages, frameworks or helper libraries.
Think carefully which functionality is the responsibility of the server, and which functionality belongs
on the client-side.

The application should include the following:
Web UI:
- Start address (example: 1452 56th Street, Brooklyn, NY 11219)

- Destination address.

- Use one text box for each address and don't split it into the address elements.

- A button to activate the service.

- Use Javascript to send the request to server (i.e. not the default HTML FORM submit
behaviour).

- Output:

    - Name of the service (UberX , UberXL, UberBLACK, etc. — the name should start
with "After"; ex: "UberX" should be "AfterUberX").
    - The new estimated price.
    - Show a decent UI for the results (you can use Bootstrap or a similar framework).

Back end:

- Implement a call to the price estimate service.

- Uber API can be found here: https://developer.uber.com/docs/