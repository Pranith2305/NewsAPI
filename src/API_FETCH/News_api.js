import React, { useState, useEffect } from 'react';

function NewsApp() {
  const apiKey = '56b0af817b57480d8543eccae148c0bb'; // Replace with your actual API key
  const url = `https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=${apiKey}`;
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'ok') {
          setArticles(data.articles);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div className="App flex flex-col items-center min-h-screen bg-#F0F0F0"> 
      <h1 className='font-bold text-3xl text-center my-3'>Top News Articles (India)</h1>
      {isLoading && <p>Loading news articles...</p>}
      {error && <p>Error: {error}</p>}
      {articles.length > 0 && (
        <div className="news-container">
          <ul className="news-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map(article => (
              <li key={article.url} className="news-item bg-white rounded-lg shadow-md p-4 flex flex-col">
                {article.title && (
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                  </a>
                )}
                {/* Optionally display author information */}
                {article.author && (
                  <p class="author-info text-sm text-right rounded-full px-3 py-1 font-semibold text-gray-700">
                  {article.author}
                </p>
                
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NewsApp;
