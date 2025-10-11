import FallingStars from "./fallingStars";

export default function Decoration() {
  return (
    <div className="layout relative -z-10 -translate-y-10 opacity-70 select-none *:absolute rtl:-scale-x-100">
      <FallingStars />
      <div className="bg-decoration-accent/50 -top-24 left-0 size-80 rounded-br-full blur-[150px]"></div>
      <div
        className="border-t-decoration-secondary -top-16 size-0 -rotate-[40deg] border-x-[2rem] border-t-[16rem] border-x-transparent blur-[25px] ltr:left-16 rtl:left-16 rtl:max-sm:left-[5.5rem]"
        data-fade-2
      ></div>
      <div
        className="border-t-decoration-primary -top-16 size-0 -rotate-[40deg] border-x-[2rem] border-t-[11rem] border-x-transparent blur-[15px] ltr:left-3 rtl:left-3 rtl:max-sm:left-9"
        data-fade-4
      ></div>
      <div className="bg-decoration-accent/40 -top-32 left-full h-72 w-12 -rotate-45 rounded-tr-full rounded-bl-full blur-3xl max-sm:hidden"></div>
      <div className="bg-decoration-accent/40 -top-20 left-[120%] h-72 w-12 -rotate-45 rounded-tr-full rounded-bl-full blur-3xl max-sm:hidden"></div>
    </div>
  );
}
