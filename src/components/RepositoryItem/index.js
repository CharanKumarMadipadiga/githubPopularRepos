import {IoStarSharp} from 'react-icons/io5'
import {PiGitForkDuotone} from 'react-icons/pi'
import {IoMdInformationCircle} from 'react-icons/io'

import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    avatarUrl,
    starsCount,
    forksCount,
    issuesCount,
  } = repositoryDetails

  return (
    <li className="repository-item">
      <img src={avatarUrl} className="avatar" alt={name} />
      <h1 className="name">{name}</h1>
      <div className="icons-con">
        <IoStarSharp className="star-style" />
        <p>{starsCount} stars</p>
      </div>
      <div className="icons-con">
        <PiGitForkDuotone className="fork-style" />
        <p>{forksCount} forks</p>
      </div>
      <div className="icons-con">
        <IoMdInformationCircle className="issue-style" />
        <p>{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
