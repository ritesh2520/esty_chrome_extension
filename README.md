# 🧠 Conversation Analysis Platform
The platform is built using a microservices architecture, with each service responsible for a specific task, such as conversation analysis, email sending, and database interactions. The platform is designed to be scalable, secure, and easy to maintain.

## 🚀 Features
* **Conversation Analysis**: The platform uses AI-powered models to analyze conversations and provide insights into sentiment, intent, and priority levels.
* **Email Notifications**: The platform sends email notifications to users based on conversation analysis results.
* **Database Integration**: The platform interacts with a database to store and retrieve conversation data.
* **API Endpoints**: The platform provides API endpoints for conversation updates and health checks.
* **CORS Support**: The platform supports CORS, allowing for cross-origin requests.
* **Environment Variable Management**: The platform uses environment variables to manage configuration settings.

## 🛠️ Tech Stack
* **Frontend**: None
* **Backend**: Node.js, Express.js
* **Database**: MySQL
* **AI Models**: Google Generative AI (Gemini)
* **Email Service**: Google Gmail API
* **Dependencies**:
	+ `@google/generative-ai`
	+ `express`
	+ `mysql2`
	+ `openai`
	+ `nodemon`
	+ `cors`
	+ `dotenv`
	+ `googleapis`
	+ `node-cron`
	+ `nodemailer`

## 📦 Installation
To install the platform, follow these steps:
1. Clone the repository using `git clone`.
2. Install dependencies using `npm install`.
3. Create a `.env` file and add environment variables for database credentials, Google OAuth credentials, and other configuration settings.
4. Start the server using `npm start` or `npm run dev`.

## 💻 Usage
To use the platform, follow these steps:
1. Start the server using `npm start` or `npm run dev`.
2. Send a POST request to the `/api/conversations` endpoint with conversation data.
3. The platform will analyze the conversation and send an email notification with the results.

## 📂 Project Structure
```markdown
.
├── server.js
├── src
│   ├── app.js
│   ├── db
│   │   ├── db.js
│   ├── services
│   │   ├── alertEmail.js
│   │   ├── dailySummaryEmail.js
│   │   ├── dailySummary.js
│   │   ├── gemini.js
│   │   ├── gmail.js
│   ├── package.json
├── .env
└── README.md
```


