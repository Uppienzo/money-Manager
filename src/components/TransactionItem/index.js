// Write your code here
import './index.css'

const TransactionItem = props => {
  const {details, onDeleteHistory} = props
  const {id, title, amount, type} = details
  const deleteHistory = () => {
    onDeleteHistory(id)
  }
  return (
    <li className="trans-item">
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type}</p>
      <button
        type="button"
        className="dlt-button"
        testid="delete"
        onClick={deleteHistory}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png "
          alt="delete"
          className="dlt-img"
        />
      </button>
    </li>
  )
}

export default TransactionItem
