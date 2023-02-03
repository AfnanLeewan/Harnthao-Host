import React from "react";
import classes from "./AddCard.module.css";
import Modal from "./Modal";
import Addperson from "./Addperson";
import { useState } from "react";
import Addbutton from "./AddButton";
import AddOrder from "./AddOrder";
const AddCard = (props) => {
  const [addform, setaddform] = useState(false);
  const [addp, setaddp] = useState(true);
  const [addo, setaddo] = useState(false);
  const onaddorder = () => {
    setaddo(true);
    setaddp(false);
  };
  const onaddperson = () => {
    setaddo(false);
    setaddp(true);
  };
  const selected = !addform && classes.select;
  const cartModalContent = (
    <React.Fragment>
      <div className={classes.header}>
        <span className={addp ? classes.select : classes.control}>
          <button onClick={onaddperson}>Person</button>
        </span>
        <span className={addo ? classes.select : classes.control}>
          <button onClick={onaddorder}>Order</button>
        </span>
      </div>
      <form>
        <div></div>
      </form>
    </React.Fragment>
  );
  const checkhandler=(checkname)=>{
    props.onCheckhandler(checkname)
    console.log('check')
    console.log(checkname)
  }
  return (
    <Modal onClose={props.onClose}>
      {cartModalContent}
      {addp ? 
        <Addperson
          addper={props.addper}
          onChange={props.onChange}
          onClick={props.onClick}
          ordername={props.ordername}
        />
        :
        <AddOrder
        checkname={checkhandler}
        addor={props.addor}
        addpr={props.addpr}
        onChangeor={props.onChangeor}
        onChangepr={props.onChangepr}
        onClickor={props.onClickor}
        perlist={props.perlist}
        />
        
      }
      <Addbutton onClick={props.onClose}>Close</Addbutton>
    </Modal>
  );
};
export default AddCard;
