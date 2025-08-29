const fs = require("fs");
const path = require("path");

const getRandomExtension = () => {
  const randomExtensions = ["jpeg", "pdf", "mp3", "json", "svg", "mp4", "doc"];
  const randomInd =  Math.floor(Math.random() * randomExtensions.length);
  return randomExtensions[randomInd];
}

if(process.argv[2] === 'create') {
  const folderPath = path.join(__dirname, "test");
  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if(err) throw err;

    for(let i = 1; i <= 50; ++i) {
      const fileName = path.join(folderPath, `${i}.${getRandomExtension()}`);
      fs.writeFile(fileName, null, (err) => {
        if(err) throw err;
      });

      console.log("50 files with the random extensions are created")
    }
  })
} else if(process.argv[2] === "organize") {
  const folderPath = path.join(__dirname, "result");
  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if(err) throw err;

    fs.readdir(path.join(__dirname, "test"), { withFileTypes: true }, (er, files) => {
      if(er) throw er;

      files.forEach(file => {
        const extension = path.extname(file.name).slice(1);
        const oldPath = path.join(__dirname, "test", file.name);
        const newPath = path.join(folderPath, extension, file.name);

        fs.mkdir(path.join(folderPath, extension), { recursive: true }, (err) => {
          if(err) throw err;

          fs.rename(oldPath, newPath, (err) => {
          })
        })
      })
    })
  })
}

