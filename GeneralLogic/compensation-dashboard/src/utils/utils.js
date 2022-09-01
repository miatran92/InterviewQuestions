 import { data } from "../data/data";
 console.log(data)
 // FUNC => EXPECTED OUTPUT
function getEmployeesComp(){
    let employeesComp = [];
    //Iterate through each employee
    data.employeeData.forEach(e => {
      let emp = getHours(e, e.employee, data.jobMeta)
      employeesComp.push(emp)
    })
    // console.log(employeesComp)
    return employeesComp;
  }

  // LOGIC GOES HERE 
  function getHours(employee, name, jobData){
    let total = 0,
    reg = 0,
    overtime = 0,
    doubletime = 0,
    wageTotal = 0,
    benefitTotal = 0,

    diff = 0,
    multiplier = 1,
    basePay = 0

    // iterate through timepunch to get the diff & match base & bene rates
    employee.timePunch.forEach((t) => {
      jobData.forEach((val) => {
        // console.log(val)
        if (t.job === val.job){
          diff = Math.abs(new Date(t.end) - new Date(t.start))/3600000;
          basePay = val.rate
          total = total + diff;
          benefitTotal = benefitTotal + diff*val.benefitsRate
          //define time type
          if ( total > 40 ) {
            reg = 40
            if ( total <= 48 ) {
              overtime = total - 40
              multiplier = 1.5
            } else if ( total > 48 ) {
              overtime = 8;
              doubletime = total - 48
              multiplier = 2
            }

          } else {
            reg = total
          }
          wageTotal = wageTotal + diff*basePay*multiplier
          // console.log('shifts', diff, 'base', basePay,'total', total, 'multiplier', multiplier, 'beneTotal', benefitTotal)
        }
      })
    })
    // console.log(name, reg, overtime, doubletime, wageTotal, benefitTotal)
    return { name, reg, overtime, doubletime, wageTotal, benefitTotal }

  }

  export { getEmployeesComp };