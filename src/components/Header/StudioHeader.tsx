import Link from "next/link";

interface StudioHeaderProps {
  renderDefault: (props: StudioHeaderProps) => JSX.Element;
}

const StudioHeader: React.FC<StudioHeaderProps> = (props) => {
  return (
    <div>
      <div className="flex justify-between items-center p-3 bg-slate-200">
        <Link
          href="/"
          className="bg-slate-100 p-2 rounded-md hover:bg-accent hover:text-white duration-300"
        >
          back to home page
        </Link>
        <h1 className="text-black text-2xl md:text-3xl font-bold hover:text-lightOrange transition-colors duration-300 cursor-pointer">
          SHOPPERS
        </h1>
        <h1>Admin Studio Shoppers for online platform</h1>
      </div>
      {/* Call renderDefault with props */}
      {props.renderDefault ? props.renderDefault(props) : null}
    </div>
  );
};

export default StudioHeader;
