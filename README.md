# Website example of Authentication and Registration API using JSON Web Tokens, nodemailer, Express.js and MongoDB

This README provides a comprehensive guide on how to set up and use the Authentication and Registration API using Express.js and MongoDB. This API allows you to handle user registration, activation, authentication, token refresh, retrieve users' information from the database, and manage email-based activation, as well as handle user logout.

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- Node.js and npm installed
- Basic understanding of Express.js and MongoDB

## Getting Started

1. Install dependencies:

```bash
npm i
```

2. Create a `.env` file in the root directory. Look inside the file .env.example for details.

3. Check how to use google smtp server for sending email. Otherwise you will get an error.

[https://support.google.com/a/answer/176600?hl=en](https://support.google.com/a/answer/176600?hl=en)
[https://support.google.com/a/answer/2956491?sjid=4893799287504753245-EU#sendinglimitsforrelay](https://support.google.com/a/answer/2956491?sjid=4893799287504753245-EU#sendinglimitsforrelay)

## Usage

### User Registration

Endpoint: `POST /api/register`

To register a new user, send a POST request to the `/api/register` endpoint with the following JSON payload:

```json
{
  "userName": "semklim",
  "password": "12312",
  "email": "semklim@gmail.com"
}
```

### User Activation

Endpoint: `GET /api/activate/:link`

When a user clicks the activation link received via email, they will be activate and redirected to the main page of your app.

### User Authentication

Endpoint: `POST /api/login`

To authenticate a user, send a POST request to the `/api/login` endpoint with the following JSON payload:

```json
{
  "userEmail": "semklim@gmail.com",
  "password": "200996Ro"
}
```

### Token Refresh

Endpoint: `POST /api/refresh`

To refresh the access token, send a POST request to the `/api/refresh` endpoint. Make sure to include the `refreshToken` in the cookies of the request.

### User Logout

Endpoint: `POST /api/logout`

To log out a user, send a POST request to the `/api/logout` endpoint. This should delete the `refreshToken` cookie on the client side.

### Protected Route - Retrieve Users

Endpoint: `GET /api/users`

To retrieve a list of all users from the database, send a GET request to the `/api/users` endpoint. Ensure that you include the `Authorization` header in your request with the format: `Bearer <token>`, where `<token>` is the valid access token obtained upon successful login.

### Error Handling

- If registration, activation, authentication, token refresh, or logout fails due to invalid input or other reasons, you will receive an appropriate error response.
- Ensure to handle errors gracefully on the client-side by checking the response status and the content of the response body.

## Running the Server

Start the Express server by running:

```bash
npm start
```

The server will run on the port 5000.

## Conclusion

This API provides a secure and feature-rich way to handle user registration, activation, authentication, token refresh, user information retrieval, email-based activation, and user logout using Express.js and MongoDB. Feel free to extend and customize the API to suit your application's specific requirements.

If you have any questions or need further assistance, please don't hesitate to reach out.

Happy coding!
