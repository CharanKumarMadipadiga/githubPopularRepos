import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeTab: languageFiltersData[0].id,
    popularReposList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    const {activeTab} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTab}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
        id: eachItem.id,
      }))
      this.setState({
        popularReposList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onActiveTabItem = tabId => {
    this.setState({activeTab: tabId}, this.getPopularRepos)
  }

  renderLoaderSpinner = () => (
    <div data-testid="loader" className="loader-style">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderLanguageTabs = () => {
    const {activeTab} = this.state
    return languageFiltersData.map(language => (
      <LanguageFilterItem
        languageDetails={language}
        key={language.id}
        onActiveTabItem={this.onActiveTabItem}
        isActive={language.id === activeTab}
      />
    ))
  }

  renderRepositoriesList = () => {
    const {popularReposList} = this.state
    return (
      <ul className="repos-list">
        {popularReposList.map(eachItem => (
          <RepositoryItem repositoryDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderSpinner()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        <ul className="language-list">{this.renderLanguageTabs()}</ul>
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
