`PROJECT SUBMISSION OVERVIEW`

This is my submission project of a library management system which aids the effective management of a library, its operations, its members and its book catalogs using its functionalities. The current possible functionalities of the system which I was able to implement within the stipulated project timeframe is as follows;
1.	Registration of members, librarians and Admin.
2.	Login of members, librarians and admin.
3.	Logout of members, librarians and admin.
4.	Assigning of user roles by admins.
5.	Book management including view all available books in the library.
6.	Adding of new books, increasing the count of old books, updating books and removing books by Librarian
7.	Borrow functionalities for members, returning of borrowed book and charging of #100 fee for every overdue book.
8.	View all borrowed books.
9.	View borrow history of books.
10.	Posting, Getting and Updating of Records by Librarian and Admin

`API DOCUMENTATIONS`

`1. Users Registration, Login and Logout (members, librarians, admins)`

•	POST: /api/v1/library/user/register - User register. Request Body: {email, password, firstName, lastName, role}

•	POST: /api/v1/library/user/login - User login. Request Body: {email, password}

•	GET: /api/v1/library/user/logout - User logout


`2. Assign User Roles and User Management (Admin)`

•	POST: /api/v1/library/admin/user/role/:userID - Assign a user role. Request Body: {role}

•	GET: /api/v1/library/admin/users?filter - Query Users by firstName, lastName or email


`3. Books Management`

•	GET: /api/v1/library/book/ - Get All Books 


`4. Adding, Updating, Removing And Management of Book (librarians)`

•	POST: /api/v1/library/book/ - Add Book. Request Body: {title, author, ISBN, genre, bookCount, publicationDate }

•	GET: /api/v1/library/book/ - Get all books

•	PUT: /api/v1/library/book/:bookID - Update Book. Request Body: {update  json}

•	DELETE: /api/v1/library/book/:bookID - Remove Book

•	GET: /api/v1/library/book/query?filter - Query for book/books using filter such as author, title, publicationDate, genre


`5. Borrow And Return of Books (members)`

•	POST: /api/v1/library/book/borrow/:bookID/ - borrow book. Request Body: {startDate}

•	POST: /api/v1/library/book/return/:bookID/ - return book. Request Body: {endDate}

•	GET: /api/v1/library/book/borrows - View all borrowed books

•	GET: /api/v1/library/book/histories - View borrow histories (OPEN TO ALL USERS)


`6. Reviewing and Rating of Books (members)`

•	POST: /api/v1/library/book/review/:bookID - Review and Rate a book. Request Body: {rate, review}


`7. Record Posting And Management ( librarians)`

•	POST: /api/v1/library/record - Post Records. Request Body: {totalMembers, totalBooks, totalBorrowings, totalAmountFromFees}

•	GET: /api/v1/library/record - Get All Records

•	PUT: /api/v1/library/record/:recordID - Update a Record. Request Body: {update}


`APPLICATION INSTALLATION GUIDE`

In the project directory, you can run:
yarn install or npm install 
Install node and other dependencies. 

yarn start or npm start
Runs the app in the development mode.
Open http://localhost:8001/ to view it in the browser.
You will also see any errors in the console.

yarn test or npm test
Launches the test runner in the interactive watch mode.
Jest, Supertest and Fakerjs is used for testing purposes.  
 
yarn build or npm build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
Your app is ready!





