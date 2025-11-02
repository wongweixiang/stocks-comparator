import RatioSection from './RatioSection';
import StockSection from './StockSection';

function App() {
  return (
    <div className="w-full flex flex-col items-center m-5">
      <h1>Stocks Comparison</h1>
      <div className="flex flex-col md:flex-row gap-4 m-4">
        <StockSection stockNo="1" />
        <StockSection stockNo="2" />
      </div>
      <RatioSection />
    </div>
  );
}

export default App;
