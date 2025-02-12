import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value);
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
};

contextBridge.exposeInMainWorld("ipc", handler);

contextBridge.exposeInMainWorld("electron", {
  updateStatus: (status: boolean) => {
    ipcRenderer.send("update-bounds", status);
  },
  getStatus: () => ipcRenderer.invoke("get-status"),
  on: (channel: string, callback: any) => ipcRenderer.on(channel, callback),
  off: (channel: string, callback: any) => ipcRenderer.removeListener(channel, callback),
});

declare global {
  interface Window {
    taskPlayer: {
      updateStatus: (status: boolean) => void;
      getStatus: () => boolean;
    };
  }
}

export type IpcHandler = typeof handler;
