import './index.css'

const TravelItem = props => {
  const {travelItem} = props
  return (
    <li className="item-container">
      <img
        src={travelItem.imageUrl}
        alt={travelItem.name}
        className="item-image"
      />
      <h4 className="travel-name">{travelItem.name}</h4>
      <p className="travel-description">{travelItem.description}</p>
    </li>
  )
}

export default TravelItem
