import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-[var(--primary-bg)]">
      <div className="relative w-full max-w-6xl min-h-[600px] md:min-h-[800px] fade-in">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row min-h-[600px] md:min-h-[800px]">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-4 sm:p-6 md:p-8 flex items-center justify-center md:border-r border-[var(--border-primary)]">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-6 sm:mb-8">
                  <MessageCircleIcon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-[var(--accent-primary)] mb-4" />
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--primary-text)] mb-2">Create Account</h2>
                  <p className="text-sm sm:text-base text-[var(--secondary-text)]">Sign up for a new account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* FULL NAME */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="johndoe@gmail.com"
                        className="w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter your password"
                        className="w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button className="auth-btn text-sm sm:text-base" type="submit" disabled={isSigningUp}>
                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="mt-4 sm:mt-6 text-center">
                  <Link to="/login" className="auth-link text-sm sm:text-base">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-[var(--tertiary-bg)]/20 to-transparent">
              <div>
                <img
                  src="/signup.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain max-h-96"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-lg sm:text-xl font-medium text-[var(--accent-primary)]">Start Your Journey Today</h3>

                  <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-4">
                    <span className="auth-badge text-xs sm:text-sm">Free</span>
                    <span className="auth-badge text-xs sm:text-sm">Easy Setup</span>
                    <span className="auth-badge text-xs sm:text-sm">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
export default SignUpPage;
