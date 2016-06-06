import React, { Component,PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index';
import { connect } from 'react-redux';

class App extends Component{
  constructor(props,context) {
		super(props)
	}

  render(){
    const { children } = this.props;
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
