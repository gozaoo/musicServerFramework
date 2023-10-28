export default {
    getMusicFiles,
    editorMusicTag,
    data: {
      saveObject,
      readObject
    }
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
            fileName: file,
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

// 保存对象函数  
async function saveObject(name, object) {  
  // 检测 data 文件夹是否存在，如果不存在则创建  
  const dataFolderPath = './data';  
  if (!await fs.existsSync(dataFolderPath)) {  
    await fs.mkdirSync(dataFolderPath);  
  }
  
  // 在 data 文件夹写入一个文件名字为 name.json 的文件  
  const filePath = path.join(dataFolderPath, `${name}.json`);  

  // if (!await fs.existsSync(filePath)) {  
  //   await fs.mkdirSync(filePath);  
  // }

  fs.writeFileSync(filePath, JSON.stringify(object));  
 }
 
 // 读取对象函数  
 function readObject(name) {  
  // 获取 data 文件夹下名字为 name.json 的文件  
  const filePath = path.join('./data', `${name}.json`);
  // 读取文件内容并转换成对象  
  const object = JSON.parse(fs.readFileSync(filePath));
  // 返回对象  
  return object;  
 }