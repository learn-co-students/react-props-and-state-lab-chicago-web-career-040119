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


  fetchPets = () => {
    let petsURL = '/api/pets'
    if (this.state.filters.type !== 'all') {
      petsURL += `?type=${this.state.filters.type}`
    }
  

  fetch(petsURL)
  .then(resp => resp.json())
  .then(pets => this.setState({ pets }) )
  }


  onChangeType = () => {
    this.setState({
      filters: { ...this.state.filters, type: 'value' } 
       
    })
  }

  onAdoptPet = petId => {
    const pets = this.state.pets.map(pets => {
      return pets.id === petId ? { ...pets, isAdopted: true } : pets;
    });
    this.setState({ pets });
  };
  
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChange={this.onChangeType}
              onFindPetsClick={this.fetchPets}/>
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
