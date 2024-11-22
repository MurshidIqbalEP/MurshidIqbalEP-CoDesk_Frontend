import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchWorkspace } from "../api/workspace";

interface IUser{
    _id: string;
    name:string;
    email:string;
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

function workspace() {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState<IWorkspace>();

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
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-6 flex items-center gap-6">
              <img
                src={workspace.thumbnail}
                alt={workspace.name}
                className="w-28 h-28 rounded-full border-4 border-white"
              />
              <div>
                <h1 className="text-3xl font-bold">{workspace.name}</h1>
                <p className="text-gray-300 mt-2">{workspace.description}</p>
              </div>
            </div>

            {/* Workspace Details */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-semibold text-purple-400">Admins</h2>
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
                <h2 className="text-lg font-semibold text-indigo-400">Members</h2>
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

            {/* Invite Member Section */}
            <div className="bg-gray-800 p-6 rounded-b-2xl">
              <h3 className="text-xl font-semibold text-center mb-6">
                Invite a New Member
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <input
                  type="email"
                  placeholder="Enter email address"
                //   value={inviteEmail}
                //   onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-600"
                />
                <button
                //   onClick={handleInvite}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
                >
                  Send Invite
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400">Loading workspace details...</div>
        )}
      </div>
      </div>
    </div>
  );
}

export default workspace;
