//==================
//  Edit page      //
//==================
//Sets up the page for editing in browser

const React = require('react');
const Default = require('./components/Default.jsx');

class Edit extends React.Component {
            render() {
                const item = this.props.vinyls
                return (
                        <Default>
                            <div>
                                <h1>Edit page</h1>
                                <form action={`/records/$item._id}?_method=PUT`} method='POST'>
                                    Name: <input type='text' name='name' value={item.name} />
                                    <br />
                                    Album: <input type='text' name='album' value={item.album} />
                                    <br />
                                    Image: <input type='text' name='image' value={item.image} />
                                    <br />
                                    Vinyl Colour: <input type='text' name='vinylColor' />
                                    <br />
                                    Price: <input type='number' name='price' value={item.price}/>
                                    <br/>
                                    Quantity: <input type='number' name='currentQuantity' />
                                    <br />
                                    Description: <input type='text' name='description' value={item.description} />
                                    <br />
                                    In Stock: <input type='checkbox' name='inStock' onchecked='default' />
                                    <br />
                                    <input className='button is-outline is-small' type='submit' name=' value='Submit' />
                                    <a href={`/records/`}>Back to store</a><br/>
                                </form>
                            </div>
                        </Default>
                        )
                    }
                }
module.exports = Edit;
