import { useEffect, useState } from "react";
import { workspaces } from "../api/workspace";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IWorkspace {
  _id: string;
  name: string;
  description: string;
  mapId: string;
  members: string[];
  admins: string[];
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export default function AllSpaces() {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.user);
  const [spaces, setSpaces] = useState<IWorkspace[]>([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const res = await workspaces(user?.id);
        setSpaces(res?.data.workspaces);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };

    fetchWorkspaces();
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900 relative overflow-hidden text-white">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-purple-600/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <h1 className="text-4xl font-bold text-white mb-6">
          Projects Participated
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((project) => (
            <div
              key={project._id}
              className="bg-gray-200 shadow-md rounded-lg overflow-hidden   cursor-pointer hover:drop-shadow-xl transition-transform  hover:scale-105 hover:shadow-white"
              onClick={() => navigate(`/workspace/${project._id}`)}
            >
              <img
                src={project.thumbnail}
                alt={project.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {project.name}
                </h2>
                <p className="text-gray-600 mt-2">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
