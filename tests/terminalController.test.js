import mocha from 'mocha';
import chai from 'chai';
import sinon from 'sinon';
import TerminalController from '../src/terminalController.js';
import readLine from 'readline';
import chalk from 'chalk';

const { describe, it } = mocha;
const { expect } = chai;

describe('terminalController', () => {
  let terminalController;
  let sandbox;

  before(() => {
    terminalController = new TerminalController();
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should initialize the terminal and call initTable', () => {
    sandbox.spy(terminalController, terminalController.initTable.name);

    terminalController.initTerminal([], 'pt-br');

    expect(terminalController.initTable.calledOnce).to.be.ok;
    expect(terminalController.terminal).to.be.instanceOf(readLine.Interface);
  });

  it('should return the table options', () => {
    const expected = {
      leftPad: 2,
      columns: [
        { field: 'id', name: chalk.cyan('ID') },
        { field: 'vehicles', name: chalk.magenta('Vehicles') },
        { field: 'kmTraveled', name: chalk.cyan('Km Traveled') },
        { field: 'from', name: chalk.cyan('From') },
        { field: 'to', name: chalk.cyan('To') }
      ]
    };

    const result = terminalController.getTableOptions();

    expect(result).to.be.deep.equal(expected);
  });

  it('should initialize the table', () => {
    const mockedDb = [
      {
        id: '2',
        vehicles: ['bike', 'boat', 'ferry'],
        kmTraveled: '5000',
        from: '2022-01-01',
        to: '2022-02-01'
      }
    ];

    const expected = [
      {
        id: 2,
        vehicles: 'bike, boat e ferry',
        kmTraveled: '5.000 km',
        from: '01 de janeiro de 2022',
        to: '01 de fevereiro de 2022'
      }
    ];

    terminalController.initTable(mockedDb, 'pt-br');

    expect(terminalController.data).to.be.deep.equal(expected);
  });

  it('should close the terminal', () => {
    sandbox.spy(terminalController.terminal, terminalController.terminal.close.name);

    terminalController.closeTerminal();

    expect(terminalController.terminal.close.calledOnce);
  });

  it('should update the data and print', () => {
    const mockedData = {
      id: 2,
      vehicles: 'bike, boat e ferry',
      kmTraveled: '5.000 km',
      from: '01 de janeiro de 2022',
      to: '01 de fevereiro de 2022'
    };

    terminalController.initTable([], 'pt-br');
    terminalController.updateTable(mockedData);

    expect(terminalController.data).to.be.deep.equal([mockedData]);
  });

  it('should return a promise', () => {
    sandbox.spy(terminalController.terminal, terminalController.terminal.question.name);

    const result = terminalController.question();

    expect(terminalController.terminal.question.calledOnce).to.be.ok;
    expect(result instanceof Promise).to.be.ok;
  });
});
