type Props = {
  text: string;
  children: React.ReactNode;
};

export const Tooltip = ({ children, text }: Props) => {
  return (
    <div className='tooltip-container'>
      {children}
      <span className='tooltip-text'>{text}</span>
    </div>
  );
};
