import { useRef } from "react";
import { Canvas } from "./Components/ui/Canvas/Canvas";
import Icon from "./Components/ui/Icon/Icon";

function App() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  return (
    <>
      <Icon ref={ref1} />  
      <Icon ref={ref2} />  
      <Canvas
        movableItems={[ref1,ref2]}
      />
    </>
  );
}

export default App;
