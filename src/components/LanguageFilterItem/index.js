import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, onActiveTabItem, isActive} = props
  const {language, id} = languageDetails

  const activeTabStyling = isActive ? 'active-tab' : 'in-active-tab'

  const onClickTab = () => {
    onActiveTabItem(id)
  }

  return (
    <button
      className={`language-item ${activeTabStyling}`}
      type="button"
      onClick={onClickTab}
    >
      <li>{language}</li>
    </button>
  )
}

export default LanguageFilterItem
