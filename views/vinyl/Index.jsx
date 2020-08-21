//==================
//  Index         //
//==================
//the framework of the main page.
//Landing page

const React = require('react');
const Default = require('./components/Default')

class Index extends React.Component {
  render() {
      const vinyls = this.props.vinyl
    return (
        <Default>
          <div>

            <div className='container'>
            <h1 className='ml-4 mt-4 title is-4 has-text-weight-light'> Records of Sorrow </h1>
              {vinyls.map((record, i) => {
                return (
                  <div className='card is-inline-block mt-1 mx-3 box px-0 pt-0' style={{width: 270}} key={record._id}>
                <div className='card-image'>
                    <figure className='image is-4by3'>
                    <a href={`/records/${record._id}`}><img src={`${record.image}`} /></a>
                   </figure>
                </div>

                <div className='card-content'>
                    <p className='title is-6'>
                     {record.name}
                     </p>
                     <p className='subtitle is-7'>${record.price}</p>
                     <p className='subtitle is-7'>{record.inStock
                       ? ` - In Stock`
                       : ` - Out of Stock`}</p>
                </div>

                  </div>
                );
              })}
            </div>
          </div>
          </Default>
    );
  }
}

module.exports = Index;
