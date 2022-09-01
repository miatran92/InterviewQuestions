 import { data } from "../data/data";

 // FUNC => EXPECTED OUTPUT
function getEmployeesComp() {
    let employeesComp = [];
    // Iterate through each employee
    data.employeeData.forEach(e => {
      let emp = getHours(e, e.employee, data.jobMeta);
      employeesComp.push(emp);
    })
    return employeesComp;
  }

  // LOGIC GOES HERE 
function getHours(employee, name, jobData) {
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
        if (t.job === val.job){
          diff = (new Date(t.end) - new Date(t.start))/(1000*60*60);
          basePay = val.rate;
          total = total + diff;
          benefitTotal = benefitTotal + diff*val.benefitsRate;
          // define time type
          if ( total > 40 ) {
            reg = 40;
            if ( total <= 48 ) {
              overtime = total - 40;
              multiplier = 1.5;
            } else if ( total > 48 ) {
              overtime = 8;
              doubletime = total - 48;
              multiplier = 2;
            }
          } else {
            reg = total;
          }
          wageTotal = wageTotal + diff*basePay*multiplier;
        }
      })
    })
    return { name, reg, overtime, doubletime, wageTotal, benefitTotal };
  }
  export { getEmployeesComp };