# My Awesome Electricity Management API
# ePOWER
# Bringing Power to your pockets

This API allows you to manage electricity units, user accounts, and mobile wallets for our ePOWER API

# User Management Endpoints

## Sign Up

- **Method**: POST
- **Path**: `/api/users`
- **Description**: Register a new user.
- **Request Body**:
  - `username` (string, optional): The username of the user.
  - `email` (string, required): The email address of the user.
  - `password` (string, required): The password for the user.
  - `account_number` (string, required): The account number of the user.
  - `mobile_number` (string, required): The mobile number of the user.
- **Response**:
  - Status: 201 Created
  - Body: JSON response with a success message and user details.

## Log In

- **Method**: POST
- **Path**: `/api/users/login`
- **Description**: Log in as a registered user.
- **Request Body**:
  - `email` (string, required): The email address of the user.
  - `password` (string, required): The password for the user.
- **Response**:
  - Status: 200 OK
  - Body: JSON response with a success message and an authentication token.

## Update User

- **Method**: PATCH
- **Path**: `/api/users/:userId`
- **Description**: Update user information.
- **Request Parameters**:
  - `userId` (string, required): The unique identifier of the user to update.
- **Request Body**: JSON object with the fields to update (e.g., `username`, `email`, `password`, `account_number`, `mobile_number`).
- **Response**:
  - Status: 200 OK
  - Body: JSON response with a success message and updated user details.

## Send Reset Password Link

- **Method**: POST
- **Path**: `/api/users/reset-password`
- **Description**: Send a reset password link to the user's email.
- **Request Body**:
  - `userId` (string, required): The unique identifier of the user.
- **Response**:
  - Status: [Specify the expected status]
  - Body: [Specify the expected response body]

## Reset Password

- **Method**: POST
- **Path**: `/api/users/:userId/:token`
- **Description**: Reset the user's password using a token.
- **Request Parameters**:
  - `userId` (string, required): The unique identifier of the user.
  - `token` (string, required): The reset password token.
- **Request Body**:
  - `newPassword` (string, required): The new password for the user.
- **Response**:
  - Status: [Specify the expected status]
  - Body: [Specify the expected response body]

## Delete User

- **Method**: DELETE
- **Path**: `/api/users/:userId`
- **Description**: Delete a user account.
- **Request Parameters**:
  - `userId` (string, required): The unique identifier of the user to delete.
- **Response**:
  - Status: 200 OK
  - Body: JSON response with a success message.

## User Details

- **Method**: GET
- **Path**: `/api/users/data`
- **Description**: Get user details.
- **Response**:
  - Status: 200 OK
  - Body: JSON response with user details.


# Transaction Endpoints

## Buy Electricity Units

- **Method**: POST
- **Path**: `/api/transactions/buy`
- **Description**: Purchase electricity units from your mobile wallet.
- **Request Body**:
  - `userId` (string, required): The unique identifier of the user making the purchase.
  - `unitsToBuy` (number, required): The number of electricity units to purchase.
- **Response**:
  - Status: 200 OK
  - Body: JSON response with a success message and transaction details.

## Get All Transactions (Admin Access)

- **Method**: GET
- **Path**: `/api/transactions/transactions`
- **Description**: Retrieve all transactions (requires admin access).
- **Response**:
  - Status: [Specify the expected status]
  - Body: [Specify the expected response body]

## Get All Transactions for a User

- **Method**: GET
- **Path**: `/api/transactions/transactions/:id`
- **Description**: Retrieve all transactions for a specific user.
- **Request Parameters**:
  - `id` (string, required): The unique identifier of the user.
- **Response**:
  - Status: [Specify the expected status]
  - Body: [Specify the expected response body]


# Mobile Wallet Endpoints

## Create a New Mobile Wallet

- **Method**: POST
- **Path**: `/api/mobile-wallet`
- **Description**: Create a new mobile wallet for a user.
- **Request Body**:
  - `userId` (string, required): The unique identifier of the user for whom the mobile wallet is being created.
- **Response**:
  - Status: [Specify the expected status]
  - Body: [Specify the expected response body]

## Get Mobile Wallet Balance

- **Method**: GET
- **Path**: `/api/mobile-wallet/balance`
- **Description**: Retrieve the current balance of the mobile wallet.
- **Response**:
  - Status: [Specify the expected status]
  - Body: [Specify the expected response body]

## Deposit Funds into Mobile Wallet

- **Method**: POST
- **Path**: `/api/mobile-wallet/deposit`
- **Description**: Deposit funds into the mobile wallet.
- **Request Body**:
  - `userId` (string, required): The unique identifier of the user.
  - `amount` (number, required): The amount to deposit.
- **Response**:
  - Status: [Specify the expected status]
  - Body: [Specify the expected response body]

## Withdraw Funds from Mobile Wallet

- **Method**: POST
- **Path**: `/api/mobile-wallet/withdraw`
- **Description**: Withdraw funds from the mobile wallet.
- **Request Body**:
  - `userId` (string, required): The unique identifier of the user.
  - `amount` (number, required): The amount to withdraw.
- **Response**:
  - Status: [Specify the expected status]
  - Body: [Specify the expected response body]

## Transfer Funds Between Mobile Wallets

- **Method**: POST
- **Path**: `/api/mobile-wallet/transfer`
- **Description**: Transfer funds from one mobile wallet to another.
- **Request Body**:
  - `senderUserId` (string, required): The unique identifier of the sender user.
  - `receiverUserId` (string, required): The unique identifier of the receiver user.
  - `amount` (number, required): The amount to transfer.
- **Response**:
  - Status: [Specify the expected status]
  - Body: [Specify the expected response body]


# Electricity Units Management Endpoints

## Check Available Electricity Units

- **Method**: GET
- **Path**: `/api/electricity-units/check`
- **Description**: Check the available electricity units.
- **Response**:
  - Status: [Specify the expected status]
  - Body: [Specify the expected response body]

## Send Electricity Units

- **Method**: POST
- **Path**: `/api/electricity-units/send`
- **Description**: Send electricity units to another user.
- **Request Body**:
  - `senderUserId` (string, required): The unique identifier of the sender user.
  - `receiverUserId` (string, required): The unique identifier of the receiver user.
  - `unitsToSend` (number, required): The number of electricity units to send.
- **Response**:
  - Status: [Specify the expected status]
  - Body: [Specify the expected response body]


## Third-Party Integrations (Not Documented)

To be added later