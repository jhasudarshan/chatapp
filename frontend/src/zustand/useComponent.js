import { create } from "zustand"

const useComponent = create((set) => ({
    component: 'UserChats',
    setComponent: (component) => set({ component }),
}));

export default useComponent;