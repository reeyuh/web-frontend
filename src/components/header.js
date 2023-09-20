import "@/styles/header.scss";

export const Header = () => {
  return (
    <div className="header d-flex px-md-4 justify-content-between align-items-center flex-row-reverse">
      <div className="header-right flex-column">
        <p className="header-icon mb-0 rounded-circle">MK</p>
        <p className="header-text m-0 mt-1">User Name User Name User Name</p>
      </div>
    </div>
  );
};
