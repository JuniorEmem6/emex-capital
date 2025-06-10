import { useEffect } from 'react';

const TradingViewChart = ({ symbol = "EURUSD", theme = "dark", interval = "D", width = "100%", height = 600 }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        width,
        height,
        symbol,
        interval,
        timezone: "Etc/UTC",
        theme,
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tradingview_container"
      });
    };
    document.getElementById("tradingview_container").innerHTML = ""; // Clear on rerender
    document.getElementById("tradingview_container").appendChild(script);
  }, [symbol, theme, interval, width, height]);

  return (
    <div id="tradingview_container" />
  );
};

export default TradingViewChart;
