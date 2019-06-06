import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  //render all pets components that are obj in props
  renderPetCards = () => {
    return this.props.pets.map(pet => <Pet pet={pet} onAdoptPet={this.props.onAdoptPet}/>)
    //pet is the {} we are passing an entire object as a prop
  }

  render() {
    return <div className="ui cards">
    {this.renderPetCards()}
    </div>
  }
}

export default PetBrowser
