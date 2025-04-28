# Rewards App

## Backend Setup (Rails API)

## Prerequisites
Ruby 3.4.3

Rails 8.0.2

Node.js (>=14)

SQLite3

## Setup Steps

### Navigate to the backend folder
cd rewards_api

### Install dependencies
bundle install

### Set up database
rails db:create db:migrate db:seed

rails db:setup

### Start the Rails server
rails s

The API should be live at: http://localhost:3000


## Frontend Setup (React App)

## Prerequisites
Node.js (>=14)

npm or yarn

## Setup Steps

### Navigate to the frontend folder
cd ../rewards_frontend

### Install dependencies
npm install

### Start the React dev server
PORT=3001 npm start

The frontend should be live at: http://localhost:3001
