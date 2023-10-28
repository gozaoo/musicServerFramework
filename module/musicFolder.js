import chokidar from 'chokidar'
import file from './file.js'
export default {
    addPath
}

function addPath(path) {
    if (!await fs.existsSync(path)) { //不存在就跑路
      return false
    }

    const watcher = chokidar
    
}