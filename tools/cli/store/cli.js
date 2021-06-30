class CliStore {

  isVerbose = true;

  constructor() {
    this.isVerbose = process.argv.includes('--verbose');
  }
}

let store;


module.exports = {
  getCliStore() {
    if (!store) {
      store = new CliStore();
    }
    return store;
  }
}
