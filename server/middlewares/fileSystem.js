const path = require('path');
const fs = require('fs');
const appDir = path.dirname(require.main.filename);

exports.getFilesInPath = (req, res) => {
    const relpath = path.join(`${appDir}/data`, req.body.path);
    fs.readdir( relpath, (error, items)=>{
      console.log('READ DIR', items);
      res.send(JSON.stringify({
        files: [],
        directories: []
      }));
    });

};
