import { useState } from 'react';
import { useEffect } from 'react';
import {getEmployeesComp}  from '../../utils/utils'
import './Main.scss'

function Main() {
  const [employeeData, setEmployeeData] = useState()

    useEffect(() => {
      const response = getEmployeesComp();
      setEmployeeData(response)
    }, [])
  return (
    <div className="mainContainer">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Regular</th>
              <th>Overtime</th>
              <th>Doubletime</th>
              <th>Total Wage</th>
              <th>Total Benefit</th>
            </tr>
          </thead>
          <tbody>
            {employeeData?.map((e) => 
            <tr key={e.name}>
              <td>{e.name}</td>
              <td>{e.reg.toFixed(2)}</td>
              <td>{e.overtime}</td>
              <td>{e.doubletime.toFixed(2)}</td>
              <td>{e.wageTotal.toFixed(2)}</td>
              <td>{e.benefitTotal.toFixed(2)}</td>
            </tr>
            )}
          </tbody>
        </table>
    </div>
  )
}
export default Main