# Intercom Messenger Integration

This project demonstrates the integration of Intercom Messenger into a Node.js and Express application. The application allows users to log in and then loads the Intercom Messenger based on the user's session data. The Intercom Messenger is configured with identity verification to ensure that only authenticated users can access the Intercom features.

## Table of Contents

- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Configuration](#configuration)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features

- User authentication via session-based login.
- Intercom Messenger integration with identity verification.
- Custom user identification using email and a secure HMAC hash.
- Responsive and dynamic loading of the Intercom Messenger based on session data.

## Setup and Installation

### Prerequisites

- Node.js and npm installed.
- An Intercom account with access to Messenger features.
- Intercom app ID and secret key for identity verification.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/butlerj14/intercomTestEnv.git
    cd intercomTestEnv
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your Intercom credentials:
    ```plaintext
    INTERCOM_APP_ID=your_intercom_app_id
    INTERCOM_SECRET_KEY=your_secret_key
    SESSION_SECRET=your_session_secret
    ```

4. Create a `users.json` file in the root directory to store sample user credentials:
    ```json
    {
      "user1": {
        "password": "password1",
        "email": "user1@example.com"
      },
      "user2": {
        "password": "password2",
        "email": "user2@example.com"
      }
    }
    ```

5. Ensure that `.env` and `users.json` are listed in your `.gitignore` file to keep them out of your repository:
    ```plaintext
    node_modules/
    .env
    users.json
    ```

## Running the Application

1. Start the server:
    ```bash
    node app.js
    ```

2. Open your web browser and navigate to `http://localhost:3000/login` to access the login page.

3. Use the provided sample credentials (from `users.json`) to log in and see the Intercom Messenger in action.

## Configuration

### Intercom Settings

The Intercom Messenger is configured in the `index.ejs` file:

```html
<script>
    window.intercomSettings = {
        api_base: "https://api-iam.intercom.io",
        app_id: "<%= process.env.INTERCOM_APP_ID %>",
        user_id: "<%= email %>",
        user_hash: "<%= intercomHash %>"
    };
</script>
