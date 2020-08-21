//==================
//  New           //
//==================
//Form submission for client

const React = require('react');
const Default = require('./components/Default')

class New extends React.Component {
  render() {
    return (
        <Default>
            <div ClassName='container'>
                <h1>New Product page</h1>
                {/*Didn't get a chance to edit this page to match the rest of the site but it was going to be a table setup through bulma. The page submission does work so thats a fine and it does push into mongo so double win there.*/}
                <form action='/vinyls' method='POST'>
                      Name: <input type='text' name='name' />
                      <br />
                      Album: <input type='text' name='album' />
                      <br />
                      Image: <input type='text' name='image' />
                      <br />
                      Vinyl Color: <input type='text' name='vinylColor' />
                      <br />
                      Price: <input type='number' name='price' />
                      <br/>
                      Quantity: <input type='number' name='currentQuantity' />
                      <br />
                      Description: <input type='text' name='description' />
                      <br />
                      In Stock: <input type='checkbox' name='inStock' onChange='defaultChecked' />
                      <br />
                      <input className='button is-outline is-small' type='submit' name='' value='Submit' />
                      <a href={`/vinyls/`}>Back to store</a><br/>
                </form>
            </div>
      </Default>
    );
  }
}

module.exports = New;
