import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Search() {
  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)

  // const API_URL =
  //   'https://api.giphy.com/v1/gifs/trending?api_key=deokzgUjxm6QHQdp3H3aca1LSZcCpucc&q=sphinx&limit=25&offset=0&rating=Y&lang=en';

  useEffect(() => {
    const getGifs = async () => {
      setLoading(true);
      setError(false);
      try {
        // const response = await axios.get(API_URL,);
        const response = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "xigl86x2P0M0Qq5I3tzszvCKcvDpM9Yb",
            limit: 20
          }
        });
        setLoading(false);
        setGifs(response.data.data);
      } catch (error) {
        setError(true);
        setTimeout(() => setError(false), 4000);
      }
      setLoading(false);
    }

    getGifs();

  }, []);

  // Function for the search button
  const handleSearch = async (event) => {
    event.preventDefault();
    const searchResult = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios("https://api.giphy.com/v1/gifs/search", {
          params: {
            api_key: "xigl86x2P0M0Qq5I3tzszvCKcvDpM9Yb",
            q: query,
            limit: 20
          }
        });
        setLoading(false);
        setGifs(response.data.data);
      } catch (error) {
        setError(true);
        setTimeout(() => setError(false), 4000);
      }
      setLoading(false);
    }
  };
  
  // Function reponsible for displaying any error 
  const errorAlert = () => {
    {error && <div><p>Hello something went wrong</p></div>}
    // if (error) {
    //   return (
    //     <div><p>Hello something went wrong</p></div>
    //   )
    // }
  }

  // Tells a user that the Gif is loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="search-text">Search GIF App</h1>
      <div className="search" >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for a gif"
        />
        <button type="submit" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Display error message */}
      {errorAlert()}

      {/* Display the Gif after fetching it from the API */}
      <div className="card-div">
        {gifs.map((gif) => {
          const { downsized } = gif.images;
            return (
              <div className="card" key={gif.id}>
                <img src={downsized.url} width={200} height={200} />
                {/* {gif.title} */}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Search;
