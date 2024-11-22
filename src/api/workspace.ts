import errorHandle from "./error";
import Api from "../services/axios";
import workspaceRoutes from "../services/endpoints/workspaceRoutes";

export const createWorkspace = async(name:string,desc:string,thumbnail:string,userid:string)=>{
    try {
        let response = await Api.post(workspaceRoutes.createSpace,{
            name,desc,thumbnail,userid
        });
        return response;
      } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
      }
}

export const workspaces = async(userid:string)=>{
  try {
      let response = await Api.get(workspaceRoutes.allWorkspaces,{
        params: { userid:userid }
      });
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

export const fetchWorkspace = async(id:string)=>{
  try {
      let response = await Api.get(workspaceRoutes.fetchWorkspace,{
        params: { id }
      });
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}