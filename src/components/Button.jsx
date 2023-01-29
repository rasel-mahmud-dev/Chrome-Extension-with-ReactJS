import React from 'react' 




function Button({className="", ...attr}) { 

  return <button className={`btn ${className}`}  {...attr} />
}

export default Button