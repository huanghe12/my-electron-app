// app模块控制应用程序的生命周期
// BrowserWindow模块创建和管理应用程序窗口
const { app, BrowserWindow } = require('electron')
const path = require('path')

// 将 index.html 加载进一个新的 BrowserWindow 实例
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // __dirname: 字符串指向当前正在执行脚本的路径(本例中.指向项目的根文件夹)
      // path.join: API 将多个路径联结在一起,创建一个跨平台的路径字符串
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

// 只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口
// 通过使用 app.whenReady() API来监听此事件,在 whenReady() 成功后调用 createWindow()
app.whenReady().then(() => {
  createWindow()

  // 监听 app 模块的 activate 事件, 如果没有任何浏览器窗口是打开的,则调用 crateWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 监听 app 模块的 'window-all-closed', 如果用户不是在 macOS(darwin) 上运行程序,调用 app.quit()
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})