# chatMe - React project defense

-   This is a small scale texting app, which implements user accounts
-   Chooose your best friends and add them to your following list
-   Easy access to private chatroom with any user on the platform

# Public link to app:

-   https://reactjs-c8cf4.web.app/

# How to run on a local computer

-   Download the full repository

## type the following commands in the order listed below

-   npm install
-   npm install react-router-dom
-   npm run dev

Application should now be running at http://localhost:5173/

# Core functionalities

## Implementation and deployment

-   This app makes use of firebase as a cloud service in combination with firestore as a database
-   User authentication is provided by the firebase API

## User/auth

-   Create an account with email and password
-   Make use of persistant user authentication for your personal account
-   Auth guard and user guard are active to help prevent unauthorized access

## Public part

-   Guest users can access the Homepage, Login and Register
-   Guest are not able to send messages without having a personal account

## Private part (logged-in users only)

-   Users can browse the list of available accounts on the platform
-   Users can click on a person they wish to connect with and start a private chat room
-   All messages are time stamped, so you always have a reference
-   Chat is color coded for easy readability
-   You can choose to follow or unfollow each individual user on the platform. This way you can make a selection of your most used contacts
-   Users can delete their own messages

## My Page (logged-in users only)

-   Access to your personal page, where a new account password can be chosen
-   Get account information about your last login and when your account was initially created
-   You have a combined button/counter for both followers and following. With just a click you can access your personal selection of users
-   Delete button if you choose to leave the platform and would like to remove your account permanently
