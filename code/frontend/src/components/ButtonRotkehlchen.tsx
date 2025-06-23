import "./buttonRotkehlchen.css";

interface ButtonPrimaryProps {
  style: "primary" | "secondary";
  label: string;
  onClick?: () => void;
}

export default function ButtonPrimary({ style, label, onClick }: ButtonPrimaryProps) {
  return (
    <>
      {style === "primary" && (
        <button
          type="submit"
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
