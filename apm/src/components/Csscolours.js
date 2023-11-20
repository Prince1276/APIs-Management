import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import './Csscolours.css'; // You would need to create this CSS file for styling

const Csscolours = () => {
  const [colors, setColors] = useState([]);
  const [filter, setFilter] = useState('');
  const [visibleColors, setVisibleColors] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get('//color-names.herokuapp.com/v1/')
      .then(response => {
        setColors(response.data.colors);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const filteredColors = colors.filter(col =>
      col.name.toLowerCase().includes(filter.toLowerCase()) ||
      col.hex.toLowerCase().includes(filter.toLowerCase())
    );
    setVisibleColors(filteredColors.slice(0, page * 20)); // Display 20 colors per page
  }, [colors, filter, page]);

  const isDark = (rgb) => (
    Math.round(((parseInt(rgb.r) * 299) + (parseInt(rgb.g) * 587) + (parseInt(rgb.b) * 114)) / 1000) < 125
  );

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    setPage(1); // Reset the page when filter changes
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      setPage(prevPage => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
    <h1 className='header1'>CSS Colors</h1>
    <div id="app">
    
      <input
        type="text"
        placeholder="Filter"
        value={filter}
        onChange={handleFilterChange}
      />
      
      <table className="color-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Color Code</th>
            
          </tr>
        </thead>
        <tbody>
          {visibleColors.map((color) => (
            <tr
              key={color.hex}
              className={isDark(color.rgb) ? 'is-dark' : ''}
              style={{ backgroundColor: color.hex }}
            >
              <td>{color.name}</td>
              <td>{color.hex}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Csscolours;
