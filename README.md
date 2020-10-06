# Weather App

This application allows a user to display weather information for a specific
location using their browser.

Code is auto deployed to http://amast09-weather-app.s3-website-us-east-1.amazonaws.com
(ideally this is `https` but there is only so much time in the day)

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

## Run the app

```
npm start
```

## Test the App

```
npm test
```
