import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isRatingDropdownOpen, setRatingDropdownOpen] = useState(false);
  const [isGenreDropdownOpen, setGenreDropdownOpen] = useState(false);

  const movies = [
    { id: 1, name: 'The Matrix', category: 'Action', rating: 7.5 },
    { id: 2, name: 'Focus', category: 'Comedy', rating: 6.9 },
    { id: 3, name: 'The Lazarus Effect', category: 'Thriller', rating: 6.4 },
    { id: 4, name: 'Everly', category: 'Action', rating: 5.0 },
    { id: 5, name: 'Maps to the Stars', category: 'Drama', rating: 7.5 },
  ];

  const categories = ['Action', 'Comedy', 'Thriller', 'Drama'];

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleRatingChange = (event) => {
    const value = event.target.value;
    if (value === 'any') {
      setSelectedRatings([]);
    } else {
      setSelectedRatings(prevRatings =>
        prevRatings.includes(value)
          ? prevRatings.filter(rating => rating !== value)
          : [...prevRatings, value]
      );
    }
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategories(prevCategories =>
      prevCategories.includes(value)
        ? prevCategories.filter(category => category !== value)
        : [...prevCategories, value]
    );
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    const starArray = [];
    for (let i = 0; i < fullStars; i++) {
      starArray.push(<FontAwesomeIcon icon={faStar} key={i} />);
    }
    if (halfStar) {
      starArray.push(<FontAwesomeIcon icon={faStar} key={'half'} />);
    }

    return starArray;
  };

  const filteredMovies = movies.filter(movie =>
    (searchTerm === '' || movie.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedRatings.length === 0 || selectedRatings.includes('any') || selectedRatings.includes(movie.rating.toString())) &&
    (selectedCategories.length === 0 || selectedCategories.includes('any') || selectedCategories.includes(movie.category))
  );

  return (
    <div className="App">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter movie name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="dropdown-container">
          <div className="dropdown">
            <button
              className="dropdown-button"
              onClick={() => setRatingDropdownOpen(!isRatingDropdownOpen)}
            >
              Rating <FontAwesomeIcon icon={faCaretDown} />
            </button>
            {isRatingDropdownOpen && (
              <div className="dropdown-content">
                <label>
                  <input
                    type="checkbox"
                    value="any"
                    onChange={handleRatingChange}
                  />
                  Any rating
                </label>
                {[...Array(10).keys()].map(rating => (
                  <label key={rating + 1}>
                    <input
                      type="checkbox"
                      value={rating + 1}
                      onChange={handleRatingChange}
                    />
                    {renderStars(rating + 1)}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="dropdown">
            <button
              className="dropdown-button"
              onClick={() => setGenreDropdownOpen(!isGenreDropdownOpen)}
            >
              Genre <FontAwesomeIcon icon={faCaretDown} />
            </button>
            {isGenreDropdownOpen && (
              <div className="dropdown-content">
                <label>
                  <input
                    type="checkbox"
                    value="any"
                    onChange={handleCategoryChange}
                  />
                  Any genre
                </label>
                {categories.map(category => (
                  <label key={category}>
                    <input
                      type="checkbox"
                      value={category}
                      onChange={handleCategoryChange}
                    />
                    {category}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {searchTerm !== '' && (
        <div className='filteredMovies'>
          <ul className='filterMovie'>
            {filteredMovies.map(movie => (
              <li key={movie.id}>
                <div className='movie-title'>
                  {movie.name}
                  <span className='movie-category'>{movie.category}</span>
                </div>
                <div className='movie-rating'>{renderStars(movie.rating)}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
