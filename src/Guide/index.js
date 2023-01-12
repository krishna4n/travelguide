import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelItem from '../TravelItem'
import './index.css'

class Guide extends Component {
  state = {travelList: [], loadingStatus: 'LOADING'}

  loadingState = {
    loading: 'LOADING',
    success: 'SUCCESS',
    failed: 'FAILED',
  }

  componentDidMount() {
    this.getApiData()
  }

  getApiData = async () => {
    const travelGuidePackagesApiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(travelGuidePackagesApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const packageList = data.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))

      this.setState({
        travelList: packageList,
        loadingStatus: this.loadingState.success,
      })
    } else {
      this.setState({
        loadingStatus: this.loadingState.failed,
      })
    }
  }

  renderingSuccessView = () => {
    const {travelList} = this.state
    return (
      <ul className="success-view-container">
        {travelList.map(each => (
          <TravelItem key={each.id} travelItem={each} />
        ))}
      </ul>
    )
  }

  renderingLoadingView = () => (
    <div className="loading-container">
      <div data-testid="loader">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    </div>
  )

  renderingOptions = () => {
    const {loadingStatus} = this.state
    switch (loadingStatus) {
      case this.loadingState.loading:
        return this.renderingLoadingView()
      case this.loadingState.success:
        return this.renderingSuccessView()
      case this.loadingState.failed:
        return this.renderingFailedView()

      default:
        return ''
    }
  }

  render() {
    const {travelList} = this.state
    return (
      <div className="container">
        <div className="heading-container">
          <h1 className="heading">Travel Guide</h1>
          <hr className="hr-line" />
        </div>
        {this.renderingOptions()}
      </div>
    )
  }
}

export default Guide
