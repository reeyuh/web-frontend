"use client";

import { Sidebar, Header, PageHeader } from "@/components";

export default function MainLayout(props) {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="main-layout px-2 px-md-4 pb-2 pb-md-4">
        <PageHeader title="title" summary="summary" text={"Button"} />
      </div>
    </>
  );
}
