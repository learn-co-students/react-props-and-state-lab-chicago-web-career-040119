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
//update <App>'s state.filters.type
//passing a callback from parent to child
  onChangeType = (type) => {
    //update state
    this.setState({
      filters: {
        type: type
      }
    })
  }

  //pass a callback function from App (state is in the app)-PetBrowser-Pet (button in the pet, when is clicked update state in the app)
  onAdoptPet = (petId) => {
    //finding the pet that is being adopted
    let petList = [...this.state.pets]
    let adoptee = petList.find(pet => pet.id === petId)
    adoptee.isAdopted = true
      this.setState({
      //what i am replacing pets with? // makes sure everything rerenders
        pets: petList
      })
  }

  onFindPetsClick = () => {
    let url = "/api/pets"
    if (this.state.filters.type !== "all") { url += `?type=${this.state.filters.type}`}
    //this.state.filters.type === "all" ? fetch("/api/pets") : fetch("/api/pets?type=" + this.state.filters.type)
   //fetch will be conditional based on type
    fetch(url)
    .then(resp => resp.json())
    //set state of pets with the response
    .then(petData => {
      this.setState({
        pets: petData
      })
    })
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
                <Filters onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}/>
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
