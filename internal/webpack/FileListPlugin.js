class FileListPlugin {
  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      let fileList = '';
      for (let fileName in compilation.assets) {
        if (/^index\S*(\.js|\.css)$/.test(fileName)) {
          fileList += `'${fileName}': ${compilation.assets[fileName].source()
            .length},\n`;
        }
      }

      compilation.assets['../../filelist.txt'] = {
        source: () => fileList,
        size: () => fileList.length,
      };

      callback();
    });
  }
}

export default FileListPlugin;
