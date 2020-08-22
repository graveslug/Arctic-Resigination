//==================
//  Default       //
//==================
//General layout of all pages
const React = require('react');

class Default extends React.Component {
    render() {
        return(
            <html>
                <head>
                    <meta name='viewport' content='width=device-width, initial-scale=1'></meta>
                    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css'/>
                    <title >Arctic Resignation</title>
                </head>
                <body className='is-family-monospace has-text-weight-light'>

                <nav className='navbar is-black' role='navigation' aria-label='main navigation'>
                    <div className='navbar-brand'>
                    <h3 className='mt-4 ml-4'>Arctic Resignation</h3>
                            <a role='button' className='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navMenu'>
                            <span aria-hidden='true'></span>
                            <span aria-hidden='true'></span>
                            <span aria-hidden='true'></span>
                        </a>
                    </div>
                    {/*Doesnt work but I wanted to keep it as a concept*/}
                    <div id='navMenu' className='navbar-menu'>
                        <div className='navbar-start'>
                            <a href='/records' className='navbar-item ml-2'>
                                || Return Home
                            </a>
                            <a href='/records/new' className='navbar-item'>
                                || submit record ||
                            </a>

                            <div className='navbar-item has-dropdown is-hoverable'>
                                <a className='navbar-link'>
                                More
                                </a>

                            <div className='navbar-dropdown'>
                                <a className='navbar-item'>
                                    About
                                </a>
                                <a className='navbar-item'>
                                    Submissions
                                </a>
                                <a className='navbar-item'>
                                    Contact
                                </a>
                            <hr className='navbar-divider'/>
                                <a className='navbar-item'>
                                    Report an issue
                                </a>
                            </div>
                            </div>
                        </div>
                    <div className='navbar-end'>
                        <div className='navbar-item'>
                            <div className='buttons'>
                                <a className='button'>
                                    Sign up
                                </a>
                                <a className='button'>
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                    </div>
                </nav>
                    {this.props.children}
                    <footer>

                    </footer>
                </body>
            </html>
        )
    }
}

module.exports = Default;
