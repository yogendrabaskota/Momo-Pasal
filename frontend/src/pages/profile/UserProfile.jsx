import { Link } from "react-router-dom";

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 mt-20">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          User Dashboard
        </h1>
        <p className="mt-2 text-gray-600">Manage your account and activities</p>
      </div>

      {/* Dashboard Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* My Orders Card */}
        <Link
          to="/myorders"
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden hover:border-indigo-200 flex flex-col h-full"
        >
          <div className="p-6 flex-1">
            <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              My Orders
            </h3>
            <p className="text-gray-500 text-sm">
              View and track your order history
            </p>
          </div>
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-indigo-600 text-sm font-medium">
            View all orders →
          </div>
        </Link>

        {/* My Order QRs Card */}
        <Link
          to="/myorderqrs"
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden hover:border-purple-200 flex flex-col h-full"
        >
          <div className="p-6 flex-1">
            <div className="bg-purple-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Order QRs
            </h3>
            <p className="text-gray-500 text-sm">
              Access your digital order QR codes
            </p>
          </div>
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-purple-600 text-sm font-medium">
            View QR codes →
          </div>
        </Link>

        {/* Account Settings Card */}
        <Link
          to="/account-settings"
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden hover:border-blue-200 flex flex-col h-full"
        >
          <div className="p-6 flex-1">
            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Account Settings
            </h3>
            <p className="text-gray-500 text-sm">
              Update your profile and preferences
            </p>
          </div>
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-blue-600 text-sm font-medium">
            Manage account →
          </div>
        </Link>

        {/* Favorites Card */}
        <Link
          to="/favorites"
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden hover:border-pink-200 flex flex-col h-full"
        >
          <div className="p-6 flex-1">
            <div className="bg-pink-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-pink-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Favorites
            </h3>
            <p className="text-gray-500 text-sm">Your saved favorite items</p>
          </div>
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-pink-600 text-sm font-medium">
            View favorites →
          </div>
        </Link>

        {/* Order History Card */}
        <Link
          to="/order-history"
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden hover:border-green-200 flex flex-col h-full"
        >
          <div className="p-6 flex-1">
            <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Order History
            </h3>
            <p className="text-gray-500 text-sm">
              Complete history of your purchases
            </p>
          </div>
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-green-600 text-sm font-medium">
            View history →
          </div>
        </Link>

        {/* Payment Methods Card */}
        <Link
          to="/payment-methods"
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden hover:border-yellow-200 flex flex-col h-full"
        >
          <div className="p-6 flex-1">
            <div className="bg-yellow-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Payment Methods
            </h3>
            <p className="text-gray-500 text-sm">
              Manage your saved payment options
            </p>
          </div>
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-yellow-600 text-sm font-medium">
            Manage payments →
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
