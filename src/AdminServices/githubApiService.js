import axios from 'axios';
import { getItem } from '../utility/localStorageControl';
import {API_ENDPOINT} from './baseUrl';


const authHeader = () => ({
  'Authorization': process.env.GITHUB_TOKEN,
  'Content-Type': 'application/json',
});

const client = axios.create({
  baseURL: "https://api.github.com",
  withCredentials: false,
});

class GithubApiService {
  static searchUsers(query = {username:'_',per_page:10,page:1}) {
    return client({
      method: 'GET',
      url: '/search/users?q='+query.username+'&per_page='+query.per_page+'&page='+query.page,
      headers: { ...authHeader() },
    });
  }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
client.interceptors.request.use(config => {
  // do something before executing the request
  // For example tag along the bearer access token to request header or set a cookie
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = { ...headers };

  return requestConfig;
});

client.interceptors.response.use(
  response => response,
  error => {
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */
    const { response } = error;
    const originalRequest = error.config;
    if (response) {
      if (response.status === 500) {
        // do something here
      } else {
        return originalRequest;
      }
    }
    return Promise.reject(error);
  },
);
export { GithubApiService };