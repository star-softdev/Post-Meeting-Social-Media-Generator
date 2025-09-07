# Deployment Guide for Render

## Quick Deploy to Render

1. **Fork this repository** to your GitHub account

2. **Connect to Render**:
   - Go to [render.com](https://render.com)
   - Sign up/Login with your GitHub account
   - Click "New +" → "Web Service"
   - Connect your forked repository

3. **Configure the service**:
   - **Name**: `post-meeting-social-generator` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (for demo purposes)

4. **Set Environment Variables**:
   ```
   NODE_ENV=production
   NEXTAUTH_URL=https://your-app-name.onrender.com
   NEXTAUTH_SECRET=your-secret-key-at-least-32-characters-long
   OPENAI_API_KEY=your-openai-api-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   RECALL_API_KEY=your-recall-api-key
   ```

5. **Database Setup**:
   - In Render dashboard, go to "New +" → "PostgreSQL"
   - Create a new database
   - Copy the connection string to `DATABASE_URL` environment variable
   - The app will automatically run migrations on first deploy

6. **Deploy**:
   - Click "Create Web Service"
   - Wait for the build to complete
   - Your app will be available at `https://your-app-name.onrender.com`

## Required API Keys

- **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com)
- **Google OAuth**: Set up in [Google Cloud Console](https://console.cloud.google.com)
- **Recall.ai API Key**: Get from [Recall.ai](https://recall.ai) (for meeting transcription)

## Demo Features

This app demonstrates:
- Meeting integration with Google Calendar
- AI-powered social media post generation
- Automated follow-up email generation
- User authentication with NextAuth
- Database integration with Prisma

## Notes

- The free tier has limitations (sleeps after 15 minutes of inactivity)
- For production use, consider upgrading to a paid plan
- All sensitive data should be stored in environment variables
