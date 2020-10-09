# Weather App

This application allows a user to display weather information for a specific
location using their browser.

Code is auto deployed to TODO

## Getting Started

1 - Install node 14.12.0 (instructions that follow use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
```

```
nvm install
```

```
nvm use
```

2 - Install dependencies

```
npm install
```

3 - Fill in required environment variables

```
cp .env.example .env
```

Replace `replace-me-with-valid-api-key` inside of `.env.local` with a valid
[Open Weather API Key](https://openweathermap.org/appid)

## To develop locally against the app

```
npm run dev
```

## Test the App

```
npm test
```

## Run Production Locally

TODO: fill in Docker commands
