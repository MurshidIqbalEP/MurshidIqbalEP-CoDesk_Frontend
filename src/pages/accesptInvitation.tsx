import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import Modal from "../components/modal";
import { acceptInvite } from "../api/workspace";
import { toast } from "sonner";

function accesptInvitation() {
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(!isLoggedIn);
  const closeModal = () => setShowModal(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setToken(token);
    }
  }, [searchParams]);

  const handleAccept = async () => {
    let res = await acceptInvite(token!);
    if (res?.data.message) {
      toast.success(res?.data.message);
      navigate(`/workspace/${res?.data.workspaceId}`);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900 relative overflow-hidden text-white">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-purple-600/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900 flex items-center justify-center text-white">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-purple-600/30 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl"></div>
        </div>

        {/* Invite Card */}
        <div className="relative bg-gray-800 rounded-lg p-6 shadow-lg w-[90%] max-w-md z-10">
          <h2 className="text-2xl font-semibold text-center mb-4">
            You're Invited!
          </h2>
          <p className="text-center text-gray-300 mb-6">
            Hi there! Your invite is ready. Accept it and let's make something
            awesome together.
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-purple-900 hover:bg-purple-500 transition px-4 py-2 rounded font-medium"
              onClick={handleAccept}
            >
              Accept
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && <Modal showModal={!isLoggedIn} onClose={closeModal} />}
    </div>
  );
}

export default accesptInvitation;
