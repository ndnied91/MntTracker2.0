import React, { useState, useEffect } from 'react';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { MountainLayout, SearchBar } from '../components';
import { useGlobalContext } from '../context';

export const loader = async () => {
  try {
    const { data } = await customFetch('/');
    return data;
  } catch (error) {
    return error;
  }
};

const Landing = () => {
  const { mountains } = useLoaderData();
  const [mountainData, setMountainData] = useState(mountains);
  const [searchItems, setSearchItems] = useState('');
  const { favorites, showFavorites } = useGlobalContext();

  useEffect(() => {
    setMountainData(
      mountains.filter((i) => i.formattedName.includes(searchItems))
    );
  }, [searchItems]);

  return (
    <div className="testttt">
      {favorites.length > 1 && showFavorites ? (
        <MountainLayout mountains={favorites} />
      ) : (
        <>
          <SearchBar setSearchItems={setSearchItems} />
          <MountainLayout mountains={mountainData} />
        </>
      )}
    </div>
  );
};

export default Landing;
