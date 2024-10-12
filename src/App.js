import { GiphyFetch } from '@giphy/js-fetch-api'
import React, { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ReactDOM from 'react-dom';
import { ClockLoader } from 'react-spinners';
import './App.css';

function App() {
  const [loadingRandom, setLoadingRandom] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const mountedRef = useRef(false);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const URL = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`
  const [search, handleSearch] = useState('cats');
  const [currGif, gifHandler] = useState('');
  const [searchGif, searchGifHandler] = useState('');
  function inputChange(event){
    handleSearch(event.target.value);
  }
  async function fetchRandom(){
    setLoadingRandom(true);
    try{
      const response = await (await fetch(URL)).json();
      const randomURL = response.data.images.fixed_height.url;
      gifHandler(randomURL);
      console.log('Value of random is', randomURL);
    }catch(err){
      console.log("Error occured",err);
    }
    setLoadingRandom(false);
  }
  async function fetchSearch(event){
    setLoadingSearch(true);
    try{
      if(search === ''){
        toast.error("Enter an input first.");
      }else{
        const URL = `https://api.giphy.com/v1/gifs/search/?api_key=${API_KEY}&q=${search}`;
        const response = await (await fetch(URL)).json();
        const randomNumber = Math.floor(Math.random() * 50);
        const searchURL = response.data[randomNumber].images.fixed_height.url;
        searchGifHandler(searchURL);
        console.log('Value of search is', searchURL);
      }
      // const searchResponse = response.data.images.fixed_height.url;
      // searchGifHandler(searchResponse);
    }catch(err){
      console.log('Error is',err);
    }
    setLoadingSearch(false);
  }
  function searchImage(event){
    handleSearch(event.target.value);
  }
  // console.log('Value of gif outside use effect is', currGif)
  useEffect(() => {
      if(!mountedRef.current){
        fetchRandom();
        fetchSearch();
        mountedRef.current=true;
      }
  }, [])
  
  return (
    <div className="bg-blue flex flex-col justify-center items-center min-h-[100vh] min-w-[40vw]">
      <h1 className='w-11/12 bg-white text-center p-4 font-bold text-3xl rounded-xl my-12'>Random GIFS</h1>
      <div id="parentContainer" className='flex flex-col gap-8 w-5/12 min-w-[40vw]'>
        <div id="randomBox" className='bg-pink flex flex-col justify-between items-center rounded-xl p-4
        gap-2 min-h-[65vh]'>
          <h2 className='underline text-2xl font-bold'>A Random GIF</h2>
          <div className='w-[30rem] h-[25rem] flex justify-center items-center'>
            {
              (loadingRandom) ? <ClockLoader color='#fff'/> : <img src={currGif} alt="Searched GIF" className='w-[30rem] h-[25rem] object-cover'/>
            }
        </div>
          <button className='w-10/12 p-3 rounded bg-lightPink bg-opacity-70 shadow-lg shadow-gray-500 font-bold uppercase hover:bg-white' onClick={fetchRandom}>Generate</button>
        </div>
        <div id="searchBox" className='bg-cornSilk flex flex-col justify-between items-center rounded-xl p-4
        gap-2 min-h-[65vh] min-w-[40vw]'>
          <h2 className='underline text-center text-2xl font-bold truncate max-w-full overflow-hidden'>Search GIF: {search}</h2>
          <div className='w-[30rem] h-[25rem] flex justify-center items-center'>
            {
              (loadingSearch) ? <ClockLoader color='#fff'/> : <img src={searchGif} alt="Searched GIF" className='w-[30rem] h-[25rem] object-cover'/>
            }
        </div>
          <input type="text" placeholder='Enter the gif you want to search' className='w-10/12 text-center p-3 rounded' value={search} onChange={inputChange}/>
          <button className='w-10/12 p-3 font-bold uppercase rounded bg-lightCornSilk shadow-lg shadow-gray-500 hover:bg-white' onClick={fetchSearch}>Generate</button>
        </div>
      </div>
    </div>
  );
}
export default App;
