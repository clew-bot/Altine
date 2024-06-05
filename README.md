# ASM: Another Social Media

ASM is a social media platform built using Nuxt 3, MongoDB, Typescript, Nitro, Tailwind, and Pinia. It allows users to create profiles, post text, polls, images, and videos, as well as private message and friend other users.


## Features

- User authentication and profile creation
- Posting of text, polls, images, and videos
- Private messaging and friending other users
- Bookmarking of favorite posts
- Interacting with posts through comments, likes and reactions

## Installation

To start up the app locally, follow these steps:

1. Clone the repository.
2. Install dependencies using ```npm install```.
3. Start the app using ```npm run dev```.

Alternatively, you can start up the application with Docker by using ```docker compose up```.

## ENV Variables
```MONGO_URI``` : MongoDB connection string to access DB
```JWT_SECRET``` : Jsonwebtoken secret 
```VUE_APP_IMAGE_TOKEN``` : Image API key 
```PORT``` : Port number to connect

## Technologies Used
- Nuxt 3
- MongoDB
- Typescript
- Nitro
- Tailwind
- Pinia

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

### Live

https://asm-theta.vercel.app/
