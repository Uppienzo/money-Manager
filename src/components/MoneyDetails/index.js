import {Component} from 'react'
import './index.css'

class MoneyDetails extends Component {
  render() {
    const {details} = this.props
    const {balance, income, expenses} = details

    return (
      <div className="money-details-container">
        <div className="balance-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            alt="balance"
            className="details-img"
          />
          <div>
            <p className="details-text">Your Balance</p>
            <p className="details-money" testid="balanceAmount">
              Rs {balance}
            </p>
          </div>
        </div>
        <div className="income-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            alt="income"
            className="details-img"
          />
          <div>
            <p className="details-text">Your Income</p>
            <p className="details-money" testid="incomeAmount">
              Rs {income}
            </p>
          </div>
        </div>
        <div className="expenses-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            alt="expenses"
            className="details-img"
          />
          <div>
            <p className="details-text">Your Expenses</p>
            <p className="details-money" testid="expensesAmount">
              Rs {expenses}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyDetails
