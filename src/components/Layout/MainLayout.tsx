import { Link } from "react-router-dom";

type MainLayoutProps = {
  children: React.ReactNode;
  headerRightButton?: React.ReactNode;
};

export const MainLayout = ({
  children,
  headerRightButton,
}: MainLayoutProps) => {
  return (
    <>
      <header>
        <Link to='/'>
          <h1>My App</h1>
        </Link>
        {headerRightButton}
      </header>
      <main>{children}</main>
    </>
  );
};
