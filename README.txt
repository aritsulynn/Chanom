This README.txt file will show you how to run our website smoothly.

Before getting started, make sure you have our database sql file executed! This is the most important.
Also, make sure that you have a DB user and it matches the one in .env file!

Then, you should follow these steps

1. "npm install" on your terminal on both ws and src folder. Then "npm start" to start the server.

2. On your web browser, go to http://localhost:3030. This should get you to the login page.

Our website has been designed to login first before getting further to the other pages. 
You can try going to http://localhost:3030/home. It won't allow you.
You can try putting random username and password in, but it won't allow you to go through.
This is because our authentication web service works 😂.
Facebook and Google login don't work! They are just here for decoration.
We have provided an account for you. You can use the following

username: ict
password: ict555

3. Now you should be at the home page. You can explore it however you like. You can use the navigation bar to go to other pages.

4. Let's go to "Search Product" page. It initially shows 5 products (just for beauty). The search function supports 4 criteria. It will search and return the result according to what you put into the search form. If you don't put anything, it should show all products. Now try it, you can also use the test cases that we provide for you in the report and in the code. 

5. Now, to "Search Admin" page. You can search for admin info here. The search results will be shown as a table. On the right part of the table. You will see a blue pencil and a red bin symbol. Click on the blue pencil and it will allow you to edit admin info. Click on the red bin is to delete that admin.

6. In the product management page. On the left side, you will see a form to add a product into the system. You can try it out. On the right side, you will see a table displaying all of the current products that we have. Clicking on the drink name will reach you to the product detail page of that drink. 

7. You can try clicking on blue pencil symbol as well. It will load another page up where you can edit the product. Click confirm to save, or cancel will get you back to the product management page.

8. After editing the product, it will get you back to product management page. You can see that the product has been really edited. You can click to go to the detail page to verify it as well.

9. The same concept from 5-8 goes with user account management page.

10. The about us page contains store info. Scrolling down you will see "Ideal Weight" box. This is connected to a public web service called "fitness calculator API". It will return the ideal weight according to the input height and gender. You can try it out.

11. Now, try put in some random route like http://localhost:3030/dsajdojsaoi. This should get you to 404 not found page.

12. To logout, just click on logout on the navigation bar. This will get you back to the login page.

