const { contextBridge, ipcMain } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getToken: () => ipcMain.invoke('api:get-token')
});
