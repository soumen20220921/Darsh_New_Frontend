import { useState, useEffect } from "react";
export const AccountInfo = () => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    joinDate: "",
    lastLogin: ""
  });

  useEffect(() => {
    const email = localStorage.getItem("email") || "user@example.com";
    const name = localStorage.getItem("name") || "User Name";
    
    setUserData({ email, name });
  }, []);


  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl shadow-xl w-full max-w-4xl mx-auto my-6 border border-indigo-100">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Profile Information
        </h2>
        <div className="flex items-center gap-2 text-sm text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Online</span>
        </div>
      </div>


        

        <div className="lg:col-span-1 space-y-6">
          <div className="p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-lg font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
               
                  <div className="px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-sm">
                    {userData.name}
                  </div>
              
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Account Type</label>
                <div className="px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-sm">
                  Standard User
                </div>
              </div>
            </div>
            
           
          </div>

          <div className="p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-lg font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email Address or Ph no.</label>
                <div className="px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-sm">
                  {userData.email}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Email address or Ph no. verified</span>
              </div>
            </div>
          </div>
        </div>
      

      {/* Footer Welcome Section */}
      <div className="mt-6 sm:mt-8 p-5 bg-gradient-to-r animate-bounce from-indigo-50 to-purple-50 rounded-2xl shadow-inner border border-indigo-100">
        <p className="text-indigo-700 text-sm sm:text-base font-medium text-center">
          Welcome back, <span className="font-bold">{userData.name}</span>!  
          Your profile is secured and up-to-date.
        </p>
      </div>
    </div>
  );
};

export default AccountInfo;