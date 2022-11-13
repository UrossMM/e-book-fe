import React, { Component } from 'react'
import UserDetails from './UserDetails'
import PersonalDetails from './PersonalDetails'
import Confirmation from './Confirmation'
import Success from './Success'

export default class Signup extends Component {

  state = {
    step: 1,
    pol: '',
    godine: '', 
    visina: '',
    tezina: '',
    nivo: '',
    cilj: '',
    brojObroka: '',
    sastojci: '',
    mejl: '',
    telefon: ''
  }

  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  }

  // proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  }

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value }); //podesava polje iz state-a sa imenom input na vrednost unetu u polju sa forme
  }

  handleChangeSastojci = (newValue) => {
    this.setState({ sastojci: newValue }); //podesava polje iz state-a sa imenom input na vrednost unetu u polju sa forme
  }

  render() {
    const { step } = this.state;
    const { pol, godine, visina, tezina, nivo, cilj, brojObroka, sastojci, mejl, telefon} = this.state;
    const values = { pol, godine, visina, tezina, nivo, cilj, brojObroka, sastojci, mejl, telefon}
    //console.log('Render u Signup');
    //console.log(values);
    switch(step) {
      case 1: 
        return (
          <UserDetails 
           
            nextStep={ this.nextStep }// ovo kad pozove onda ce UserDetailsu da se prosledi pokazivac na funkciju nextStep ali ne i da pozove funkciju tako da ce da mu prosledi vrednost 1?
            handleChange={ this.handleChange }
            values={ values }
          />
        )
      case 2: 
        return (
          <PersonalDetails 
            prevStep={ this.prevStep } //pointer na fju, a u tom trenutku step setovan na 2
            nextStep={ this.nextStep }//pointer na fju, a u tom trenutku step setovan na 2
            handleChange={ this.handleChange }
            handleChangeSastojci = {this.handleChangeSastojci}
            values={ values }
          />
        )
      case 3: 
          return (
            <Confirmation 
              prevStep={ this.prevStep }
              nextStep={ this.nextStep }
              values={ values }
            />
          )
        case 4: 
          return (
            <Success />
          )
      default: 
          // do nothing
    }
  }
}