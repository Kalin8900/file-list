const express = require('express');
const fs = require('fs');
require('dotenv').config();
const cors = require('cors');

const checkDir = (path, omitFileTypes) => {
  const files = fs.readdirSync(path).filter((file) => !omitFileTypes.includes(file.split('.').pop()));

  return {
    files,
    count: files.length,
    path
  };
};

const main = async () => {
  const app = express();
  app.use(cors());
  const port = process.env.PORT ?? 8080;

  const checkDirPath = process.env.CHECK_DIR_PATH;

  if (!checkDirPath) throw new Error('No directory provided');

  const omitFileTypes = process.argv[2].split(',');

  app.get('/', (req, res) => {
    const dir = checkDir(checkDirPath, omitFileTypes);

    res.send(dir);
  });

  app.listen(port, () => {
    console.log(`File-list app listening at http://localhost:${port}`);
  });
};

main();
