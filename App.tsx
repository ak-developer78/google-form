
import React, { useState, useEffect } from 'react';
import { FormStatus, FormData } from './types';
import FormCard from './components/FormCard';
import InputField from './components/InputField';
import RadioGroup from './components/RadioGroup';
import SuccessScreen from './components/SuccessScreen';

// PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw4g9Xcfs6GTBo5UNA9-pwD2Bium5nIJd8akHuDQryDVfhmGN-pu62EKAwxi1VBOxb83A/exec";

const App: React.FC = () => {
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    experience: '',
    role: '',
    location: '',
    currentCTC: '',
    expectedCTC: '',
    noticePeriod: '',
    cv: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  useEffect(() => {
    const hasSubmitted = localStorage.getItem('jobFormSubmitted');
    if (hasSubmitted === 'true') {
      setStatus(FormStatus.SUBMITTED);
    }
  }, []);

  const handleChange = (field: keyof FormData, value: string | File | null) => {
    if (field === 'phone' && typeof value === 'string') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [field]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.name.trim()) newErrors.name = 'This is a required question';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'This is a required question';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid Email ID';
    }

    if (!formData.phone) {
      newErrors.phone = 'This is a required question';
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit contact number';
    }

    if (!formData.experience) newErrors.experience = 'This is a required question';
    if (!formData.role.trim()) newErrors.role = 'This is a required question';
    if (!formData.location.trim()) newErrors.location = 'This is a required question';
    if (!formData.currentCTC.trim()) newErrors.currentCTC = 'This is a required question';
    if (!formData.expectedCTC.trim()) newErrors.expectedCTC = 'This is a required question';
    if (!formData.noticePeriod.trim()) newErrors.noticePeriod = 'This is a required question';
    if (!formData.cv) newErrors.cv = 'Please upload your CV';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setStatus(FormStatus.SUBMITTING);
    
    try {
      let cvBase64 = "";
      let cvName = "";
      if (formData.cv) {
        cvBase64 = await fileToBase64(formData.cv);
        cvName = formData.cv.name;
      }

      const payload = {
        ...formData,
        cv: cvBase64,
        cvName: cvName,
        submittedAt: new Date().toLocaleString()
      };

      // If SCRIPT_URL is placeholder, simulate success for preview
      if (SCRIPT_URL === "https://script.google.com/macros/s/AKfycbw4g9Xcfs6GTBo5UNA9-pwD2Bium5nIJd8akHuDQryDVfhmGN-pu62EKAwxi1VBOxb83A/exec") {
        console.warn("No SCRIPT_URL provided. Simulating submission...");
        await new Promise(r => setTimeout(r, 1500));
      } else {
        await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      localStorage.setItem('jobFormSubmitted', 'true');
      setStatus(FormStatus.SUBMITTED);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Something went wrong. Please try again.");
      setStatus(FormStatus.IDLE);
    }
  };

  if (status === FormStatus.SUBMITTED) {
    return <SuccessScreen />;
  }

  return (
    <div className="min-h-screen py-8 px-4 flex justify-center">
      <div className="w-full max-w-2xl space-y-3">
        <div className="rounded-lg overflow-hidden border border-gray-300 bg-white shadow-sm">
          <div className="h-2.5 bg-[#673ab7]"></div>
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-normal text-black mb-2 break-words">Job Application Form</h1>
            <p className="text-sm text-gray-800 font-medium">Comhard Technologies PVT LTD</p>
            <hr className="my-4 border-gray-200" />
            <p className="text-sm text-red-600 mb-1">* Indicates required question</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 pb-12">
          <FormCard title="Name" required error={errors.name}>
            <InputField
              value={formData.name}
              onChange={(v) => handleChange('name', v)}
              placeholder="Your answer"
            />
          </FormCard>

          <FormCard title="Email ID" required error={errors.email}>
            <InputField
              value={formData.email}
              onChange={(v) => handleChange('email', v)}
              placeholder="Your answer"
              type="email"
            />
          </FormCard>

          <FormCard 
            title="Contact Number" 
            description="Please provide your 10-digit mobile number"
            required 
            error={errors.phone}
          >
            <InputField
              value={formData.phone}
              onChange={(v) => handleChange('phone', v)}
              placeholder="Your answer"
              type="tel"
            />
          </FormCard>

          <FormCard title="Total Experience" required error={errors.experience}>
            <RadioGroup
              options={['Fresher', '1-2 Years', '3-5 Years', '5+ Years']}
              value={formData.experience}
              onChange={(v) => handleChange('experience', v)}
            />
          </FormCard>

          <FormCard title="Which role are you applying for?" required error={errors.role}>
            <InputField
              value={formData.role}
              onChange={(v) => handleChange('role', v)}
              placeholder="Your answer"
            />
          </FormCard>

          <FormCard title="Current Location" required error={errors.location}>
            <InputField
              value={formData.location}
              onChange={(v) => handleChange('location', v)}
              placeholder="Your answer"
            />
          </FormCard>

          <FormCard title="Current CTC" required error={errors.currentCTC}>
            <InputField
              value={formData.currentCTC}
              onChange={(v) => handleChange('currentCTC', v)}
              placeholder="Your answer"
            />
          </FormCard>

          <FormCard title="Expected CTC" required error={errors.expectedCTC}>
            <InputField
              value={formData.expectedCTC}
              onChange={(v) => handleChange('expectedCTC', v)}
              placeholder="Your answer"
            />
          </FormCard>

          <FormCard title="Notice Period" required error={errors.noticePeriod}>
            <InputField
              value={formData.noticePeriod}
              onChange={(v) => handleChange('noticePeriod', v)}
              placeholder="Your answer"
            />
          </FormCard>

          <FormCard title="Upload CV" required error={errors.cv}>
            <div className="mt-4">
              <label className="flex flex-col items-start cursor-pointer">
                <span className="text-xs text-gray-500 mb-2">Upload 1 supported file. Max 10MB recommended.</span>
                <div className="flex items-center space-x-2 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                  <span className="text-blue-600 font-medium text-sm">Add file</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleChange('cv', e.target.files?.[0] || null)}
                  />
                </div>
              </label>
              {formData.cv && (
                <div className="mt-3 text-sm text-gray-700 flex items-center bg-gray-50 p-3 rounded border border-gray-200 w-full md:w-auto">
                  <svg className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span className="truncate">{formData.cv.name}</span>
                </div>
              )}
            </div>
          </FormCard>

          <div className="flex items-center justify-between mt-8">
            <button
              type="submit"
              disabled={status === FormStatus.SUBMITTING}
              className={`bg-[#673ab7] hover:bg-[#5e35a6] text-white px-6 py-2 rounded font-medium shadow-md transition-all active:transform active:scale-95 ${status === FormStatus.SUBMITTING ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {status === FormStatus.SUBMITTING ? 'Sending to Sheet...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => {
                if(window.confirm('Clear all form data?')) {
                  window.location.reload();
                }
              }}
              className="text-[#673ab7] font-medium text-sm hover:bg-purple-50 px-3 py-1.5 rounded transition-colors"
            >
              Clear form
            </button>
          </div>
        </form>

        <div className="py-6 text-center">
          <p className="text-xs text-gray-500">This content is neither created nor endorsed by Google.</p>
          <div className="flex items-center justify-center space-x-1 mt-1 opacity-60">
            <span className="text-xs text-gray-500 font-semibold tracking-tight">Google</span>
            <span className="text-xs text-gray-500 font-normal">Forms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
