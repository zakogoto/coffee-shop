import { Component } from 'react';
import nextId from "react-id-generator";

import Header from './components/header/header';
import About from './components/about/about';
import Goods from './components/goods/goods';
import Footer from './components/footer/footer';

import prestoCoffeeBeans from './components/goods-item/presto_coffee_beans.svg';
import solimoCoffeeBeans from "./components/goods-item/solimo_coffee_beans.svg"
import aromisticoCoffeeBeans from './components/goods-item/aromistico_coffee_beans.svg';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          src: solimoCoffeeBeans, alt: "solimo coffee beans", 
          name: 'solimo Coffee Beans 1 kg', price: 6.99, id: nextId(),
          best: true, country: 'brazil'
        },
        {
          src: prestoCoffeeBeans, alt: "presto coffee beans", 
          name: 'Presto Coffee Beans 1 kg', price: 6.99, id: nextId(),
          best: true, country: 'kenya'
        },
        {
          src: solimoCoffeeBeans, alt: "solimo coffee beans", 
          name: 'solimo Coffee Beans 1 kg', price: 6.99, id: nextId(),
          best: true, country: 'brazil'
        },
        {
          src: prestoCoffeeBeans, alt: "presto coffee beans", 
          name: 'Presto Coffee Beans 1 kg', price: 6.99, id: nextId(),
          best: false, country: 'columbia'
        },
        {
          src: prestoCoffeeBeans, alt: "presto coffee beans", 
          name: 'Presto Coffee Beans 1 kg', price: 6.99, id: nextId(),
          best: false, country: 'brazil'
        },
        {
          src: aromisticoCoffeeBeans, alt: "aromistico coffee beans", 
          name: 'AROMISTICO Coffee 1 kg', price: 6.99, id: nextId(),
          best: true, country: 'columbia'
        }
      ],
      typeOfPage: 'goods',
      filter: 'all',
      term: ''
    }
  }

  showOnlyBestItem = (items)=> 
    (items.filter(item => item.best))

  onTogglePage = (typeOfPage) =>{
    this.setState(({typeOfPage}))
  }
  
  onSelectFilter = (filter) => {
    this.setState(({filter}))
  }
  
    filterItems = (items, filter) => {
      switch (filter) {
          case 'brazil':
              return items.filter(item => item.country === 'brazil');
          case 'kenya':
              return items.filter(item => item.country === 'kenya');
          case 'columbia':
              return items.filter(item => item.country === 'columbia');
              default:
                  return items;
      }
    }

  onUpdateSearch = (term) => {
    this.setState(({term}))
  }

  SearchItems = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter(item=> {
      return item.name.toLowerCase().indexOf(term) > -1
    })
  }

  render() {
    const {typeOfPage, filter, data, term} = this.state;
    // const visibleData = this.filterItems(this.showOnlyBestItem(typeOfPage, this.SearchItems(data, term)), filter);
    const visibleData = typeOfPage === 'main' ? this.showOnlyBestItem(data) : 
      typeOfPage === 'about' ? this.filterItems(this.SearchItems(data, term), filter) :
      data;
    return (
      <div className="App">
        <Header color={'white'} typeOfPage={typeOfPage} onTogglePage={this.onTogglePage}/>
        <About typeOfPage={typeOfPage} />
        <Goods data={visibleData} 
        typeOfPage={typeOfPage} 
        onSelectFilter={this.onSelectFilter}
        onUpdateSearch={this.onUpdateSearch}
        onTogglePage={this.onTogglePage}/>
        <Footer color={'black'} onTogglePage={this.onTogglePage}/>
      </div>
    );
  }
}

export default App;
