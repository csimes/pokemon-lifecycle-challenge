import React, { Component} from 'react'
import './PokeFetch.css';
class PokeFetch extends Component {
    constructor() {
        super();
        this.state = {
            pokeInfo: "",
            pokeSprite: "",
            pokeName: "",
            seconds: ""
        }
    }

    timer() {
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;
      if ( seconds > 0 ) {
        this.setState(({ seconds }) => ({ seconds: seconds - 1 }))
      } 
        }, 1000) 
    }

    componentDidMount() {
        let min = Math.ceil(1);
        let max = Math.floor(152);
        let pokeNum = Math.floor(Math.random() * (max - min) + min);
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    pokeInfo: res,
                    pokeSprite: res.sprites.front_default,
                    pokeName: res.species.name,
                });
            })
            .catch((err) => console.log(err));
            this.timer()
    }



    componentWillUnmount() {
        clearInterval(this.seconds);
    }
  


    render() {
      const { seconds } = this.state
        return (
          ( seconds !== 0 ? 
            (<div className={"wrapper"}>
                <button
                    className={"start"}
                    onClick={() => {
                      this.setState({ seconds: 10 });
                    }}
                >
                    Start!
                </button>
                <h1 className={"timer"}>{this.state.seconds}</h1>
                <div className={"pokeWrap"}>
                    <img
                        alt=""
                        className={"pokeImg"}
                        style={{filter: "brightness(0%)"}}
                        src={this.state.pokeSprite}
                    />
                    <h1 className={"pokeName"} style={{display: 'none'}}>{this.state.pokeName}</h1>
                </div>
              </div>)
            : (<div className={"wrapper"}>
                <button
                    className={"start"}
                    onClick={() => {
                      this.setState({ seconds: 10 });
                    }}
                >
                    Start!
                </button>
                <h1 className={"timer"}>{this.state.seconds}</h1>
                <div className={"pokeWrap"}>
                    <img
                        alt=""
                        className={"pokeImg"}
                        src={this.state.pokeSprite}
                    />
                    <h1 className={"pokeName"}>{this.state.pokeName}</h1>
                </div>
            </div>))
            
        );
    }
}

export default PokeFetch;
