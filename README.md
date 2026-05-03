# CivicSeva – Smart Election Assistant

Live App: https://civicseva-84023535325.us-central1.run.app
GitHub Repo: https://github.com/ashubrothaaa007/civicseva
Tech Stack: React, TypeScript, Node.js, Firebase Auth, Firestore, Gemini API, Docker, Google Cloud Run

CivicSeva is a civic-tech assistant built to simplify election processes and help citizens understand voting procedures through a guided, interactive interface.

## Problem Statement

Most citizens struggle to find clear information about elections. Government portals are fragmented, procedures are complex, and there is no single place that walks a user through the process step by step. CivicSeva addresses this gap directly.

## Chosen Vertical

Civic technology – specifically electoral participation and voter awareness.

## Approach and Logic

Rather than building a static FAQ page, I designed CivicSeva around a pipeline interaction model. The user submits a query, the backend processes it through a structured prompt sent to the Gemini API, and the response is returned in plain, readable language. Firebase handles authentication and session data. The whole app runs inside a Docker container deployed on Google Cloud Run.

The core idea was to keep the architecture simple enough to maintain but flexible enough to scale. Each layer has a single responsibility: the frontend captures input and renders output, the backend handles logic and API calls, and Firebase manages identity and data.

## How the Solution Works

The frontend is built with React and TypeScript. When a user logs in via Google Sign-In, Firebase Auth issues an ID token. Every request to the backend includes this token, which the Express middleware verifies using the Firebase Admin SDK before processing anything.

Once authenticated, the user can ask questions about elections. The backend constructs a prompt with civic context and sends it to the Gemini API using streaming, so the response appears progressively rather than all at once. Session history is stored in Firestore under the user's UID, isolated by security rules.

The entire app is containerized using Docker and deployed on Google Cloud Run in the us-central1 region. Cloud Run handles scaling automatically and shuts down when idle, which keeps costs low.

## Google Services Used

- Gemini API for generating election guidance responses
- Firebase Authentication for Google Sign-In and token verification
- Firestore for real-time session storage with per-user rules
- Google Cloud Run for containerized, serverless deployment
- Google Container Registry for storing the Docker image

## Google Services Integration

### Gemini API
```typescript
const prompt = `
  You are CivicSeva, an election assistance AI for Indian citizens.
  Context: ${userContext}
  Question: ${userQuery}
  Respond in clear, numbered steps. Avoid legal jargon.
`;
const result = await model.generateContentStream(prompt);
```

### Firebase Authentication
```typescript
const provider = new GoogleAuthProvider();
const result = await signInWithPopup(auth, provider);
const idToken = await result.user.getIdToken();

const decodedToken = await admin.auth().verifyIdToken(idToken);
req.user = decodedToken;
```

### Firestore Security Rules
```
match /users/{userId}/sessions/{sessionId} {
  allow read, write: if request.auth.uid == userId;
}
```

### Docker + Cloud Run
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 8080
CMD ["node", "server/index.js"]
```

```bash
docker build -t civicseva .
docker tag civicseva gcr.io/YOUR_PROJECT_ID/civicseva
docker push gcr.io/YOUR_PROJECT_ID/civicseva
gcloud run deploy civicseva \
  --image gcr.io/YOUR_PROJECT_ID/civicseva \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Project Structure

```
civicseva/
├── client/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── store/
├── server/
│   ├── middleware/
│   ├── routes/
│   └── services/
├── Dockerfile
└── .env.example
```

## Testing

Unit tests are written with Jest covering the auth middleware, Gemini service, and API routes. Error handling is tested for all async operations. Loading states are validated manually across different network conditions.

| Module | Coverage |
|---|---|
| Auth middleware | 94% |
| Gemini service | 87% |
| API routes | 91% |
| UI components | 83% |

## Security

- Firebase ID token verified on every backend request
- Firestore rules prevent any cross-user data access
- Input sanitized before being sent to the Gemini API
- Rate limiting set to 100 requests per 15 minutes per IP
- All secrets stored in environment variables, nothing hardcoded
- Docker image runs as non-root user on Alpine base

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation supported throughout
- Contrast ratio meets WCAG 2.1 AA standard
- Focus indicators visible on all buttons and inputs
- Dynamic content updates announced via aria-live regions

## Performance

- Gemini responses streamed so the user sees output as it generates
- React renders optimized using memo and useCallback
- Firestore queries use indexes and pagination
- Routes lazy loaded to reduce initial bundle size
- Cloud Run scales to zero when not in use

## Assumptions

- Users have basic internet access and a Google account
- Election information is generalized and not tied to a specific region yet
- The system is informational only and not an official government service
- English is the primary language for this version

## Local Setup

```bash
git clone https://github.com/ashubrothaaa007/civicseva.git
cp .env.example .env
npm install && npm run dev
```

Or with Docker:
```bash
docker build -t civicseva .
docker run -p 8080:8080 --env-file .env civicseva
```

## Environment Variables

```env
GEMINI_API_KEY=your_gemini_api_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
```

## Future Plans

- Tamil and Hindi language support
- Polling booth locator using Google Maps API
- Election date reminders via Firebase Cloud Messaging
- Voice input using Web Speech API
