import database from './../database.json' assert { type: 'json' };
import Person from './person.js';
import TerminalController from './terminalController.js';
import Repository from './repository.js';
import fs from 'fs';

const DEFAULT_LANG = 'pt-br';
const STOP_TERM = ':q';

const terminalController = new TerminalController();
const { pathname: databaseFile } = new URL('./../database.json', import.meta.url);
const repository = new Repository(databaseFile, fs.promises);
terminalController.initTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question('');

    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      return;
    }

    const person = Person.generateInstanceFromString(answer);
    terminalController.updateTable(person.formatted(DEFAULT_LANG));
    await repository.save(person);

    return mainLoop();
  } catch (error) {
    console.log('error', error);
    return mainLoop();
  }
}

await mainLoop();
