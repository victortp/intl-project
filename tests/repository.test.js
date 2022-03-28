import mocha from 'mocha';
import chai from 'chai';
import sinon from 'sinon';
import Repository from '../src/repository.js';
import fs from 'fs';

const { describe, it } = mocha;
const { expect } = chai;

describe('Repository', () => {
  let repository;
  let sandbox;

  before(() => {
    repository = new Repository('', fs.promises);
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should read the database file', async () => {
    const mockedDb = [
      {
        id: 1,
        vehicles: ['bike', 'boat', 'ferry'],
        kmTraveled: 10000,
        from: '2009-01-01',
        to: '2020-11-26'
      }
    ];

    sandbox.stub(repository, 'readFile').resolves(JSON.stringify(mockedDb));

    const result = await repository.readDb();

    expect(repository.readFile.calledOnce).to.be.ok;
    expect(result).to.be.deep.equal(mockedDb);
  });

  it('should save the database file', async () => {
    sandbox.stub(repository, 'writeFile').resolves();

    await repository.saveDb();

    expect(repository.writeFile.calledOnce).to.be.ok;
  });

  it('should update the database file', async () => {
    const mockedDb = [
      {
        id: 1,
        vehicles: ['Motorcycle', 'Car', 'Truck'],
        kmTraveled: 10000,
        from: '2009-01-01',
        to: '2020-11-26'
      }
    ];

    const newItem = {
      id: 2,
      vehicles: ['ship'],
      kmTraveled: 1100000,
      from: '2022-01-01',
      to: '2022-11-26'
    };

    const expected = [
      {
        id: 1,
        vehicles: ['Motorcycle', 'Car', 'Truck'],
        kmTraveled: 10000,
        from: '2009-01-01',
        to: '2020-11-26'
      },
      newItem
    ];

    sandbox.stub(repository, 'readFile').resolves(JSON.stringify(mockedDb));
    sandbox.stub(repository, repository.saveDb.name).resolves();

    await repository.save(newItem);

    expect(repository.readFile.calledOnce).to.be.ok;
    expect(repository.saveDb.calledOnce).to.be.ok;
    expect(repository.currentData).to.be.deep.equal(expected);
  });
});
