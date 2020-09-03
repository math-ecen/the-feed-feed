import Head from 'next/head'
import { useState } from 'react'
import recipes from '../data/recipes.json'

function SearchBar(props){
	return (
		<div>
			<style jsx>{`
				div {
					padding: 5px 5px 5px 0px;
				}

				input {
					border-top: 0px;
					border-left: 0px;
					border-right: 0px;
					border-bottom: solid black 2px;
					font-size: 16pt;
					width: 100%;
					margin: 5px 0px;
					color: blue;
				}

				input::placeholder{
					color: rgba(0, 0, 255, 0.7);
				}
				
				input:focus,
				select:focus,
				textarea:focus,
				button:focus {
					outline: none;
				}
			`}</style>
			<input type="text" placeholder="Search" onChange={(e)=>props.setSearchBoxText(e.target.value)}/>
		</div>
	)
}

function RecipeCard({recipe}){
	const style ={
		"border": "solid black 1px", 
		"borderRadius": "8px",
		"padding": "12px 16px 12px 16px",
		"marginBottom": "30px"
	}

	const tags = recipe.ProductTags.split(',')
	const tagCards = tags.map((tag, i) =>
		<TagCard tag={tag} key={'tag'+i} />)

	return (
		<div style={style}>
			<style jsx>{`
				div {
					color: navy;
					position: relative;
				} 

				p {
					color: maroon;
				}

			`}
			</style>
			<h1>{recipe.Title || 'Recipe Title'}</h1>
			<img src={recipe.ImageUrl} style={{
				"width": "100%"
			}}/>
			<p>{recipe.SummaryDescription || 'No description'}</p>
			<div style={{
				"display": "flex",
				"flexWrap": "wrap"
			}}>
				{tagCards}
				
			</div>
			<div style={{
				"display": "flex",
				"flexWrap": "wrap",
				"marginTop": "10px"
			}}>
				Total time: {recipe.TotalTime || ''}
			</div>
		</div>
	)
}

function TagCard({tag}){
	const style ={
		//"border": "solid black 1px", 
		"backgroundColor": "rgba(0, 0, 255, 0.5)",
		"borderRadius": "8px",
		"padding": "5px",
		"margin": "5px 5px 5px 0px"
	}

	return (
		<div style={style}>
			<style jsx>{`
				div {
					color: maroon;
				} 

				span {
					color: white;
				}
			`}
			</style>
			<span>{tag || 'Tag'}</span>
		</div>
	)
}

export default function Index(){
	const [searchBoxText, setSearchBoxText] = useState('')

	const recipeCards = recipes.Results
		.filter(recipe => {
			let title = recipe.Recipe.Title.toLowerCase()
			return title.toLowerCase().includes(searchBoxText.toLowerCase().trim())
		})
		.map((recipe, i) => 
			<RecipeCard recipe={recipe.Recipe} key={'recipe'+i} />)

	return (
		<div style={{
			"boxSizing": "border-box",
			"display": "flex",
			"justifyContent": "center",
			"flexDirection": "column",
			"paddingLeft": "25vw",
			"paddingRight": "25vw",
			"overflowY": "hidden"
		}}>
			<Head>
				<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
			</Head>
			<style jsx>{`
				font-family: 'Roboto', sans-serif;
			`}</style>

			<div style={{
				"display": "flex",
				"flexDirection": "column"
			}}>
				<div>
					<h1>The Feed Feed</h1>
					<p style={{
						"margin": "0px"
					}}>
						Welcome to <b>The Feed Feed</b> where we bring you a catered selection
						of easy to prep, easy to eat meals. 
					</p>
					<div style={{
						"margin": "10px 0px"
					}}>
						<SearchBar setSearchBoxText={setSearchBoxText} />
					</div>
				</div>
				<div>
					{recipeCards}
				</div>
			</div>
		</div>
	)
}