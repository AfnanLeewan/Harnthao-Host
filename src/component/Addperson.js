import classes from "./Addperson.module.css";
import React from "react";
import Checkbox from "./Checkbox";
import { useState,useRef } from "react";
const Addperson = (props) => {

  const [orderChecked,setorderChecked]=useState([])
  const checkref=useRef([])
  const checkhandler=(order,check)=>{
    if(check===true){
      setorderChecked([...orderChecked,order])
      checkref.current=[...orderChecked,order]
    }
    else{
      setorderChecked(orderChecked.filter(element=>element !==order))
      checkref.current=checkref.current.filter(element=>element !==order)
    }
    props.checkname(checkref.current)
  }
  const orderlist = props.orlist.map((order) => (
    <Checkbox key={order.id} name={order.name} check={checkhandler} />
  ))
  return (
    <React.Fragment>
      <form className={classes["flex-form"]}>
        <input
          type="search"
          onChange={props.onChange}
          placeholder="Name"
          value={props.addper}
        />
        <input type="button" onClick={props.onClick} value="+ ADD" />
      </form>
      <div className={classes.wrapper}>
 {orderlist}
    </div>
    </React.Fragment>
  );
};
export default Addperson;
