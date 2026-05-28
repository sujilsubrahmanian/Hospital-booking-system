//import "./app.css";
import Layout from "./layout/Layout";
import ScrollToTop from "./components/ScrollToTop"; // Import it
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToastContainer } from "react-toastify";


//paypal
const initialOptions = {
  "client-id": "ATSO-VjpC-750td4pmkUmy4FGhEPZFA22NcahubsmWM7rECj2Wh5W2e9hlOuEBFzDkSTCGgOIY83jdA6",
  currency: "USD",
  intent: "capture",
};

function App() {
  return (
    <>
    <ScrollToTop /> {/* Always scrolls to top on route change */}
    <PayPalScriptProvider options={initialOptions}>
    <Layout/>
    </PayPalScriptProvider>
    <ToastContainer />
     
    </>
  );
}

export default App;
