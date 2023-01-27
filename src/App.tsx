import { Canvas } from "./Components/ui/Canvas/Canvas";
import Icon from "./Components/ui/Icon/Icon";
import { MovableProvider } from "./Components/util/MovableContext";

export type TMoveState = {
  isMoving: boolean
}

function App() {
return (
    <MovableProvider>
      <Icon />  
      <Icon />  
      <Canvas />
    </MovableProvider>
  );
}

export default App;
