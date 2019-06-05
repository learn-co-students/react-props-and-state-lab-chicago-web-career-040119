import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  mapThruPets = () => {
    return this.props.pets.map((petData, index) => <Pet pet={petData} onAdoptPet={this.props.onAdoptPet}/>)
  }


  render() {
    return (
    <div className="ui cards">
      {this.mapThruPets()}
    </div>
  )
  }
}

export default PetBrowser
