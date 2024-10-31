function log(level, message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
  try {
    fs.appendFileSync(logFilePath, logMessage);
  } catch (err) {
    console.error('Logging error:', err);
  }
}

function logError(error) {
  log('ERROR', error.message);
}
