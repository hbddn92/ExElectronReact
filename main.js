const {app, BrowserWindow} = require('electron') 
const url = require('url') 
const path = require('path')
const {ipcMain} = require('electron')
const {dialog} = require('electron')
const fs = require('fs') 

let win  

function createWindow() { 
	win = new BrowserWindow({width: 800, height: 600}) 
	win.loadURL(url.format ({ 
		pathname: path.join(__dirname, 'index.html'), 
		protocol: 'file:', 
		slashes: true 
	})) 
}

ipcMain.on('asynchronous-message', (event, arg) => {
	console.log(arg)
	event.sender.send('asynchronous-reply', 'Message from ipcMain: ' + arg)
})

// Show dialog

ipcMain.on('showDialog', (event, path) => {
	dialog.showOpenDialog(function (fileNames) { 
		// fileNames is an array that contains all the selected 
		if(fileNames === undefined) { 
			console.log("No file selected"); 

		} else { 
			readFile(fileNames[0]); 
		}
	});

	function readFile(filepath) { 
		fs.readFile(filepath, 'utf-8', (err, data) => { 

			if(err){ 
				alert("An error ocurred reading the file :" + err.message) 
				return 
			} 

		// handle the file content 
		event.sender.send('fileData', data) 
	})
	} 
})

app.on('ready', createWindow) 