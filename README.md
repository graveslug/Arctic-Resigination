# arctic-resigination
store front concept/practice on skills to develop a full fledge web store Back to front

#Toolbox
Javascript
HTML
Bulma
Node
express
React view components
MongoDB
mongoose
Node



#Climbing over roadblocks
1) Heroku was not interacting with my server. The issue came to be a nuance difference between how the mac terminal acts with Github/Heroku. Heroku and Github see a difference between capital letters while mac's terminal assumes they are one of the same. So when I changed the capitalization of a file (as I use mac OS) it assumed it as the same and did not register a difference in the file name change. When I deleted the file and pushed to github the removal of the file then created a new one with the correct lowercase letters and pushed that to github it saw the file difference and accepted the change. In short: renaming a file on mac os doesn't catch capitalization changes in file names. The fix is to remove the file and upload a new one.

2) I realized how the server interacts between files. The server.js contains a single controller imported from the controllers file. This single controller has an address that we do not rewrite anywhere else because if we do repeat its address muiltiple in different controllers times it will stack, for example, record/record/:id instead of record/:id.

3) make sure to target the _id instead of the name when wanting to delete a page.

4) edit page was interesting to fix. I had a slight route problem where *Vinyl.findById(req.params._id, (error, vinyl)* should've been written as *Vinyl.findById(req.params.id, (error, vinyl)* being the under score in *_id*. This fixed one problem. The other problem was how I was handling the button/link for edit. Instead of the following:
<form action={`/records/${oneVinyl._id}/edit`} method='POST'>
<input className='button' type='submit value={`EDIT`} /> </form> which was only causing a form action to take place and not actually bring me to the edit page. Which is to say that I was only redirecting myself back to my records page instead of my edit page due to the show route setup. So I changed the previous to the following: <a href={`/records/${oneVinyl._id}/edit`}>Edit</a> This simply links me to the edit page of the current id.
