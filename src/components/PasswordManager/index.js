/* eslint-disable prettier/prettier */
import React from 'react'
import {v4 as generateId} from 'uuid'
import './index.css'

/* 
    {id: 1, website: 'youtube.com', username: 'sravan', password: 'secret'},
        {id: 2, website: 'facebook.com', username: 'vivek', password: 'secret'},
        {
          id: 3,
          website: 'instagram.com',
          username: 'charan',
          password: 'secret',
        },
*/

class PasswordManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPasswords: false,
      passwordsList: [
        // {id: 1, website: 'youtube.com', username: 'sravan', password: 'secret'},
        // {id: 2, website: 'facebook.com', username: 'vivek', password: 'secret'},
        // {
        //   id: 3,
        //   website: 'instagram.com',
        //   username: 'charan',
        //   password: 'secret',
        // },
      ],
      website: '',
      username: '',
      password: '',
      searchInput: '',
      searchResults: [],
    }
  }

  onAddPassword = () => {
    const {website, username, password} = this.state
    const newPassword = {
      id: generateId(),
      website,
      username,
      password,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  onChangeInputWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeInputUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeInputPassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeInputSearch = event => {
    const {passwordsList} = this.state
    const {value} = event.target

    const searchResults = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(value.toLowerCase()),
    )
    this.setState({searchResults, searchInput: value})
  }

  onClickCheckbox = () => {
    this.setState(prevState => ({
      showPasswords: !prevState.showPasswords,
    }))
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    const afterDeletedList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )

    this.setState({passwordsList: afterDeletedList})
  }

  renderAddNewPassword = () => {
    const {website, password, username} = this.state
    let isAddButtonDisabled = true
    if ((website === '' || password === '', username === '')) {
      isAddButtonDisabled = true
    } else {
      isAddButtonDisabled = false
    }

    return (
      <div className="add-new-password-container card">
        <form>
          <h1 className="heading">Add New Password</h1>

          <div className="input-field-container">
            <img
              className="small-icons"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
            />
            <input
              className="input-field"
              type="text"
              id="website"
              placeholder="Enter Website"
              value={website}
              onChange={this.onChangeInputWebsite}
            />
          </div>
          <div className="input-field-container">
            <img
              className="small-icons"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
            />
            <input
              className="input-field"
              type="text"
              id="username"
              placeholder="Enter Username"
              value={username}
              onChange={this.onChangeInputUsername}
            />
          </div>
          <div className="input-field-container">
            <img
              className="small-icons"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
            />
            <input
              className="input-field"
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={this.onChangeInputPassword}
            />
          </div>
          <div className="add-button-container">
            <button
              className="button add-button"
              type="submit"
              onClick={event => {
                event.preventDefault()
                this.onAddPassword()
              }}
              disabled={isAddButtonDisabled}
            >
              Add
            </button>
          </div>
        </form>
        <img
          className="password-manager-img"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
          alt="password manager"
        />
      </div>
    )
  }

  renderAllPasswords = () => {
    const {passwordsList, searchInput, searchResults} = this.state

    const passwordsListToRender =
      searchResults.length > 0 ? searchResults : passwordsList
    const passwordsCount = passwordsListToRender.length

    return (
      <div className="your-passwords-container card">
        <div className="top-sec">
          <div className="your-passwords">
            <h1 className="heading">Your Passwords</h1>
            <p className="passwords-count">{passwordsCount.toString()}</p>
          </div>

          <div className="search-container">
            <img
              className="small-icons"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
            />
            <input
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeInputSearch}
            />
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="show-passwords-checkbox">
          <input
            type="checkbox"
            onClick={this.onClickCheckbox}
            id="show-passwords"
          />
          <label htmlFor="show-passwords">Show Passwords</label>
        </div>
        <div className="passwords-container">
          {passwordsCount === 0 ||
          (searchInput !== '' && searchResults.length === 0) ? (
            <div className="no-passwords-container">
              <img
                className="no-passwords-img"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>No Passwords</p>
            </div>
          ) : (
            <div className="passwords-list-container">
              <ul className="passwords-list">
                {passwordsListToRender.map(eachPassword => (
                  <li key={eachPassword.id}>
                    {this.renderPasswordCard(eachPassword)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }

  renderPasswordCard = details => {
    const {id, website, username, password} = details
    const {showPasswords} = this.state
    const initial = website[0]
    return (
      <div className="password-card">
        <div className="initial">
          <h1>{initial}</h1>
        </div>
        <div className="password-details">
          <p>{website}</p>
          <p>{username}</p>
          {showPasswords ? (
            <p>{password}</p>
          ) : (
            <img
              className="password-stars"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </div>
        <button
          className="delete-button"
          type="button"
          onClick={() => this.onDeletePassword(id)}
          testid="delete"
        >
          <img
            className="small-icons"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <img
          className="app-logo"
          alt="app logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        />
        {this.renderAddNewPassword()}
        {this.renderAllPasswords()}
      </div>
    )
  }
}

export default PasswordManager
