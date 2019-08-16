function createEmployeeRecord(array) {
	return {
		firstName: array[0],
	    familyName: array[1],
	    title: array[2],
	    payPerHour: array[3],
		timeInEvents: [],
		timeOutEvents: []
	}
}

function createEmployees(array) {
	let ar_obj = []
	array.forEach(emp => ar_obj.push(createEmployeeRecord(emp)))
	return ar_obj
}

function createTimeInEvent(emp, datestamp) {
	emp.timeInEvents.push({type: "TimeIn", hour: parseInt(datestamp.split(" ")[1]), date: datestamp.split(" ")[0]})
	return emp
}

function createTimeOutEvent(emp, datestamp) {
	emp.timeOutEvents.push({type: "TimeOut", hour: parseInt(datestamp.split(" ")[1]), date: datestamp.split(" ")[0]})
	return emp
}

function hoursWorkedOnDate(emp, date) {
	let inTime = emp.timeInEvents.find(d => (d.type == "TimeIn" && d.date === date)).hour
	let outTime = emp.timeOutEvents.find(d => d.type == "TimeOut" && d.date === date).hour
	return (outTime/100 - inTime/100)
}

function wagesEarnedOnDate(emp, date) {
	return hoursWorkedOnDate(emp, date) * emp.payPerHour
}

function allWagesFor(emp) {
	return emp.timeInEvents.reduce((sum, day) => sum + wagesEarnedOnDate(emp, day.date), 0)
}

function calculatePayroll(array) {
	return array.reduce((sum, emp) => sum + allWagesFor(emp), 0)
}

function createEmployeeRecords(array) {
	return array.map(ar_obj => createEmployeeRecord(ar_obj))
}


function findEmployeebyFirstName(srcArray, firstName) {
	return srcArray.find(obj => obj.firstName == firstName)
}

