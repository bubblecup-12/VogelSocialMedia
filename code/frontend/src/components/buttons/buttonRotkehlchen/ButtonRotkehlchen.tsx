import "./buttonRotkehlchen.css";

interface ButtonPrimaryProps {
  style: "primary" | "secondary";
  label: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function ButtonPrimary({ style, label, type, onClick }: ButtonPrimaryProps) {
  return (
    <>
      {style === "primary" && (
        <button
          type={type}
          className="button-primary body-m"
          onClick={onClick}
        >
          {label}
        </button>
      )}
      {style === "secondary" && (
        <button
          type="button"
          className="button-secondary body-m"
          onClick={onClick}
        >
          {label}
        </button>
      )}
    </>
  );
}
