function Spinner({ fullScreen = false }: { fullScreen?: boolean }) {
  return (
    <div
      className={`border-red flex items-center justify-center ${fullScreen ? 'h-screen' : ''}`}
    >
      <div
        className="animate-spin-colors inline-block h-12 w-12 rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-current motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !border-0 !p-0 !whitespace-nowrap ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}

export default Spinner;
