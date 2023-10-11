import { type } from "@testing-library/user-event/dist/type";
import { UrlConfig} from "../../config";



export async function fetchPosts(userId, search, categoryFilter, statusFilter) {
    let url = new URL(UrlConfig.serverUrl + "/Post");
    if (search != "") {
      url.searchParams.append("query", search);
    }
    if(categoryFilter != "all") {
        url.searchParams.append("queryCategory", categoryFilter)
    }
    if(statusFilter != "all") {
        url.searchParams.append("queryStatus", statusFilter)
    }
  
    return await fetch(url, {
      headers: {
        userId: userId,
      },
    }).then((res) => {
      return res.json();
    })
    
  }