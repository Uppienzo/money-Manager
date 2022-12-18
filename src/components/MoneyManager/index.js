import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TransactionItem from '../TransactionItem'

import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    amountEnquiry: {
      balance: 0,
      income: 0,
      expenses: 0,
    },
    transactionsList: [],
    title: '',
    amount: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onchangeType = event => {
    const {value} = event.target
    const optionObj = transactionTypeOptions.find(
      each => each.displayText === value,
    )
    this.setState({optionId: optionObj.optionId})
  }

  updateMoneyDetails = newTransaction => {
    const {amount, type} = newTransaction

    if (type === 'Income') {
      this.setState(prevState => ({
        amountEnquiry: {
          ...prevState.amountEnquiry,
          balance: prevState.amountEnquiry.balance + parseInt(amount),
          income: prevState.amountEnquiry.income + parseInt(amount),
        },
      }))
    }
    if (type === 'Expenses') {
      this.setState(prevState => ({
        amountEnquiry: {
          ...prevState.amountEnquiry,
          expenses: prevState.amountEnquiry.expenses + parseInt(amount),
          balance: prevState.amountEnquiry.balance - parseInt(amount),
        },
      }))
    }
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {title, amount, optionId} = this.state
    const typeObj = transactionTypeOptions.find(
      each => each.optionId === optionId,
    )
    const {displayText} = typeObj

    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      title: '',
      amount: '',
    }))

    this.updateMoneyDetails(newTransaction)
  }

  onDeleteHistory = id => {
    const {transactionsList} = this.state
    const historyItemDetails = transactionsList.find(each => each.id === id)
    const {amount, type} = historyItemDetails
    if (type === 'Income') {
      this.setState(prevState => ({
        amountEnquiry: {
          ...prevState.amountEnquiry,
          balance: prevState.amountEnquiry.balance - parseInt(amount),
          income: prevState.amountEnquiry.income - parseInt(amount),
        },
      }))
    }
    if (type === 'Expenses') {
      this.setState(prevState => ({
        amountEnquiry: {
          ...prevState.amountEnquiry,
          expenses: prevState.amountEnquiry.expenses - parseInt(amount),
          balance: prevState.amountEnquiry.balance + parseInt(amount),
        },
      }))
    }

    this.setState(prevState => ({
      transactionsList: prevState.transactionsList.filter(
        each => each.id !== id,
      ),
    }))
  }

  render() {
    const {
      amountEnquiry,
      transactionsList,
      title,
      amount,
      optionId,
    } = this.state
    const typeValue = transactionTypeOptions.find(
      each => each.optionId === optionId,
    )

    const {displayText} = typeValue
    console.log(displayText)
    return (
      <div className="container">
        <div className="main-container">
          <div className="profile-container">
            <h1 className="profile-name-head">Hi, Richard</h1>
            <p className="description">
              Welcome back to your{' '}
              <span className="money-manager">Money Manager</span>
            </p>
          </div>{' '}
          <div className="accounts-container">
            <MoneyDetails details={amountEnquiry} />
          </div>
          <div className="account-transaction-container">
            <div className="transaction-container">
              <div className="">
                <h1 className="transaction-head">Add Transaction</h1>
                <form className="form-container" onSubmit={this.onSubmitForm}>
                  <label htmlFor="title">TITLE</label>
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={this.onChangeTitle}
                  />
                  <label htmlFor="amount">AMOUNT</label>
                  <input
                    type="text"
                    placeholder="Amount"
                    value={amount}
                    onChange={this.onChangeAmount}
                  />
                  <label htmlFor="select">TYPE</label>
                  <select
                    className="select"
                    id="select"
                    value={optionId}
                    onChange={this.onchangeType}
                  >
                    {transactionTypeOptions.map(eachOption => (
                      <option
                        key={eachOption.optionId}
                        value={eachOption.optionId}
                      >
                        {eachOption.displayText}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </form>
              </div>
            </div>
            <div className="history-container">
              <div className="">
                <h1 className="history-head">History</h1>
                <ul className="transactions-list">
                  <li className="default-head" key="123">
                    <p>Title</p>
                    <p>Amount</p>
                    <p>Type</p>
                    <h1 className="transparent">delete</h1>
                  </li>
                  {transactionsList.map(each => (
                    <TransactionItem
                      key={each.id}
                      details={each}
                      onDeleteHistory={this.onDeleteHistory}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
