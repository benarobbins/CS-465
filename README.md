# CS-465
CS-465 Full Stack Development

Architecture:
The client-side front-end application utilizes Express HTML and Node JS while the administrative single-page application (SPA) utilizes Angular. The back-end utilizes a NoSQL MongoDB database due to its compatibility with both Express HMTL and Angular through the use of mongoose.

Functionality:
Data for the application, both the client-side and SPA, communicate with the back-end MongoDB database to retrieve the required information. The information is stored in JSON format which identifies values with a key. One instance of refactoring code to improve functinoality and efficiences includes the use of Handlebars. Handlebars was used to create partial views that can be called in HTML files to reduce duplicate code for common features such as headers and footers.

Testing:
A valuable tool for testing the functionality of APIs is Postman. Postman allows API calls to be initiated externally to the in-process application and observe the outputs in a controlled environment. The API endpoints were also secured using authentication strategies to verify API requests come from valid users by utilizing JSON Web Tokens.

Reflection:
I have learned how to utilize the MEAN stack for a full-stack development project. I have also developed a stronger understanding of security best practices and how to implement data controls in a real application.
