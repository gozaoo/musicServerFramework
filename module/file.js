export default {
    getMusicFiles,
    editorMusicTag
}

import {parseFile} from "music-metadata";

import fs from 'fs';
import path from "path";
import NodeID3 from "node-id3";

// 白名单音乐文件后缀
const musicExtensions = ['.mp3', '.wav', '.flac'];

// 递归读取文件夹
async function getMusicFiles(dir) {

    const files = fs.readdirSync(dir);
  
    let musicFiles = [];
  
    for (let file of files) {
  
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
  
      if (stat.isDirectory()) {
        // 递归读取子文件夹
        await getMusicFiles(filePath);
      } else if (musicExtensions.includes(path.extname(filePath))) {
        // 是音乐文件,加到结果数组
        await parseFile(filePath).then(info => {
          musicFiles.push({
            path: filePath,
            ...info
          });
        })
      }
    }
  
    return musicFiles;
  
  }

async function editorMusicTag(file, tags){
    NodeID3.write(tags,file)
}
async function readMusicTag(path) {
    try {
        const metadata = await parseFile(path)
        return metadata
    } catch (error) {
        console.log(error);
    }
}
