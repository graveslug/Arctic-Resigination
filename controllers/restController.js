module.exports = function({Model, ViewPath, Router, booleanKey, /*pluralizedViewPath*/}) {
    //keeps the path plural for the sake of consistency.
    //const plural = pluralizedViewPath || ViewPath.toLowerCase() +'s'

    //The Routes
    //INDEX
    Router.get('/', (req, res) => {
        //finds all models within Model
        Model.find({}, (error, allModels) =>{
            //renders the pat to index
            res.render(`${ViewPath}/Index`, {
                [ViewPath]: allModels
            })
        })
    })

    //NEW
    Router.get('/new', (req, res) => {
        res.render(`${ViewPath}/New`)
    })

    //DELETE
    Router.delete('/:id', (req, res) => {
        //takes the current model by id and removes it from the collection
        Model.findByIdAndRemove(req.params.id, (error, model) =>{
            res.redirect(`/${ViewPath}`)
        })
    })

    //UPDATE

    Router.put ('/:id', (req, res) => {
        booleanKey.forEach((key) => {
            req.body[key] = req.body[key] === 'on' ? true : false
        })
        //update the current document with the model
        Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true },
            (error, updatedModel) =>{
                res.redirect(`/${ViewPath}`)
            }
        )
    })
    //CREATE

    Router.post('/', (req, res) => {
        booleanKey.forEach((key) => {
            req.body[key] = req.body[key] === 'on' ? true : false
        })
        //Creates the Model for t
        Model.create(req.body, (error, createdModel) => {
            //hits up the client once created
            res.redirect(`/${ViewPath}`)
        })
    })

    //EDIT
    Router.get('/:id/edit', (req, res) => {
        //Finds the document in the collection
        Model.findById(req.params.id, (error, foundModel) => {
            //renders the edit view and passes the found path
            res.render(`${ViewPath}/Edit`, {
                [ViewPath] :foundModel,
            })
        })
    })

    //SHOW
    Router.get('/:id', (req, res) => {
        //Find the specific document by id
        Model.findById(req.params.id, (error, foundModel) =>{
            //render the show route and pass it the foundModel
            res.render(`${ViewPath}/Show`, {
                [ViewPath]: foundModel,
            })
        })
    })
    return Router
}
