const { ipcRenderer } = require('electron')
const maxResBtn = document.querySelector('#buttonSquare')
const ipc = ipcRenderer


// MINIMAZI APP
buttonRolleDown.addEventListener('click', () => {
    ipc.send('minimazeApp')
})

// MINIMAZI RESTORE APP
function changeMaxResBtn(isMaximizedApp){
    if(isMaximizedApp){
        maxResBtn.title = 'Restore'
        document.querySelector('.MaximizeBtn img').setAttribute('src', 'img/restore.svg')
    } else {
        maxResBtn.title = 'Maximize'
        document.querySelector('.MaximizeBtn img').setAttribute('src', 'img/square.svg')
    }
}
buttonSquare.addEventListener('click', () => {
    ipc.send('maximizeRestoreApp')
})
ipc.on('isMaximized', () => {
    changeMaxResBtn(true)
})
ipc.on('isRestored', () => {
    changeMaxResBtn(false)
})

// CLOSE APP
document.querySelector('#buttonClose').addEventListener('click', ()=>{
    ipc.send('closeApp')
})

addWidget.addEventListener('click', () => {
    if(document.querySelector('.widgetPanel').classList.contains('active')){
        document.querySelector('.widgetPanel').classList.remove('active')
    } else {
        document.querySelector('.widgetPanel').classList.add('active')
    }
})
