# Twitter-X Frontend Repository

## Description

The following repository contains the code to the frontend of Twitter-X, a twitter clone created by Vikas K.
\
\
The application allows users to 
- Sign up and login (using email authentication)
- Write and publish tweets (Upload images to the tweets as well). You can tag users in another tweets as well, upon writing @ in a tweet, auto complete will help you tag a user.
- View the tweets published by other users on the application, like, retweet and comment on them.
- Search for a particular User
- Go to a spcific user's page and view their activity.
- Follow other users and view all the users followed by a user and all the users who follow a user.
- View all tweets from the users they follow.
- Update their information such as handle, name and bio.
- The application also shows the different hashtags(#) trending in the tweets published by the users on the project (of the last 24 hours).
- Each hastag, hyperlinks to a page that contains all the tweets that contain that trend.

The frontend was written using the react library and communication with the backend was done using the axios library.

## Environment Variables

```
REACT_APP_BASE_URL
REACT_APP_FIREBASE_API_KEY
```
## Instructions to Run

After cloning the repo, run the following commands to run the project locally:

```shell
npm install
npm start
```