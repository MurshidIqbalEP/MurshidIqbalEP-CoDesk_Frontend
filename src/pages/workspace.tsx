import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { fetchWorkspace, invite } from "../api/workspace";
import { toast } from "sonner";

interface IUser {
  _id: string;
  name: string;
  email: string;
}

interface IWorkspace {
  _id: string;
  name: string;
  description: string;
  mapId: string;
  members: IUser[];
  admins: IUser[];
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

function Workspace() {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState<IWorkspace>();
  const [invitedEmail, setInvitedEmail] = useState("");
  const [invitedEmailErr, setInvitedEmailErr] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const res = await fetchWorkspace(id as string);
        setWorkspace(res?.data.workspace);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };

    fetchWorkspaces();
  }, [id]);

  const handleInvite = async () => {
    if (!invitedEmail) {
      setInvitedEmailErr("Email is needed");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(invitedEmail)) {
      setInvitedEmailErr("Please enter a valid email address.");
      return;
    }

    let res = await invite(workspace?._id as string, invitedEmail);
    toast.success(res?.data.message);
    setInvitedEmail("");
    setIsModalOpen(false);
  };

  const handleGoToWorld = async ()=>{
    navigate("/map")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900 relative overflow-hidden text-white">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-purple-600/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="container mx-auto px-6 py-10">
          {workspace ? (
            <div className="rounded-2xl bg-gray-900 shadow-2xl overflow-hidden">
              {/* Workspace Header */}
              <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-6 flex items-center justify-between gap-6">
                {/* Workspace Thumbnail and Info */}
                <div className="flex items-center gap-6">
                  <img
                    src={workspace.thumbnail}
                    alt={workspace.name}
                    className="w-28 h-28 rounded-full border-4 border-white"
                  />
                  <div>
                    <h1 className="text-3xl font-bold text-white">
                      {workspace.name}
                    </h1>
                    <p className="text-gray-300 mt-2">
                      {workspace.description}
                    </p>
                  </div>
                </div>

                {/* Invite Member Button */}
                <div className="ml-2 flex space-x-4">
                  <button
                    onClick={() => handleInvite()}
                    className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    Invite Member
                  </button>

                  <button
                    onClick={() => handleGoToWorld()}
                    className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    Go to World
                  </button>
                </div>

              </div>

              {/* Workspace Details */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-lg font-semibold text-purple-400">
                    Admins
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {workspace.admins.map((admin, index) => (
                      <li
                        key={index}
                        className="bg-purple-700/40 py-2 px-4 rounded-lg shadow-md"
                      >
                        {admin.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-indigo-400">
                    Members
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {workspace.members.map((member, index) => (
                      <li
                        key={index}
                        className="bg-indigo-700/40 py-2 px-4 rounded-lg shadow-md"
                      >
                        {member.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              Loading workspace details...
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900 text-black rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-white mb-0">
              Invite Member
            </h2>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full px-4 py-2 mb-4 border rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              onChange={(e) => setInvitedEmail(e.target.value)}
            />
            {invitedEmailErr && (
              <p className="text-sm text-red-600">{invitedEmailErr}</p>
            )}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false), setInvitedEmailErr("");
                }}
                className="px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                onClick={handleInvite}
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workspace;
