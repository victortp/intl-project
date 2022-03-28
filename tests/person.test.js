import mocha from 'mocha';
import chai from 'chai';
import Person from '../src/person.js';

const { describe, it } = mocha;
const { expect } = chai;

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '2 bike,boat,ferry 5000 2022-01-01 2022-02-01'
    );
    const expected = {
      from: '2022-01-01',
      id: '2',
      kmTraveled: '5000',
      to: '2022-02-01',
      vehicles: ['bike', 'boat', 'ferry']
    };

    expect(person).to.be.deep.equal(expected);
  });

  it('should return a formated person instance', () => {
    const formatedPerson = new Person({
      from: '2022-01-01',
      id: '2',
      kmTraveled: '5000',
      to: '2022-02-01',
      vehicles: ['bike', 'boat', 'ferry']
    }).formatted('pt-br');

    const expected = {
      from: '01 de janeiro de 2022',
      id: 2,
      kmTraveled: '5.000 km',
      to: '01 de fevereiro de 2022',
      vehicles: 'bike, boat e ferry'
    };

    expect(formatedPerson).to.be.deep.equal(expected);
  });
});
