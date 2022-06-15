import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../app/store";

interface IRenderProps {
  children: React.ReactNode;
}

const RenderWrapper: React.FC<IRenderProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};
export default RenderWrapper;
