var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({

	apiKey: '066c18b8a5345befe86bca1e8a292465',

	getInitialState: function(){
		return {searchStr:"", searchUrl:""};
	},

	handleChange: function(e){
		this.setState({searchStr: e.target.value});	
	},

	onKeyDown: function(e){
		 if (e.key === 'Enter' && this.state.searchStr !== '') {
      var searchUrl = "search/multi?query=" + this.state.searchStr + "&api_key=" + this.apiKey;
      this.setState({searchUrl:searchUrl});
	}
},

	render: function(){

		return (
			<div>
				<header className="Head">
					<Navi />
					<div id="search" className="Search">
						<input onKeyDown={this.onKeyDown} onChange={this.handleChange} type="search" value={this.state.searchStr} placeholder="Search or choose from below!"/>
					</div>
				</header><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
	<Titles	title="Search Results" url={this.state.searchUrl} />
				<Actor />
				
				<Titles title="Top TV pickups" url='discover/tv?sort_by=popularity.desc&page=1' />
				<Titles title="Trending" url='discover/movie?sort_by=popularity.desc&page=1' />
				<Titles title="Sci-Fiction" url='genre/878/movies?sort_by=popularity.desc&page=1' />
				<Titles title="Laughter" url='genre/35/movies?sort_by=popularity.desc&page=1' />
				<Titles title="Horrorified" url='genre/27/movies?sort_by=popularity.desc&page=1' />
				
			
			</div>
			);
	}
});


var Navi = React.createClass({
	render: function(){
		return(
			<div id='navi' className='Navi'>
			<nav>
				<ul>
					<li>More</li>
					<li>List</li>
					<li>Top Choices</li>
					<li>New</li>
				</ul>
			</nav>
			</div>
		);
	}
});


var Actor = React.createClass({

	render: function(){
		return (
			<div id='actor' className='Actor' style={{backgroundImage: 'url(http://images2.itechpost.com/data/images/full/34329/the-big-bang-theory-season-10-spoilers-news-and-updates-shatner-offended-shows-producers-kicked-him-out-of-the-series.jpg)'}}>
				<div className='content'>
					<img className='logo' src="https://s.yimg.com/dh/ap/default/150929/the_big_bang_theory_logo.png"/>
					<h2>Season 10!</h2>
					
					<div className="buttons">
						<ActorB primary={true} text="Watch now" />
					</div>
				</div>
				<div className='overlay'></div>
				</div>
		);
	}
});

var ActorB = React.createClass({

	render: function(){
		return (
			<a href='https://www.themoviedb.org/tv/1418-the-big-bang-theory' className='Button' data-primary={this.props.primary}>{this.props.text}</a>
		);
	}
})

var Titles = React.createClass({
	apiKey: '066c18b8a5345befe86bca1e8a292465',

	getInitialState: function(){
		return {data: [], received: false};
	},

	load: function(){
		var rUrl='https://api.themoviedb.org/3/' + this.props.url + '&api_key=' + this.apiKey;

		fetch(rUrl).then((response)=>{
			return response.json();
		}).then((data)=>{
			this.setState({data: data});
		}).catch((err)=>{
			console.log('ERR');
		});
	},

	componentWillReceiveProps: function(nextProps){
			if(nextProps.url !== this.props.url && nextProps.url !== ""){
					this.setState({received:true, url:nextProps.url},()=>{
						this.load();
					});
			}
		},

	componentDidMount: function(){
		if(this.props.url !== ""){
			this.load();
			this.setState({received:true});
		}
	},

	render: function() {
    var titles ='';
    if(this.state.data.results) {
      titles = this.state.data.results.map(function(title, i) {
        if(i < 5) {
          var name = '';
          var backDrop = 'http://image.tmdb.org/t/p/original' + title.backdrop_path;
          if(!title.name) {
            name = title.original_title;
          } else {
            name = title.name;
          }

          return (
            <Items key={title.id} title={name} score={title.vote_average} overview={title.overview} backdrop={backDrop} />
          );  

        }else{
          return (<div key={title.id}></div>);
        }
      }); 

    } 
    
    return (
      <div ref="titlecategory" className="Titles" data-loaded={this.state.received}>
        <div className="Title">
          <h1>{this.props.title}</h1>
          <div className="titles-wrapper">
            {titles}
          </div>
        </div>
      </div>
    );
  }

});


var Items = React.createClass({
	render: function() {
		return (
			<div className="Item" style={{backgroundImage: 'url(' + this.props.backdrop + ')'}} >
				<div className="overlay">
					<div className="title">{this.props.title}</div>
					<div className="rating">{this.props.score} / 10</div>
					<div className="plot">{this.props.overview}</div>
					<Toggle />
				</div>
			</div>
		);
	}
});

var Toggle = React.createClass({
	getInitialState: function() {
		return({ toggled: false })
	},
	
	handleClick: function() {
		if(this.state.toggled === true) {
			this.setState({ toggled: false });
		} else {
			this.setState({ toggled: true });	
		}
		
	},
	render: function() {
		return (
			<div onClick={this.handleClick} data-toggled={this.state.toggled} className="ListToggle">
				<div>
					
				</div>
			</div>
		);
	}
});

module.exports= App;



























