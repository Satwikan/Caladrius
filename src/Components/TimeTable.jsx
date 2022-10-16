import React from 'react'
//import Table from 'react-bootstrap/Table'

function TimeTable() {
    return (
        <div>
          
             <table className="styled-table hide "  >
       <tbody>
         <tr>
         <th>Time</th>
         <td>8.00-9.00</td>
         <td>9.00-10.00</td>
         <td>10.00-11.00</td>
         <td>11.00-12.00</td>
         <td>12.00-13.00</td>
         <td>13.00-14.00</td>
         <td>20.00-21.00</td>
         <td>21.00-22.00</td>
         
         </tr>
         <tr>
         <th>Subject</th>
         <td>Programming</td>
         <td>Algorithms</td>
         <td>Mechanics</td>
         <td>Electronics</td>
         <td>Mathematics</td>
         <td>Electromagnetics</td>
         <td>Compiler</td>
         <td>English</td>
         </tr>
        
           
         
       </tbody>
     </table>
     
        </div>
    )
}

export default TimeTable
