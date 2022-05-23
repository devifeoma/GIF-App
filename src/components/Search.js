import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Search() {
  const [gifs, setGifs] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL =
    'https://api.giphy.com/v1/gifs/search?api_key=deokzgUjxm6QHQdp3H3aca1LSZcCpucc&q=sphinx&limit=25&offset=0&rating=Y&lang=en';

    useEffect(() => {
      const getGifs = async () => {
        setLoading(true);
        try {
          const response = await axios.get(API_URL);
          setLoading(false);
          setGifs(response.data.data);
        } catch (error) {
          setLoading(false);
        }
      };

    getGifs();
  }, []);

  const handleSearchInput = async (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <div className="search">
        <input
          value={search}
          onChange={handleSearchInput}
          placeholder="Search for a gif"
        />
        <button onClick={handleSubmit} type="submit">
          Search
        </button>
      </div>

      <ul>
        {gifs
        .filter((gif) => {
          if (query === '') {
            return gif;
          } else if (
            gif.title.toLowerCase().includes(query.toLowerCase())
          ) {
            return gif;
          }
        })
        .map((gif) => {
          const { downsized } = gif.images;
          return (
            <li>
              <p>
                {gif.title}
                <img
                  src={downsized.url}
                  width={downsized.width}
                  height={downsized.height}
                />
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Search;
