import React from 'react';
import './index.scss';
import { Collection } from "./Collection.jsx";

const categorys = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {
  const [collection, setCollection] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchVal, setSearchVal] = React.useState('');
  const [categoryId, setCategoryId] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);

  const category = categoryId ? `category=${categoryId}` : '';
  const pageParam = `page=${page}`;

  React.useEffect(() => {
    setIsLoading(true);
    fetch(`https://65b230d99bfb12f6eafd1c8e.mockapi.io/collection?${category}`)
      .then((res) => res.json())
      .then((json) => {
        setTotalPages(Math.ceil(json.length / 3));
      })
      .catch((err) => console.warn(err));
    fetch(`https://65b230d99bfb12f6eafd1c8e.mockapi.io/collection?${pageParam}&limit=3&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollection(json);
      })
      .catch((err) => console.warn(err))
      .finally(() => setIsLoading(false));
  
  }, [categoryId, page, category]);
  

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categorys.map((obj, i) => (
            <li
              onClick={() => {
                setCategoryId(i);
                setPage(1);
              }}
              className={categoryId === i ? 'active' : ''}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collection
            .filter((obj) => obj.name.toLowerCase().includes(searchVal.toLowerCase()))
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {totalPages === 1 ? '' : [...Array(totalPages)].map((_, i) => (
          <li
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? 'active' : ''}
            key={i}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
