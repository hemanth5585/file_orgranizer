//to take input from javaScript
let inputArr = process.argv.slice(2);
let path = require('path');
let fs = require('fs');
const { type } = require('os');
let types;
types = {
    media: ["mp4", "mkv", "jpg", "png", "jpeg"],
    archives: ["zip"],
    document: ['docx', 'xlsx', 'pdf', 'txt', 'jpg'],
    app: ['exe', 'msi', 'dmg', 'pkb']
}
/* 
    console.log(inputArr);
    node main.js tree "directoryPath"
    node main.js organize "directoryPath"
    node main.js help
*/
let command = inputArr[0];
//console.log(command);
switch (command) {
    case "tree":
        treeFun(inputArr[1]);
        break;
    case "organize":
        organizeFun(inputArr[1]);
        break;
    case "help":
        help();
        break;
    default:
        console.log(`Invalid Command !
        type "help" for more commands `);
        break;
}
function treeFun(dirPath) {
    console.log("Implementing Tree function ", dirPath);
}


function organizeFun(dirPath) {
    let destPath;
    if (dirPath == undefined) {
        console.log("Enter Path");
        return;
    }
    else {
        let doesExsist = fs.existsSync(dirPath);
        if (doesExsist) {
            let destPath = path.join(dirPath, "organized_files");
            let check = fs.existsSync(destPath);
            if (check == false) {
                fs.mkdirSync(destPath);
            }
            organizeHelper(dirPath, destPath);
        }
        else {
            console.log("Enter a valid path");
            return;
        }

    }
}
function organizeHelper(src, dest) {
    let childName = fs.readdirSync(src);
    /*
        media, doc, arch, app
    */
    for (let i = 0; i < childName.length; i++) {
        let childAddress = path.join(src, childName[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            //console.log(childName[i]);
            let category = getCategory(childName[i]);
            //console.log(childName[i], "Belongs to ", category);
            console.log(dest);
            sendFiles(childAddress, dest, category);
        }
    }
}
function sendFiles(src, dest1, category) {
    //console.log(dest1);
    let categorypath = path.join(dest1, category);
    let doesExsist1 = fs.existsSync(categorypath);
    if (!doesExsist1) {
        fs.mkdirSync(categorypath);
    }
    let fileName = path.basename(src);
    let desTpath = path.join(categorypath, fileName);
    fs.copyFileSync(src, desTpath);
    console.log("Filed Copied");
}

function getCategory(s) {
    let exetension = path.extname(s);
    exetension = exetension.slice(1);
    for (let i in types) {
        let x = types[i];
        //console.log(i);
        for (let j in x) {
            if (x[j] == exetension) {
                return i;
            }
        }
    }
    return "other";
}

function help(dirPath) {
    console.log("Here are all the commands");
    console.log(`
    node main.js tree "directoryPath"
    node main.js organize "directoryPath"
    node main.js help
    `);
}