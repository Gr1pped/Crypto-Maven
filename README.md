# Crypto Maven

A web-based tool for cryptocurrency price predictions and stock picks based on news analysis.

## Features

- **Bitcoin Price Prediction**: Analyzes recent crypto news to predict Bitcoin price movement for the next 24 hours
- **Stock Picks**: Recommends 5 stocks based on recent financial news and market sentiment
- **News Integration**: Uses the Brave search API to gather recent news data
- **Sentiment Analysis**: Simulates sentiment analysis on news content to generate predictions

## How It Works

### Crypto Predictions
1. Click the "Crypto Prediction" button
2. The app fetches recent Bitcoin and cryptocurrency news
3. News sentiment is analyzed to determine market direction
4. A 24-hour price prediction is displayed along with key news items

### Stock Picks
1. Click the "Stock Picks" button
2. The app searches for recent stock market news
3. Stocks are ranked based on news mentions and sentiment
4. Top 5 stock recommendations are displayed with buy/sell signals

## Technical Implementation

- **Frontend**: HTML, CSS, JavaScript
- **API Integration**: Uses Netlify serverless functions to proxy API calls
- **News Data**: Integrates with Brave search API for recent news
- **Sentiment Analysis**: Simple keyword-based sentiment scoring (simulated)

## Deployment

This application is designed to be deployed on Netlify or similar serverless platforms:

1. Clone this repository
2. Set up a Netlify account
3. Connect your GitHub repository to Netlify
4. Deploy the application

## Important Notes

- **Educational Purpose**: This tool is for educational purposes only and should not be used for financial decisions
- **Simulated Analysis**: The current implementation uses simulated data and basic sentiment analysis
- **API Integration**: In a production environment, you would need to set up proper API keys for the Brave search API

## Future Improvements

- Implement more sophisticated NLP for better sentiment analysis
- Add more detailed technical analysis indicators
- Integrate real-time price data
- Expand to cover more cryptocurrencies
- Add user accounts to track prediction history
