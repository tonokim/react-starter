import React, { Component,PropTypes } from 'react';


class App extends Component{
  constructor(props,context) {
		super(props)
	}

  render(){
    return(
      <div>
        {React.cloneElement(children, {key: location.key})}
      </div>
    )
  }
}

App.contextTypes = {
	router: React.PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
	user:state.user
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
