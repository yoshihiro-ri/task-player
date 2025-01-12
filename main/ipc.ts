import { ipcMain } from 'electron';
import { addTask, getTasks } from './database';

ipcMain.handle('add-task', async (_, title: string) => {
  return addTask(title);
});

ipcMain.handle('get-tasks', async () => {
  return getTasks();
});