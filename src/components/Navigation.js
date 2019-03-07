import React from 'react'
import classnames from 'classnames'

const Navigation = ({ activeBeach, beaches, handleBeachClick }) => (
  <div className="navigation">
    {beaches.map((beach, i) =>
      <div key={i} className={classnames('nav-item', { 'nav-item-active': activeBeach === beach.name})}>
        <span 
          key={i}
          onClick={() => handleBeachClick(beach)}
          style={{ 'fontFamily': beach.font}}
        >
          {beach.name}
        </span>
        {activeBeach === beach.name && <div className="active-blob">&nbsp;</div>}
      </div>
    )}
  </div>
)

export default Navigation