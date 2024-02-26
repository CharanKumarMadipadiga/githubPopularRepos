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

class GithubPopularRepos extends Component {
  state = {
    activeTab: languageFiltersData[0].id,
    popularReposList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    this.setState({isLoading: true})
    const languageName = this.renderLanguage()
    const url = `https://apis.ccbp.in/popular-repos?language=${languageName}`
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
      this.setState({popularReposList: updatedData, isLoading: false})
    }
  }

  renderLanguage = () => {
    const {activeTab} = this.state
    const value = languageFiltersData.find(
      eachItem => eachItem.id === activeTab,
    )
    if (value) {
      return value.language
    }
    return ''
  }

  onActiveTabItem = tabId => {
    this.setState({activeTab: tabId}, this.getPopularRepos)
  }

  render() {
    const {activeTab, popularReposList, isLoading} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        <ul className="language-list">
          {languageFiltersData.map(language => (
            <LanguageFilterItem
              languageDetails={language}
              key={language.id}
              onActiveTabItem={this.onActiveTabItem}
              isActive={language.id === activeTab}
            />
          ))}
        </ul>
        <ul className="repos-list">
          {isLoading ? (
            <div data-testid="loader" className="loader-style">
              <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
            </div>
          ) : (
            popularReposList.map(eachItem => (
              <RepositoryItem repositoryDetails={eachItem} key={eachItem.id} />
            ))
          )}
        </ul>
      </div>
    )
  }
}

export default GithubPopularRepos
