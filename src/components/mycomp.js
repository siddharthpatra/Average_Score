import React, {Component} from 'react';
import Data from './data';
import Search from './search';
import '../App.css'

export default class mycomp extends Component {
    constructor (props) {
        super(props);
        this.change = this.change.bind(this);
        this.search = this.search.bind(this);
        this.renderSuggestions = this.renderSuggestions.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.suggestionSelected= this.suggestionSelected.bind(this);
        this.renderScore = this.renderScore.bind(this);
        this.scoreSelected = this.scoreSelected.bind(this);
        this.scoreSearch = this.scoreSearch.bind(this);
        this.state ={
            value: "TestData",
            data: [
                ["Pakistan", 23],
                ["Pakistan", 127],
                ["India", 3],
                ["India", 71],
                ["Australia", 31],
                ["India", 22],
                ["Pakistan", 81],
            ],
            suggestions: [],
            text: '',
            score: [],
            scoreSelected: null,
            scoreText: ''
        }
    }
   async change(e) {
       await this.setState({
            value: e.target.value
        })
        if(this.state.value === "TestData"){
            await this.setState({
                 data: [
                     ["Pakistan", 23],
                     ["Pakistan", 127],
                     ["India", 3],
                     ["India", 71],
                     ["Australia", 31],
                     ["India", 22],
                     ["Pakistan", 81],
                 ]
             })
         }
         if(this.state.value === "ServerData"){
            await fetch('https://assessments.reliscore.com/api/cric-scores/')
             .then(res => res.json())
             .then(json => {
                 this.setState({
                     data: json
                 })
             })
         }
    }
    renderInput () {
        let scoreRange = 2*this.state.scoreSelected;
        if(this.state.scoreSelected !== null){
            return <input type="range" value={scoreRange} min="10" max="500"/>
        }
        else return null;
    }
    search(e) {
        if (e.target.value.length === 0){
            this.setState({
                suggestions: [],
                text: '',
                score: [],
                scoreSelected: null,
                scoreText: ''
            })
        }
        else {
            const regex= new RegExp(`^${e.target.value}`,'i');
            this.setState({
                suggestions: this.state.data.sort().filter(v => regex.test(v)),
                text: e.target.value
            })
        }
    }
   async suggestionSelected (value) {
       await this.setState({
            text: value,
            score: this.state.suggestions.map(items => items[1]),
            suggestions: []
        })
    }
    renderSuggestions () {
        if(this.state.suggestions.length > 0){
            return <ol>
            {this.state.suggestions.map((items, index) => <li key={items.toString()} onClick={()=>this.suggestionSelected(items[0])}>{items[0]}</li>)}
        </ol>
        }
    }
    renderScore () {
        if(this.state.score.length > 0 && this.state.scoreText.length === 0)
        return <ol>
        {this.state.score.map(items => <li key={items.toString()} onClick={()=>this.scoreSelected(items)}>{items}</li>)}
    </ol>
        else return null
    }
    scoreSelected (value) {
        this.setState({
            scoreSelected: value,
            scoreText: value
        })
    }
    scoreSearch (e) {
        if (e.target.value.length === 0){
            this.setState({
                scoreText: '',
                scoreSelected: null
            })
        }
        else {
            this.setState({
                scoreText: e.target.value
            })
        }
    }
    render () {
        return (
            <div>
                <Data change={this.change} value={this.state.value}/>
                <Search search={this.search} datas={this.renderSuggestions} textvalue={this.state.text} 
                    renderInput={this.renderInput} score={this.renderScore} 
                    scorevalue={this.state.scoreText} searchscore={this.scoreSearch}/>
            </div>
        )
    }
}