import Header from './components/Header';
import HeaderWithRefs from './components/HeaderWithRefs';
import Menu from './components/Menu';
import CartContextProvider from './store/CartContextProvider';

function App() {
  return (
    <>
      <CartContextProvider>
        {/* <Header /> */}
        <HeaderWithRefs />
        <Menu />
      </CartContextProvider>
    </>
  );
}

export default App;
