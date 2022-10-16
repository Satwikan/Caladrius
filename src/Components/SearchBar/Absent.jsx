import React from 'react'

function Absent(props) {
    return (
        <div>
          <ul>
          {props.list.map(function(item) {
           return <li key={item}>{item}</li>;
          })}
         </ul>  
        </div>
    )
}

export default Absent
