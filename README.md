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
