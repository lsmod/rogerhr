import { Outlet } from "react-router-dom";

import PageWrapper from "./PageWrapper";

const PageLayout = () => {
  return (
    <PageWrapper>
      <Outlet />
    </PageWrapper>
  );
};

export default PageLayout;
