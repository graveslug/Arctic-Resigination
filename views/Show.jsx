//==================
//  Show          //
//==================
//Single vinyl page

const React = require('react')
const Default = require('./components/Default')

class Show extends React.Component {
  render() {
      const oneStock = this.props.oneStock
      const vinyl = this.props.vinyl
    return (
        <Default>
      <div className='container box'>
      {/*type error that says it cannot read the name of undefined. Line below which is odd because the name does render. It seems to be correlated with the edit button.*/}
        <h1 className='title is-4 has-text-weight-light'>{vinyl.name}</h1>
        <div className='subtitle is-5'>{vinyl.album}</div><br/>
        <br/>

        <div className='card-image'>
            <figure className='image is-400x400'>
            <img src={`${vinyl.image}`} />
           </figure>
        </div>

            <div className='card-content'>
            <div>${vinyl.price}</div>
            <br/>
            <p>{vinyl.vinylColor}</p>
            <br/>
            <a className='button is-outline is-small' href={`/arcticresigination/${vinyl.name}`}>Add To Cart</a>
            <br />
            <br />
            <p>{vinyl.currentQuantity} Copies left</p><
            br/>
                <p>{vinyl.inStock
                    ? ` - in stock`
                    : ` - out of Stock`}
                </p>
                <br/>
                <p>{vinyl.description}</p>
                <br/>

            </div>
      {/*Needs the logic to deincrement current stock by clicks. I'm thinking make an empty array and push each number into the array then adding the sum of all numbers. Make sure to derender the button too. It looks like this logic will be handled in JSX. Perhaps elsewhere too. Start in the server.js*/}


          <a href={`/arcticresigination/`}>Back to store</a><br/>
          {/*Doesn't delete the page. I haven't looked deeper into the why part*/}
          <form action={`/arcticresigination/${vinyl.name}?_method=DELETE`} method='POST'><input className='button' type='submit' value={`DELETE`} disabled/></form>
          {/*This is the edit button. I've tried changing the put method part to a few different things but nothing turned up. For both the above and below i've tried ${vinyl._id} and also without the underscore. Redirects client to the same page. */}
           <form action={`/arcticresigination/${vinyl._id}?_method=EDIT`} method='PUT'><input className='button' type='submit' value={`EDIT`} /></form>
      </div>
      </Default>
    )
  }
}
module.exports = Show
