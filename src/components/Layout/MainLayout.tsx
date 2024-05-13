type MainLayoutProps = {
  children: React.ReactNode;
  headerRightButton?: React.ReactNode;
};

export const MainLayout = ({
  children,
  headerRightButton,
}: MainLayoutProps) => {
  return (
    <main className='main-layout'>
      <header className='main-layout__header'>
        <h1>My App</h1>
        {headerRightButton}
      </header>
      <div className='main-layout__content'>{children}</div>
    </main>
  );
};
