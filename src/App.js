import Header from "./component/Header";
import Card from "./component/Card";
import classes from "./App.css";
import AddCard from "./component/AddCard";
import { useState } from "react";
const dummy=[
  
]
const dummyperson=[
  

]

function App() {
  const orderAmount=Object.keys(dummy).length

  return (
    <div className={classes.App}>
        <Header/>
        <Card order={dummy} amount={orderAmount} person={dummyperson}/>
        <footer><p>Harnthao1.0.3</p><p>Create By Afnan</p></footer>
    </div>
  );
}

export default App;
