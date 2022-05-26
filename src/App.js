import React, { useState ,useEffect } from "react";
import List from "./components/ExpenseList";
import Form from "./components/ExpenseForm";
import Alert from "./components/Alert";
import "./App.css";
import { v4 as uuid } from "uuid";
// const initialExp = [
//   { id: uuid(), charge: "rent", amount: 1600 },
//   { id: uuid(), charge: "amazon pay", amount: 400 },
//   { id: uuid(), charge: "credit", amount: 600 },
// ];


//  console.log(initialExp);
//  console.table(initialExp )

const initialExp = localStorage.getItem("expense") ? JSON.parse(localStorage.getItem("expense")) : []
function App() {
  /*********fuctionality */
  const [expense, setExpense] = useState(initialExp);
  // console.log(expense);

  const [charge, setCharge] = useState("");

  const [amount, setAmount] = useState("");

  const handelCharge = (e) => {
    // console.log(e.target.value);
    setCharge(e.target.value);
  };
  const handelAmount = (e) => {
    // console.log(e.target.value);
    setAmount(e.target.value);
  };
  useEffect(()=>{
    console.log("use effect run ");
    localStorage.setItem("expense",JSON.stringify(expense))
    },[expense])

  const [alert, setAlert] = useState({ show: false });
  //handelAlert
  const handelAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 4000);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e);
    if (charge !== "" && amount > 0) {
      if(edit){
        let tempExpense =expense.map(item => {
          return item.id === id ?{
            ...item ,
            charge ,
            amount 
          } :item
        })
        setExpense(tempExpense);
        setEdit(false);
        handelAlert({
          type:"success" ,
          text :"Edit Successful"
        })

      }else{

        const singleExpense = { id: uuid(), charge, amount };
      setExpense([...expense, singleExpense]);
      handelAlert({ type: "success", text: "item added" });

      }
      
      setCharge("");
      setAmount("");
    } else {
      handelAlert({
        type: "danger",
        text: `some thing wrong`,
      });
    }
    console.log(charge, amount);
  };
  //clear all
  const deleteAll = () => {
    console.log("All Deleted");
    setExpense([]);
    handelAlert({
      type: "danger",
      text: "All item deleted",
    });
  };

  //single edit
  const singleEdit = (id) => {
    // console.log(`edit item ${id}`);
    const editExpense = expense.find((item) => item.id === id);
    let {charge , amount } =editExpense;
    setCharge(charge);  
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  //single clear
  const singleDelete = (id) => {
    console.log(`item deleted ${id}`);
    let deleteOne = expense.filter((item) => item.id !== id);
    setExpense(deleteOne);
    handelAlert({
      type: "danger",
      text: "item deleted success",
    });
  };

  //edit
  const [edit, setEdit] = useState(false);

  //id
  const [id, setId] = useState(0);

  /********************** */
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1 className="px-5 mx-5 text-center">Budget Calculator</h1>
      <main className="App">
        <Form
          charge={charge}
          amount={amount}
          handelCharge={handelCharge}
          handelAmount={handelAmount}
          submitHandler={submitHandler}
          edit={edit}
        />

        <List
          expense={expense}
          deleteAll={deleteAll}
          singleEdit={singleEdit}
          singleDelete={singleDelete}
        />
      </main>
      <h1 className=" py-5 px-5 mx-5 text-center">
        total spending:{" "}
        <span className="total">
          ${" "}
          {expense.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
