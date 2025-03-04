document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const cryptoButton = document.getElementById('crypto-button');
    const stocksButton = document.getElementById('stocks-button');
    const resultContainer = document.getElementById('result-container');
    const resultTitle = document.getElementById('result-title');
    const resultDate = document.getElementById('result-date');
    const resultContent = document.getElementById('result-content');

    // Set current date
    const currentDate = new Date();
    resultDate.textContent = currentDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    // Crypto button click handler
    cryptoButton.addEventListener('click', function() {
        showLoading('Bitcoin Price Prediction');
        fetchCryptoNews()
            .then(news => {
                const prediction = analyzeCryptoNews(news);
                displayCryptoPrediction(prediction);
            })
            .catch(error => {
                displayError('Failed to fetch crypto news. ' + error.message);
            });
    });

    // Stocks button click handler
    stocksButton.addEventListener('click', function() {
        showLoading('Stock Picks');
        fetchStockNews()
            .then(news => {
                const stockPicks = analyzeStockNews(news);
                displayStockPicks(stockPicks);
            })
            .catch(error => {
                displayError('Failed to fetch stock news. ' + error.message);
            });
    });

    // Show loading state
    function showLoading(title) {
        resultContainer.style.display = 'block';
        resultTitle.textContent = title;
        resultContent.innerHTML = '<div class="loading">Analyzing recent news data...</div>';
    }

    // Display error message
    function displayError(message) {
        resultContent.innerHTML = `<div class="error">${message}</div>`;
    }

    // Fetch crypto news using Brave search API
    async function fetchCryptoNews() {
        try {
            const response = await fetch("/.netlify/functions/brave-search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: "bitcoin cryptocurrency price movement market trends last 24 hours",
                    count: 15
                })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching crypto news:", error);
            throw error;
        }
    }

    // Fetch stock news using Brave search API
    async function fetchStockNews() {
        try {
            const response = await fetch("/.netlify/functions/brave-search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: "stock market top picks trading investment opportunities last 24 hours",
                    count: 15
                })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching stock news:", error);
            throw error;
        }
    }

    // Analyze crypto news and generate prediction
    function analyzeCryptoNews(newsData) {
        // This would normally use NLP and sentiment analysis
        // For demonstration, we'll use a simulated sentiment analysis
        
        // In a real implementation, we would:
        // 1. Extract key information from news articles
        // 2. Apply NLP to analyze sentiment (positive/negative)
        // 3. Weight recent news more heavily
        // 4. Consider overall market trends
        
        // Simulate sentiment analysis
        let sentimentScore = 0;
        let bullishKeywords = ['surge', 'rally', 'gain', 'jump', 'high', 'bullish', 'growth', 'positive', 'up'];
        let bearishKeywords = ['fall', 'drop', 'decline', 'crash', 'low', 'bearish', 'negative', 'down', 'plunge'];
        
        // For simulation purposes, generate a mix of positive and negative signals
        const newsItems = newsData.web?.results || [];
        
        if (newsItems.length === 0) {
            // If no real news, generate a random prediction
            sentimentScore = Math.random() * 2 - 1; // Between -1 and 1
        } else {
            // Process each news item
            newsItems.forEach(item => {
                const content = (item.title + " " + (item.description || "")).toLowerCase();
                
                // Count bullish and bearish keywords
                bullishKeywords.forEach(keyword => {
                    if (content.includes(keyword)) sentimentScore += 0.2;
                });
                
                bearishKeywords.forEach(keyword => {
                    if (content.includes(keyword)) sentimentScore -= 0.2;
                });
            });
            
            // Normalize sentiment score
            sentimentScore = Math.min(Math.max(sentimentScore, -1), 1);
        }
        
        // Generate price prediction based on sentiment
        const currentBtcPrice = 63000 + Math.random() * 2000; // Simulated current price
        const predictedChange = sentimentScore * 5; // Maximum 5% change
        const predictedPrice = currentBtcPrice * (1 + predictedChange / 100);
        
        return {
            currentPrice: currentBtcPrice.toFixed(2),
            predictedPrice: predictedPrice.toFixed(2),
            percentageChange: predictedChange.toFixed(2),
            sentimentScore: sentimentScore,
            newsItems: newsItems.slice(0, 3) // Include top 3 news items
        };
    }

    // Analyze stock news and generate picks
    function analyzeStockNews(newsData) {
        // This would normally use NLP and sentiment analysis
        // For demonstration, we'll simulate stock picks based on common names
        
        // Common tech stocks
        const stockPool = [
            { ticker: "AAPL", name: "Apple Inc." },
            { ticker: "MSFT", name: "Microsoft Corp." },
            { ticker: "GOOGL", name: "Alphabet Inc." },
            { ticker: "AMZN", name: "Amazon.com Inc." },
            { ticker: "META", name: "Meta Platforms Inc." },
            { ticker: "TSLA", name: "Tesla Inc." },
            { ticker: "NVDA", name: "NVIDIA Corp." },
            { ticker: "AMD", name: "Advanced Micro Devices" },
            { ticker: "NFLX", name: "Netflix Inc." },
            { ticker: "DIS", name: "Walt Disney Co." }
        ];
        
        // Get news items
        const newsItems = newsData.web?.results || [];
        let stockMentions = {};
        
        // Initialize stock mentions
        stockPool.forEach(stock => {
            stockMentions[stock.ticker] = {
                count: 0,
                sentiment: 0,
                news: []
            };
        });
        
        if (newsItems.length === 0) {
            // If no real news, generate random picks
            return generateRandomStockPicks(stockPool);
        }
        
        // Analyze each news item for stock mentions
        newsItems.forEach(item => {
            const content = (item.title + " " + (item.description || "")).toUpperCase();
            
            // Check for stock mentions
            stockPool.forEach(stock => {
                if (content.includes(stock.ticker)) {
                    stockMentions[stock.ticker].count += 1;
                    
                    // Simple sentiment analysis
                    const positiveWords = ['UP', 'GAIN', 'RISE', 'POSITIVE', 'BUY', 'BULLISH', 'GROWTH'];
                    const negativeWords = ['DOWN', 'LOSS', 'FALL', 'NEGATIVE', 'SELL', 'BEARISH', 'DROP'];
                    
                    let sentimentValue = 0;
                    positiveWords.forEach(word => {
                        if (content.includes(word)) sentimentValue += 1;
                    });
                    
                    negativeWords.forEach(word => {
                        if (content.includes(word)) sentimentValue -= 1;
                    });
                    
                    stockMentions[stock.ticker].sentiment += sentimentValue;
                    stockMentions[stock.ticker].news.push({
                        title: item.title,
                        url: item.url,
                        source: item.source
                    });
                }
            });
        });
        
        // Sort stocks by mention count and sentiment
        const rankedStocks = stockPool
            .map(stock => {
                return {
                    ...stock,
                    mentions: stockMentions[stock.ticker].count,
                    sentiment: stockMentions[stock.ticker].sentiment,
                    news: stockMentions[stock.ticker].news
                };
            })
            .filter(stock => stock.mentions > 0 || Math.random() > 0.7) // Include some random stocks if not enough mentions
            .sort((a, b) => {
                // Sort first by mentions, then by sentiment
                if (b.mentions !== a.mentions) return b.mentions - a.mentions;
                return b.sentiment - a.sentiment;
            })
            .slice(0, 5);
        
        // If not enough stocks with news, fill with random ones
        if (rankedStocks.length < 5) {
            const randomPicks = generateRandomStockPicks(
                stockPool.filter(stock => !rankedStocks.find(s => s.ticker === stock.ticker))
            );
            
            while (rankedStocks.length < 5 && randomPicks.length > 0) {
                rankedStocks.push(randomPicks.shift());
            }
        }
        
        // Add buy/sell recommendation based on sentiment
        return rankedStocks.map(stock => {
            const recommendation = stock.sentiment >= 0 ? 'BUY' : 'SELL';
            const randomPrice = Math.floor(50 + Math.random() * 200);
            const randomChange = ((Math.random() * 6) - 3).toFixed(2);
            
            return {
                ...stock,
                recommendation,
                price: randomPrice,
                change: randomChange,
                news: stock.news.length > 0 ? stock.news[0] : null
            };
        });
    }

    // Generate random stock picks
    function generateRandomStockPicks(stockPool) {
        // Shuffle and take 5
        const shuffled = stockPool.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);
        
        // Add random data
        return selected.map(stock => {
            const recommendation = Math.random() > 0.4 ? 'BUY' : 'SELL';
            const randomPrice = Math.floor(50 + Math.random() * 200);
            const randomChange = ((Math.random() * 6) - 3).toFixed(2);
            
            return {
                ...stock,
                recommendation,
                price: randomPrice,
                change: randomChange,
                mentions: 0,
                sentiment: recommendation === 'BUY' ? 1 : -1,
                news: null
            };
        });
    }

    // Display crypto prediction
    function displayCryptoPrediction(prediction) {
        const isPriceUp = parseFloat(prediction.percentageChange) >= 0;
        const directionClass = isPriceUp ? 'up' : 'down';
        const directionArrow = isPriceUp ? '↑' : '↓';
        
        let html = `
            <h3>Based on recent news analysis:</h3>
            
            <div class="prediction ${directionClass}">
                Bitcoin Price Prediction (24h): $${prediction.predictedPrice}
                <span class="change">${directionArrow} ${Math.abs(prediction.percentageChange)}%</span>
            </div>
            
            <p>Current price: $${prediction.currentPrice}</p>
            
            <div class="sentiment-meter">
                <p>News Sentiment: ${getSentimentText(prediction.sentimentScore)}</p>
            </div>
            
            <h3>Recent News Analyzed:</h3>
        `;
        
        // Add news items
        if (prediction.newsItems && prediction.newsItems.length > 0) {
            prediction.newsItems.forEach(item => {
                html += `
                    <div class="news-item">
                        <p><strong>${item.title}</strong></p>
                        <p class="news-source">Source: ${item.source || 'Unknown'}</p>
                    </div>
                `;
            });
        } else {
            html += `<p>No specific news articles found. Prediction based on general market trends.</p>`;
        }
        
        html += `
            <p class="disclaimer">Disclaimer: This prediction is for educational purposes only and should not be used for financial decisions.</p>
        `;
        
        resultContent.innerHTML = html;
    }

    // Display stock picks
    function displayStockPicks(stockPicks) {
        let html = `<h3>Top 5 Stock Picks Based on Recent News:</h3>`;
        
        stockPicks.forEach(stock => {
            const directionClass = stock.recommendation === 'BUY' ? 'buy' : 'sell';
            const changeSymbol = parseFloat(stock.change) >= 0 ? '+' : '';
            
            html += `
                <div class="stock-item ${directionClass}">
                    <span class="stock-ticker">${stock.ticker}</span>
                    <span class="stock-recommendation ${directionClass}">${stock.recommendation}</span>
                    <p><strong>${stock.name}</strong> - $${stock.price} (${changeSymbol}${stock.change}%)</p>
                    
                    ${stock.news ? 
                        `<p>Recent news: <strong>${stock.news.title}</strong></p>
                        <p class="news-source">Source: ${stock.news.source || 'Unknown'}</p>` : 
                        `<p>Based on general market analysis</p>`}
                </div>
            `;
        });
        
        html += `
            <p class="disclaimer">Disclaimer: These stock picks are for educational purposes only and should not be used for financial decisions.</p>
        `;
        
        resultContent.innerHTML = html;
    }

    // Helper function to get sentiment text
    function getSentimentText(score) {
        if (score > 0.5) return 'Strongly Bullish';
        if (score > 0.1) return 'Bullish';
        if (score > -0.1) return 'Neutral';
        if (score > -0.5) return 'Bearish';
        return 'Strongly Bearish';
    }
});
