interface Props {
  amount: number;
  className: string;
}

const FormatedPrice = ({ amount, className }: Props) => {
  const formatedPrice = new Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return <span className={className}>{formatedPrice}</span>;
};

export default FormatedPrice;
