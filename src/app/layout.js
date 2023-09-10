import "../styles/global.scss";

export const metadata = {
  title: {
    template: "%s | TrueNil",
    default: "TrueNil",
  },
};

export default function RootLayout(props) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
