const Header = () => {
  return (
    <div className="w-[80%] md:w-full flex flex-col items-center justify-center gap-4 mb-10 text-center">
      <h1 className="text-4xl md:text-5xl font-bold sm:hidden">
        Notarization
        <br />
        on-chain
      </h1>
      <h1 className="text-4xl md:text-5xl font-bold hidden sm:flex">
        Notarization on-chain
      </h1>
      <p>
        Secure your data with a click. No technical skills needed, just enter
        your data
        <br /> and it is registered on the Ethereum blockchain in seconds
      </p>
    </div>
  );
};

export default Header;
