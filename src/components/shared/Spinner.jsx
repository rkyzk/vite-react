const Spinner = () => {
  return (
    <div
      className="h-6 w-6 animate-spin rounded-full border-4 border-solid
       border-current border-e-transparent align-[-0.125em] text-surface
       motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white
       text-zinc-600"
      role="status"
    ></div>
  );
};

export default Spinner;
