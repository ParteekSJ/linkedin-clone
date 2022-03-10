import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "@app/store";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;

//
