# My Pretty ToDos App
### Capstone Project
```
Student: Olena Chudnovets
Course: Cloud Developer
Project: Serverless TODO Application
Data: Marth 22 2021
```

## Git repositoryes: 

### Buckend:
https://github.com/olenairy/olenairy-sls-todo-courses.git

### Frontend:
https://github.com/olenairy/olenairy-sls-todo-courses-client.git

## Description
For my Capstone Project I chose Serverless technology because that enable me to build more agile applications, for example AWS Lambda come with automatic scaling, built-in high availability.<img width="40" alt="AWS" src="https://user-images.githubusercontent.com/67039993/112070474-7f08f180-8b4c-11eb-9152-3b1ec7e9d22a.png">

</br><b>My Pretty ToDos App</b> based on code from course 4 project and have more functionality features. Frontend of the project was largely changed both visually and functionally. Added feature to edit text and Due Date, not only change the image. Added redirecting to result page after edit text or upload image.

## Screenshots
![003-capst](https://user-images.githubusercontent.com/67039993/112070107-d22e7480-8b4b-11eb-90fc-8b8ddc924cce.png)

## Functionality
<b>Pretty ToDos App</b> keep the ToDo list and shows them beautifully. Allows users to update images, edit text and Due Date.
User of the web application can use the interface to create, delete and complete ToDos. The application allows users to upload a file. User of the web interface can click on a "image" button, then select and upload a file.
</br><img width="250" alt="Edit-Image_Delete_Button" src="https://user-images.githubusercontent.com/67039993/112071447-892bef80-8b4e-11eb-9689-51310f5de05a.png"></br>
After that the file is being process to convert to thumbnails picture. Was created additional AttachmentsBucket for storage small pictures.  File appear in the Todo properties on the home page. Pictures deleted from two backets - AttachmentsBucket and ThumbnailsBucket after delete ToDo item. 
</br><img width="600" alt="ThumbnailsBucket" src="https://user-images.githubusercontent.com/67039993/112071670-12432680-8b4f-11eb-91b6-d2b0caaca207.png"></br>
User of the web interface can click on a "pencil" button, then edit Todo and Due Date.
</br><img width="250" alt="Edit-Image_Delete_Button" src="https://user-images.githubusercontent.com/67039993/112070945-92688c80-8b4d-11eb-94c2-8c0fa045fe0f.png"></br>

The application only displays list of ToDo for a logged in user. Authentication is implemented and does not allow unauthenticated access.
</br><img width="250" alt="Screen Shot 2021-03-22 at 7 00 35 PM" src="https://user-images.githubusercontent.com/67039993/112071854-6b12bf00-8b4f-11eb-92f6-86fe6c7490dc.png"></br>


## Screenshots show the successful build and deploy steps
<img width="400" alt="Screen Shot 2021-03-22 at 6 57 11 PM" src="https://user-images.githubusercontent.com/67039993/112072251-32271a00-8b50-11eb-9ae2-fac727d27668.png">
<img width="800" alt="Screen Shot 2021-03-22 at 7 07 10 PM" src="https://user-images.githubusercontent.com/67039993/112072293-4539ea00-8b50-11eb-9e34-b56e2b8e2760.png">



## Codebase
The code is split into multiple layers separating business logic from code for DynamoDB access, file storage, and other code. Code is implemented using async/await and Promises without using callbacks.

## Best practices
All resources needed by an application are defined in the "serverless.yml" without using AWS console. 

Each function has its own set of permissions using different IAM roles per function.

App have logging statements in code with informative log parameters, which is helpful for debugging in serverless environment.

Distributed tracing is enabled for Lambda and API Gateway in serverless.yml file. App have implemented X-Ray for logging application level metrics.

## Architecture
Data is stored in a table with a composite key. Scan operation is not used to read data from a database.
<img width="400" alt="Screen Shot 2021-03-22 at 8 54 50 PM" src="https://user-images.githubusercontent.com/67039993/112072591-ef197680-8b50-11eb-9ef3-696ce4c90ae3.png">

## Testing 
Link to Postman collection of tests:
https://github.com/olenairy/olenairy-sls-todo-courses/blob/master/Pretty_ToDo.postman_collection.json
Result of tests from the collection:


<img width="900" alt="Postman" src="https://user-images.githubusercontent.com/67039993/112073246-73202e00-8b52-11eb-84b4-c31e5dac1cef.png">


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
