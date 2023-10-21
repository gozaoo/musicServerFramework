import file from "./module/file.js";
// const express = require('express');
import express from "express";

file.getMusicFiles('./music/').then(
    value =>{
        console.log(value);
        file.editorMusicTag(value[0].path,{
            title: '色彩',
            artist: 'yama',
            album: ''
        })
    }
)

