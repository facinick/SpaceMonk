function Center({ children }: { children: React.ReactNode }): JSX.Element {
    return (
      <div className="flex" style={{ justifyContent: 'center', alignItems: 'center' }}>
        {children}
      </div>
    );
  }

  export {
    Center
};
