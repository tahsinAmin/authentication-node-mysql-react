# How To Setup

[Video Source](https://drive.google.com/drive/folders/1-JKe8wQVr-xN6bb3aYfbB560EauGYmtp?usp=sharing)

## Backend

- Install Xampp and start the Apache and Mysql Action.
- Create a database, name it "auth_db"
- go to backend folder `cd backend`
- Rename .env.sample to .env
- 4. Go to index.js file and uncomment "// db.sync();" at line 25.
- run `nodemon index.js`
- [Database is created. ]
- Comment that STEP 4, terminate the terminal and run `nodemon index.js` again.
- Install VSCode extension, "REST Client" by Huachao Mao
- Open request.rest file, you'll see "Send request" written in between line 2 & 3. Click to create admin


## Frontend
- Open a new terminal.
- go to frontend folder and run
  `cd frontend`
  `npm i`
- Start the project `npm start`. this will open a browswer tab with a login page
- Login with your admin account. Now, we can create user, and that user can create tickets.

# Todos
- [x] status, subject, description, assignedTo, reply
- [x] status that can be changed only by admin
- [x] admin can reply to post.
- [x] User can see reply
- [x] Admin will reply and resolve not, edit and delete
- [x] if resovled, Check, delete & reply controls will not show for admin
- [x] admin & user gets a notification that there's a change in the ticket List.
- [x] Show Open, closed, and all tabs for users
- [x] Tag https://bulma.io/documentation/elements/tag/
- [] How to setup.
- [x] Show user name in navbar
- [] Base path from .env
- [] Toast

