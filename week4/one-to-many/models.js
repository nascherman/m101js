class CityFactory {
    constructor(cities) {
        this.cities = cities ||
            [
                {
                    name: 'Toronto',
                    code: 'TOR'
                },
                {
                    name: 'New York',
                    code: 'NYC'
                },
                {
                    name: 'Shangai',
                    code: 'CSH'
                },
                {
                    name: 'Tokyo',
                    code: 'TOK'
                },
                {
                    name: 'Melbourne',
                    code: 'MEL'
                }
            ];
    }

    createCities(cities) {
        cities = cities || this.cities;
        let cityCollection = [];

        cities.forEach(city => {
            cityCollection.push(
                new City(city.code, city.name)
            );
        });

        return cityCollection;
    }
}

class PersonFactory {
    constructor(people) {
        this.people = people || ['Jane', 'John', 'Steven', 'Mary', 'Joseph', 'Clark', 'Rebecca', 'Alex',
            'Constance', 'Taylor', 'Yateh', 'Karen', 'Catie', 'George'];
    }

    createPersonsFromCities(cities, noPersonsPerCity) {
        let personCollection = [];

        cities.forEach(city => {
            for (let i = 0; i < noPersonsPerCity; i++) {
                personCollection.push(
                    this.createRandomPerson(city.code)
                );
            }
        });

        return personCollection;
    }

    createRandomPerson(cityCode) {
        return new Person(
            this.people[Math.floor(Math.random() * this.people.length - 1)],
            cityCode
        );
    }
}

class City {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
}

class Person {
    constructor(name, cityCode) {
        this.name = name;
        this.cityCode = cityCode;
    }
}

module.exports = {
    CityFactory,
    PersonFactory
};