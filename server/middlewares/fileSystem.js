const path = require('path');
const fs = require('fs');
const appDir = path.dirname(require.main.filename);

exports.getFilesInPath = (req, res) => {
    const relpath = path.join(`${appDir}/data`, req.body.path);
    fs.readdir( relpath, (error, items)=>{
      let dir = {
        files: [],
        directories: []
      };

      for (let i=0;i<items.length;i+=1){
        let item = items[i];
        let isDirectory = fs.lstatSync(path.join(relpath, item)).isDirectory();
        if (isDirectory) dir.directories.push(item)
        else dir.files.push(item);
      }

      res.send(JSON.stringify(dir));
    });
};

exports.getFile = (req, res) => {
  const querypath = req.query.path;
  const file = path.join(`${appDir}/data`, querypath);
  res.sendFile(file);
};
