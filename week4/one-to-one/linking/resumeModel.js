class ResumeFactory {
    constructor() {}

    createResume() {
        return {
            job: getRandomJobs(),
            education: getRandomEducation()
        }
    }

    createResumes(noResumes) {
        let resumes = [];
        for (let i = 0; i < noResumes; i++) {
            resumes.push(this.createResume());
        }

        return resumes;
    }
}

function getRandomJobs() {
    const jobs = [
        'Carpenter', 'Contruction', 'Workman', 'Rocket Scientist', 'Fisherman',
        'Farmer', 'Engineer', 'Data analyst', 'Businessman', 'Politician'
    ];

    return jobs[getRandomWholeNumber(0, jobs.length - 1)];
}

function getRandomEducation() {
    const education = [
        'College', 'HighSchool', 'Primary', 'University', 'Doctoral', 'Masters'
    ];

    return education[getRandomWholeNumber(0, education.length - 1)];
}

function getRandomWholeNumber(min = 0, max = 0) {
    return Math.floor(Math.random() * (max - min) + min)
}

module.exports = ResumeFactory;