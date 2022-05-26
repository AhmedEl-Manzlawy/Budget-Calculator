import React from 'react'
import { MdSend } from 'react-icons/md'

const ExpenseForm = (props) => {
  return (
    <form onSubmit={props.submitHandler} > 
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
           type="text"
           className="form-control"
            id="charge" 
            name="charge"
            value={props.charge}
            onChange={props.handelCharge}
            />
        </div>
        <div className="form-group">
          <label
           htmlFor="amount">amount</label>
          <input 
          type="number"
           className="form-control" 
           id="amount" 
           name="amount" 
           value={props.amount}
           onChange={props.handelAmount}
           
           />
        </div>

      </div>
      <button type="submit" className="btn"  >
        {props.edit ? "Edit" :"submit"}
        <MdSend className="btn-icon" />
        </button>
    </form>
  )
}

export default ExpenseForm