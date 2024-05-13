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
        <h1>My App</h1>
        {headerRightButton}
      </header>
      <main>{children}</main>
    </>
  );
};
