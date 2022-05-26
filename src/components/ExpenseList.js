import React from 'react'
import Item from './ExpenseItem'
import { MdDelete } from 'react-icons/md'

const ExpenseList = (props) => {
  // console.log(props);
  return (
    <>
    <ul className="list">
      {
        props.expense.map((expense)=>{
          return <Item 
          key={expense.id} 
          expense={expense} 
          singleEdit={props.singleEdit} 
          singleDelete={props.singleDelete} 
          />
        })
      }
    </ul>
    {props.expense.length > 0 &&( 
    <button className="btn" onClick={props.deleteAll}>
      clear  
    <MdDelete className="btn-icon" /> 
    </button>)}
    </>
  )
}

export default ExpenseList