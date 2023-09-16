import { Sidebar, Header } from "@/components";

export default function MainLayout(props) {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="main-layout">{props.children}</div>
    </>
  );
}
