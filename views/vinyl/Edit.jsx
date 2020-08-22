//==================
//  Edit page      //
//==================
//Sets up the page for editing in browser

const React = require('react');
const Default = require('../components/Default.jsx');

class Edit extends React.Component {
            render() {
                const item = this.props.vinyl
                return (
                        <Default>
                            <div>
                                <h1>Edit page</h1>
                                <form action={`/records/${item._id}?_method=PUT`} method='POST'>
                                    Name: <input type='text' name='name' defaultValue={item.name} />
                                    <br />
                                    Album: <input type='text' name='album' defaultValue={item.album} />
                                    <br />
                                    Image: <input type='text' name='image' defaultValue={item.image} />
                                    <br />
                                    Vinyl Colour: <input type='text' name='vinylColor' />
                                    <br />
                                    Price: <input type='number' name='price' defaultValue={item.price}/>
                                    <br/>
                                    Quantity: <input type='number' name='currentQuantity' defaultValue={item.currentQuantity} />
                                    <br />
                                    Description: <input type='text' name='description' defaultValue={item.description} />
                                    <br />
                                    In Stock: <input type='checkbox' name='inStock' onchecked='default' />
                                    <br />
                                    <input className='button is-outline is-small' type='submit' name='' value='Submit' />
                                    <a href={`/records/`}>Back to store</a><br/>
                                </form>
                            </div>
                        </Default>
                        )
                    }
                }
module.exports = Edit;
