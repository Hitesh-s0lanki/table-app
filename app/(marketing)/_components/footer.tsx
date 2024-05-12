const Footer = () => {
  return (
    <footer className="bg-gray-800 w-full py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center text-sm text-gray-400">
          <p>© 2024 DataSharp Analytics. All rights reserved.</p>
          <p>
            Contact us:{" "}
            <a
              href="mailto:info@datasharp.com"
              className="text-blue-500 hover:underline"
            >
              info@datasharp.com
            </a>
          </p>
          <p>Privacy Policy | Terms of Use</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
