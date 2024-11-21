
import { useNavigate } from "react-router-dom";

const CoDskLanding = () => {
   const navigate = useNavigate() 
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-purple-600/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto mt-12">
          {/* Logo */}
          <div className="relative mb-8 group">
            <h1 className="relative text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400 tracking-tight">
              CODESK
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your workspace with seamless online collaboration,
            <span className="text-purple-400 font-semibold"> anytime, anywhere.</span>
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 w-full">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800/70 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-purple-400 text-2xl mb-4">🌐</div>
              <h3 className="text-white font-semibold text-lg mb-2">Global Access</h3>
              <p className="text-gray-400">Connect and collaborate from anywhere in the world</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800/70 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-purple-400 text-2xl mb-4">⚡</div>
              <h3 className="text-white font-semibold text-lg mb-2">Real-time Sync</h3>
              <p className="text-gray-400">Instant updates and seamless collaboration</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800/70 transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-purple-400 text-2xl mb-4">🔒</div>
              <h3 className="text-white font-semibold text-lg mb-2">Secure Platform</h3>
              <p className="text-gray-400">Enterprise-grade security for your data</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transform transition-all duration-200 hover:scale-105 hover:shadow-lg" onClick={()=> navigate("create-space")}>
              Create Workspace
              <span className="ml-2">→</span>
            </button>
            <button className="px-8 py-4 bg-transparent border border-purple-500 text-white rounded-xl font-semibold hover:bg-purple-500/10 transition-all duration-200">
              Workspaces
            </button>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default CoDskLanding;