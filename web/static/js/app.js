import React from 'react'
import '../stylesheets/app.scss'
import Router from 'react-router'
import routes from './routes/routes'

// bootstrap entire application and render into DOM
React.render(
	<Router routes={routes}/>, 
	document.getElementById('react')
)
