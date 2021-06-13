/// <reference lib="webworker" />

import { DataI } from "./app.models";

addEventListener('message', ({ data }) => {

  const createDataArray = (size: number) => {
    const arr = new Array(size).fill('').map(()=> item())
    return arr.splice(arr.length-10)
  }
  const item = ():DataI =>  {
    return {
      id: String(Math.random()),
      int: Math.floor(Math.random()*564),
      float: Math.random()*4521,
      color: randomColor(),
      child: {id: String(Math.random()), color: randomColor()}
    }
  }
  
  const randomColor = () => {
    return '#'+Math.floor(Math.random()*16777215).toString(16)
  }

  setInterval( () => postMessage(createDataArray(data.size)) , data.timer);
});
