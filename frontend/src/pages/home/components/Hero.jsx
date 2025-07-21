const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative" style={{ backgroundColor: "#FFF8F0" }}>
        <div className="container mx-auto px-6 pt-24 md:px-12 lg:pt-20 lg:px-7">
          <div className="flex flex-wrap items-center px-2 md:px-0">
            <div className="relative lg:w-6/12 lg:py-24 xl:py-32">
              <h1
                className="text-4xl font-bold md:text-5xl lg:text-6xl lg:w-10/12 mb-6"
                style={{ color: "#2D3142" }}
              >
                Your favorite dishes,{" "}
                <span style={{ color: "#E63946" }}>right at your door</span>
              </h1>

              <form action="" className="w-full mt-8">
                <div
                  className="relative flex p-1 rounded-xl shadow-lg"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #FFE66D",
                  }}
                >
                  <select
                    className="hidden p-3 rounded-xl md:block md:p-4 mr-2 focus:outline-none"
                    name="domain"
                    id="domain"
                    style={{
                      backgroundColor: "#FFF8F0",
                      color: "#2D3142",
                      border: "1px solid #FFE66D",
                    }}
                  >
                    <option value="design">FastFood</option>
                    <option value="development">Restaurant</option>
                    <option value="marketing">Marketing</option>
                  </select>
                  <input
                    placeholder="Your favorite food"
                    className="w-full p-4 focus:outline-none"
                    type="text"
                    style={{
                      color: "#2D3142",
                    }}
                  />
                  <button
                    type="button"
                    title="Start buying"
                    className="ml-auto px-8 py-3 text-center transition rounded-lg hover:shadow-md"
                    style={{
                      backgroundColor: "#E63946",
                      color: "white",
                    }}
                  >
                    <span className="font-semibold">Search</span>
                  </button>
                </div>
              </form>

              <p
                className="mt-8 lg:w-10/12 text-lg"
                style={{ color: "#2D3142" }}
              >
                Discover amazing flavors delivered fast.{" "}
                <a
                  href="#"
                  className="font-medium hover:underline"
                  style={{ color: "#E63946" }}
                >
                  Order now
                </a>{" "}
                and enjoy your meal in minutes.
              </p>

              <div className="flex mt-12 space-x-4">
                <div className="flex items-center">
                  <div
                    className="p-2 rounded-full"
                    style={{ backgroundColor: "#FFE66D" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="#E63946"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="ml-2" style={{ color: "#2D3142" }}>
                    Fast Delivery
                  </span>
                </div>
                <div className="flex items-center">
                  <div
                    className="p-2 rounded-full"
                    style={{ backgroundColor: "#FFE66D" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="#E63946"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="ml-2" style={{ color: "#2D3142" }}>
                    Fresh Meals
                  </span>
                </div>
              </div>
            </div>

            <div className="ml-auto lg:w-6/12">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  className="relative rounded-xl shadow-xl w-full max-w-lg mx-auto"
                  alt="Delicious food"
                  loading="lazy"
                  width="800"
                  height="800"
                />
                <div
                  className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full -z-10"
                  style={{ backgroundColor: "#FFE66D" }}
                ></div>
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full -z-10"
                  style={{ backgroundColor: "#E63946", opacity: 0.2 }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
