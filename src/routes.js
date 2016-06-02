import React,{Component} from 'react';
import App from './containers/App';

// Home
import Home from './containers/Home'


export const RouterConfig = [
	{
		path: '/',
		component: App,
		indexRoute:{ component: Home },
		childRoutes: [
			{path: 'home', component: Home},
		]
	}
];
