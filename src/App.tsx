import { Canvas } from "./Components/ui/Canvas/Canvas";
import Icon from "./Components/ui/Icon/Icon";

export type TMoveState = {
  isMoving: boolean
}

function App() {
return (
    <>
      <Icon />  
      <Icon />  
      <Canvas />
    </>
  );
}

export default App;
