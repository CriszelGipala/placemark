# Placemark

A Point of Interest (POI) management application for discovering and managing whale shark spots in Oslob, Cebu, Philippines.

## Features

- **User Management**: Sign up, log in, log out with cookie-based authentication
- **Categories**: Organise placemarks into categories (e.g. Diving Spots, Beaches, Wildlife Encounters)
- **Placemarks (POI)**: Create, read, update and delete points of interest with name, description, latitude and longitude
- **Admin Dashboard**: View and manage all registered users
- **Multiple Data Stores**: Support for in-memory, JSON file, and MongoDB storage
- **Unit Tests**: Comprehensive Mocha/Chai test suite for all models

## Tech Stack

- **Backend**: Node.js, Hapi.js
- **Templating**: Handlebars
- **Database**: MongoDB with Mongoose
- **Validation**: Joi
- **Testing**: Mocha, Chai
- **Styling**: Bulma CSS

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB running on localhost:27017

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the root directory:

```
cookie_name=placemark
cookie_password=secretpasswordnotrevealedtoanyone
db=mongodb://127.0.0.1:27017/placemark
```

### Running the App

```bash
npm start
```

Visit `http://localhost:3000`

### Running Tests

```bash
npm test
```

## Data Model

### User
- firstName, lastName, email, password

### Category
- title, userid (references User)

### Placemark (POI)
- name, description, latitude, longitude, categoryid (references Category)
