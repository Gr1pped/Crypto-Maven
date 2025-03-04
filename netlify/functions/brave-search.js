// Netlify serverless function to proxy Brave search API calls
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    // Get request parameters
    const { query, count = 10, offset = 0 } = JSON.parse(event.body);

    // Make actual API call to simulate Brave search API integration
    // In a real scenario, we'd use a proper API key and the actual Brave API
    // For now, we'll simulate the API response
    
    // Simulate the Bitcoin/Crypto API response
    if (query.includes('bitcoin') || query.includes('crypto')) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          web: {
            results: [
              {
                title: "Bitcoin Surges 3% in Last 24 Hours, Approaching New Resistance",
                description: "Bitcoin gained significant momentum in the last 24 hours, rising over 3% to approach a key resistance level at $65,000.",
                url: "https://example.com/bitcoin-surge",
                source: "CryptoNews"
              },
              {
                title: "Analyst Predicts Bitcoin Rally Based on On-Chain Metrics",
                description: "Technical indicators and on-chain data suggest Bitcoin may be preparing for another leg up in the next 24-48 hours.",
                url: "https://example.com/bitcoin-rally",
                source: "CoinAnalyst"
              },
              {
                title: "Bitcoin Market Sentiment Improves Following Positive Economic Data",
                description: "Crypto market sentiment has shifted more bullish as economic data points to lower inflation, potentially reducing pressure on digital assets.",
                url: "https://example.com/market-sentiment",
                source: "CryptoMarkets"
              },
              {
                title: "Bitcoin Whales Accumulating, On-Chain Data Shows",
                description: "Large Bitcoin holders have been accumulating during recent price dips, suggesting confidence in the asset's short-term prospects.",
                url: "https://example.com/bitcoin-whales",
                source: "WhaleAlert"
              },
              {
                title: "Bitcoin Trading Volume Rises 12% in 24 Hours",
                description: "Trading volume across major exchanges indicates renewed interest in Bitcoin, with a 12% increase in the last day.",
                url: "https://example.com/trading-volume",
                source: "ExchangeMonitor"
              }
            ]
          }
        })
      };
    }
    // Simulate the stocks API response
    else if (query.includes('stock') || query.includes('market')) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          web: {
            results: [
              {
                title: "Tech Stocks Rally on Positive Earnings Reports",
                description: "Major technology companies are seeing significant gains following better-than-expected quarterly results.",
                url: "https://example.com/tech-stocks",
                source: "MarketWatch"
              },
              {
                title: "NVDA Surges 5% After AI Partnership Announcement",
                description: "NVIDIA shares jumped after the company announced a new artificial intelligence partnership with a major cloud provider.",
                url: "https://example.com/nvda-surge",
                source: "StockNews"
              },
              {
                title: "Analysts Recommend AAPL as iPhone Sales Exceed Expectations",
                description: "Apple continues to show strength as recent sales data indicates iPhone shipments have exceeded analyst expectations.",
                url: "https://example.com/aapl-iphone",
                source: "TechInvest"
              },
              {
                title: "TSLA Facing Resistance After Recent Rally",
                description: "Tesla shares are encountering technical resistance following the recent uptrend, analysts suggest possible consolidation.",
                url: "https://example.com/tsla-resistance",
                source: "AutoTrader"
              },
              {
                title: "META Growth Outlook Improves on Ad Revenue Surge",
                description: "Meta Platforms showing strong fundamentals as advertising revenue continues to grow, exceeding market expectations.",
                url: "https://example.com/meta-growth",
                source: "SocialStocks"
              },
              {
                title: "MSFT Cloud Business Continues to Dominate Market Share",
                description: "Microsoft's Azure platform continues to gain market share in the cloud computing sector, driving positive outlook.",
                url: "https://example.com/msft-cloud",
                source: "TechReport"
              },
              {
                title: "AMZN E-commerce Growth Accelerates, Analysts Upgrade",
                description: "Amazon receives analyst upgrades after reporting accelerated e-commerce growth and improved profit margins.",
                url: "https://example.com/amzn-upgrade",
                source: "RetailInvest"
              }
            ]
          }
        })
      };
    }
    // Default empty response
    else {
      return {
        statusCode: 200,
        body: JSON.stringify({
          web: {
            results: []
          }
        })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to execute search", details: error.message })
    };
  }
};
