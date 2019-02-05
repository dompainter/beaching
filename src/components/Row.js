import React, { Fragment } from 'react'

const Row = ({ images }) => (
    <Fragment>
      {images.map((image, i) =>
        <div className="grid-column" key={i}>
          <img src={image} alt="grid-item" />
        </div>
      )}
  </Fragment>
)

export default Row