export default class Repository {
  constructor(databaseFile, { readFile, writeFile }) {
    this.currentData = [];
    this.databaseFile = databaseFile;
    this.readFile = readFile;
    this.writeFile = writeFile;
  }

  async save(data) {
    this.currentData = await this.readDb();
    this.currentData.push(data);
    await this.saveDb();
  }

  async readDb() {
    const currentData = JSON.parse(await this.readFile(this.databaseFile));

    return currentData;
  }

  async saveDb() {
    await this.writeFile(this.databaseFile, JSON.stringify(this.currentData));
  }
}
