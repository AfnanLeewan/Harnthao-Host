import classes from "./Card.module.css";
import Track from "./Track";
import List from "./List";
import ListCard from "./ListCard";
import Addbutton from "./AddButton";
import PersonIcon from "./icon/PersonIcon";
import Bar from "./Bar";
import BillIcon from "./icon/BillIcon";
import AddCard from "./AddCard";
import { useState, useEffect,useRef } from "react";
import { useStateWithCallback } from "./useStatewithcallback";


const Card = (props) => {
  const [Add, setAdd] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [perlist, setperlist] = useState([]);
  const [orlist, setorlist] = useState([]);
  const [personName, setPersonName] = useState([]);
  const [addper, setaddper] = useState("");
  const [addor, setaddor] = useState("");
  const [addpr, setaddpr] = useState("");
  const [nameChecked, setNameChecked] = useState([]);
  const checkRef=useRef([])
  const greatestper =
    perlist.reduce((acc, obj) => (obj.id > acc ? obj.id : acc), 0) + 1;
  const greatestor =
    orlist.reduce((acc, obj) => (obj.id > acc ? obj.id : acc), 0) + 1;

  const onClickAdd = () => {
    setAdd(true);
  };
  const onClicktoggle = () => {
    setToggle(!toggle);
  };
  const onClose = () => {
    setAdd(false);
    relist();
  };
  const onCheckhandler = (name) => {
    checkRef.current=name

  };

  const addperson = (event) => {
    console.log(event.target.value);
    setaddper(event.target.value);
  };
  const addorder = (event) => {
    console.log(event.target.value);
    setaddor(event.target.value);
  };
  const addprice = (event) => {
    console.log(event.target.value);
    setaddpr(event.target.value);
  };

  const submitaddperson = async () => {
    if(addper.trim().length===0){
      return;
    }
    const newperson = {
      id: greatestper,
      name: addper,
      cost: 999,
      person: 9,
      order:[],
      ordername:[]
    };
    setPersonName([...personName, newperson.name]);
    setperlist([...perlist, newperson]);
    setaddper("");
  };

  const findpersoninorder=(name)=>{
    const count = orlist.reduce((acc, obj) => {
    return acc + obj.personused.filter(ordername => ordername === name).length;
}, 0);
return count
  }
  const addpaid=(name) =>{
    let orderpaid=[]
    orlist.map((orl)=>{
        if(orl.personused.includes(name)){
          orderpaid.push(orl.personpay)
        }
    }
    )
    return orderpaid
  }

  const addordername=(name) =>{
    let ordername=[]
    orlist.map((orl)=>{
        if(orl.personused.includes(name)){
          ordername.push(orl.name)
        }
    }
    )
    return ordername
  }


  const relist = () => {
    setperlist((prevArr) =>
      prevArr.map((obj) => {
        let array=addpaid(obj.name)
        let sum = array.reduce((acc, curr) => acc + curr, 0);
        return { ...obj, cost: sum.toFixed(2), person: findpersoninorder(obj.name) ,order:addpaid(obj.name),ordername:addordername(obj.name) };
      })

    );
  
      
    setorlist((prevArr) =>
      prevArr.map((obj) => {
        return { ...obj };
      })
    );

  };
  const personOnCheckhandler=(name)=>{
    console.log(name)
  }
  const sum = orlist.reduce((acc, obj) => acc + obj.price, 0);
  const personNum = Object.keys(perlist).length;
  const orderNum = Object.keys(orlist).length;
  const orderlist = orlist.map((order) => (
    <ListCard
      key={order.id}
      id={order.id}
      name={order.name}
      price={order.price}
      person={order.person}
    />
  ));
  const personlist = perlist.map((order) => (
    <ListCard
      key={order.id}
      id={order.id}
      name={order.name}
      price={order.cost}
      person={order.person}
    />
  ));
  const submitaddorder = () => {
    if(addor.trim().length===0 || addpr.trim().length===0 || Number.isNaN(+addpr)){
      return
    }
    const neworder = {
      id: greatestor,
      name: addor,
      price: +addpr,
      person: Object.keys(checkRef.current).length,
      personused: checkRef.current,
      personpay:+addpr/Object.keys(checkRef.current).length
    };
    setorlist(()=>{return[...orlist, neworder]});
    setaddor("");
    setaddpr("");
  };

  return (
    <section className={classes.summary}>
      {Add && (
        <AddCard
          onCheckhandler={onCheckhandler}
          perlist={perlist}
          orlist={orlist}
          addper={addper}
          onChange={addperson}
          onClick={submitaddperson}
          onClose={onClose}
          addor={addor}
          addpr={addpr}
          onChangeor={addorder}
          onChangepr={addprice}
          onClickor={submitaddorder}
          personOnCheckhandler={personOnCheckhandler}
        />
      )}
      <Track amount={orderNum} person={personNum} total={sum} />
      <Bar status={toggle} />
      <div className={classes.scroller}>{!toggle ? orderlist : personlist}</div>
      <div className={classes.butcon}>
        <div className={classes.but}>
          <Addbutton onClick={onClickAdd}>Add</Addbutton>
        </div>
        <div className={classes.but}>
          <Addbutton onClick={onClicktoggle}>
            <div className={classes.icon}>
              {toggle ? <BillIcon /> : <PersonIcon />}
            </div>
          </Addbutton>
        </div>
      </div>
    </section>
  );
};
export default Card;