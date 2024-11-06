import Link from "next/link";

const StudioHeader = (props: any) => {
  return (
    <div>
      <div className="flex justify-between items-center p-3 bg-slate-200 ">
        <Link
          href={"/"}
          className="bg-slate-100 p-2 rounded-md hover:bg-accent hover:text-white duration-300"
        >
          back to home page
        </Link>
        <h1 className="text-black text-2xl md:text-3xl font-bold hover:text-lightOrange transition-colors duration-300 cursor-pointer">
          SHOPPERS
        </h1>
        <h1>Admin Studion Shoppers for onlone paltform</h1>
      </div>
      {props.renderDefault(props)}
    </div>
  );
};

export default StudioHeader;
