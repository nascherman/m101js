class EmployeeFactory {
    constructor() {};

    /**
     * Creates an employee for each resume id
     * @param resumeIds - an array of resume ids
     */
    createEmployees(resumeIds) {
        let emps = [];
        for (let i = 0; i < resumeIds.length; i++) {
            let emp = new Employee(getRandomName(), resumeIds[i]);

            emps.push(emp);
        }

        return emps;
    }
}

class Employee {
    constructor(name, resumeId) {
        this.name = name;
        this.resumeId = resumeId;
    }
}

function getRandomName() {
    const names = [
        'Sheila', 'Steve', 'Josh', 'George', 'Amy', 'Alex', 'Shaun', 'Terry', 'Wilson',
        'Rebecca', 'Samantha'
    ];

    return names[Math.floor(Math.random() *  names.length - 1)];
}

module.exports = EmployeeFactory;