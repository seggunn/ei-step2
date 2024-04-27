class Logger {
	constructor(name) {
    this.name = name;
  }

  log(message){
	  console.log(`[${this.name}] ${message}`);
  }
  warn(message){
		console.warn(`[${this.name}] ${message}`);
  }
  error(message, err){
		console.error(`[${this.name}] ${message}`, err?.stack);
  }
}

module.exports = new Logger();