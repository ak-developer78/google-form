
import React from 'react';

const SuccessScreen: React.FC = () => {
  return (
    <div className="min-h-screen py-8 px-4 flex flex-col items-center animate-fadeIn">
      <div className="w-full max-w-2xl">
        <div className="rounded-lg overflow-hidden border border-gray-300 bg-white shadow-sm">
          {/* Form Header Accent */}
          <div className="h-2.5 bg-[#673ab7]"></div>
          
          <div className="p-6 md:p-10">
            <h1 className="text-3xl font-normal text-black mb-6">Job Application Form</h1>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-900 leading-relaxed">
                Your response has been recorded. In 24 hours we will contact with you.
              </p>
              
              <div className="pt-6 border-t border-gray-100">
                <p className="text-[#673ab7] text-sm cursor-not-allowed opacity-60">
                  Submit another response
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  You've already responded to this form.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real Google Forms Footer Call to Action */}
        <div className="mt-4 flex flex-col items-center space-y-4">
          <div className="bg-white border border-gray-300 rounded-md px-6 py-4 flex flex-col items-center w-full shadow-sm">
            <p className="text-sm text-gray-600 mb-3">This form was created inside of Comhard Technologies PVT LTD.</p>
            <button className="flex items-center space-x-2 border border-gray-300 rounded px-6 py-2 hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
              <svg className="w-5 h-5 text-[#673ab7]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,3H5C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3M19,19H5V5H19V19M7,10H17V12H7V10M7,14H12V16H7V14M7,6H17V8H7V6Z" />
              </svg>
              <span>Create your own Google Form</span>
            </button>
          </div>
          
          {/* Detailed Legal Footer */}
          <div className="py-4 text-center w-full">
            <p className="text-xs text-gray-500 leading-loose">
              This content is neither created nor endorsed by Google. 
              <br />
              <span className="hover:underline cursor-pointer">Report Abuse</span> - 
              <span className="ml-1 hover:underline cursor-pointer">Terms of Service</span> - 
              <span className="ml-1 hover:underline cursor-pointer">Privacy Policy</span>
            </p>
            <div className="flex items-center justify-center space-x-1 mt-4 opacity-60">
              <span className="text-lg text-gray-500 font-bold tracking-tight">Google</span>
              <span className="text-lg text-gray-500 font-normal">Forms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
