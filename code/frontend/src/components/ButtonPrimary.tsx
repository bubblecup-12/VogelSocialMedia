import "./buttonPrimary.css";

interface ButtonPrimaryProps {
  value: string;
  onClick?: () => void;
}

export default function ButtonPrimary({ value, onClick }: ButtonPrimaryProps) {
  return (
    <button
      type="submit"
      className="login-button body-m"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
