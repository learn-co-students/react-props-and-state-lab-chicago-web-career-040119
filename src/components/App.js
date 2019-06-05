import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

    onChangeType = event => {
      this.setState({
        filters: {
          type: event.target.value
        }
      })
    }

    onAdoptPet = id => {
      let newPets = this.state.pets
      newPets.find(pet => pet.id === id).isAdopted = true
      this.setState({
        pets: newPets
      })
    }

    setPetData = petData => {
      this.setState({
        pets: petData
      })
    }

    findPets = event => {
      let searchTerm = this.state.filters.type;
      if (searchTerm === "all") {
        fetch(`/api/pets`)
          .then(res => res.json())
          .then(petData => this.setPetData(petData))
          .catch(errors => console.log(errors.messages))
      } else {
        fetch(`/api/pets?type=${searchTerm}`)
          .then(res => res.json())
          .then(petData => this.setPetData(petData))
          .catch(errors => console.log(errors.messages))
      }

    }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">

              <Filters onFindPetsClick={this.findPets} onChangeType={this.onChangeType}/>

            </div>
            <div className="twelve wide column">

              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
