# Ecologi developer challenge

## Sam Vargas


## Brief

Welcome to the Ecologi developer interview challenge. This mini project is very similar to what you’ll be building for the actual Ecologi web application on a daily basis, and is designed to give me an insight into how you’d work with our stack.
The build create a React micro site for displaying statistics about Ecologi tree planting.
The main thing I’m looking for is a chart displaying the number of trees planted per day since launch. Bonus points for beingable to filter the view to specific times (e.g. only show the last month of tree planting). Your application should fetch the data from this API endpoint: https://x.api.ecologi.com/trees
If you’re fluent with TypeScript please use it, if not just use standard JS.

Please email me a public Github repository link after around 3 hours of development which includes a README.md with some basic instructions to get the project up and running on my machine. You can also include any changes/optimisations to the API data structure you’d make if this was a production build.


### Running the solution

`git clone git@github.com:svargas-dev/ecologi-challenge.git && cd ecologi-challenge`  
`$ yarn`  
`$ yarn dev`  


### What's the stack?

- Next.js (I noticed this is what Ecologi are using)
- d3.js
- TypeScript  


### What would I do if I had more time?

- Select date range - I was really hoping to have time to do this to see the data more clearly but my day job got in the way
- Tests: ideally I would have written tests with jest + testing-library
- Get fancier with d3 and make it look prettier but it was my first time using it
- Consider accessibility

