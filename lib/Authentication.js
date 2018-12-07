import Timeout from 'await-timeout';
import { AuthSession , WebBrowser} from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

import {env} from "../.env";

class Authentication {

  /**
   * Logs in the current user using github and returns the github id of the user
   * @return {Promise<string>}
   */
  async login(){

    try{
      // 1. get the redirect url fir the user
      const redirectUrl = AuthSession.getRedirectUrl();

      // 2. login from the web browser
      let {code, state} = await this.loginFromWebBrowser(redirectUrl);

      // 3. request the api token from github usind the previously received code
      let access_token = await this.requestGithubToken({code, state, redirectUrl});

      // 4. get the jwt token from backend
      let {id, jwt_token} = await this.getJwtToken(access_token);
      console.log(`user ${id} - ${jwt_token}`);

      // 5. save the token and id locally
      this.storeCredentials({id, jwt_token});

      return id

    } catch(err){
      console.log(err);
      throw err
    }
  }

  /**
   * Log out from the app
   * @return {Promise<void>}
   */
  async logout(){

    // 1. logout from the web browser
    let logoutUrl = `https://github.com/logout`;
    // let result = await AuthSession.startAsync({authUrl: logoutUrl});

    await Promise.race([
      WebBrowser.openAuthSessionAsync(logoutUrl),
      Timeout.set(7000)
    ]);
    WebBrowser.dismissBrowser();

    // 2. remove the keys
    AsyncStorage.multiRemove(['@gitlink:id', '@gitlink:jwt_token'])

    return true
  }

  /**
   * Requests the OAUTH token from github
   * @param code code received from github
   * @param state state received from github
   * @param redirectUrl url to which github will answer
   * @return {Promise<string>} api token from gitub
   */
  async requestGithubToken({code, state, redirectUrl}){

    try{
      let response = await axios.post('https://github.com/login/oauth/access_token',
        {
          code,
          state,
          client_id: env.CLIENT_ID,
          client_secret: env.CLIENT_SECRET,
          redirect_uri: redirectUrl
        },
        {
          headers: {Accept: 'application/json'}
        }
      );

      if(!('access_token' in response.data)){
        throw new Error("did not receive access_token from github");
      }

      return response.data.access_token;

    } catch(err){
      throw err;
    }
  }

  /**
   * Redirects to a web browser, opens the github webpage , logs in and redirect back to the app
   * @return {Promise<{code, state}>}
   */
  async loginFromWebBrowser(redirectUrl){

    try{

      let authUrl = `https://github.com/login/oauth/authorize`+
        `?response_type=token` +
        `&client_id=${env.CLIENT_ID}` +
        `&redirect_uri=${redirectUrl}` +
        `&scope=user` +
        `&state=secretsecret`;

      let result = await AuthSession.startAsync({authUrl});
      // let result = await WebBrowser.openAuthSessionAsync(authUrl);

      if (result.type !== 'success') {
        throw new Error(`Auth session did not succeed - result.type = ${result.type}`);
      }
      const {code, state} = result.params;
      return {code, state}

    } catch(err){
      console.log(err);
      throw new Error("Failed login : " + err.message);
    }
  }

  /**
   * Sends to the backend an access_token to register the user and get back the jwt_token
   * @param access_token : access_token to Github (OAUTH token)
   * @return {Promise<{id: string, jwt_token: string}>} : github id of the connected user, and his jwt token
   */
  async getJwtToken(access_token){
    try{
      let response = await axios.post(env.BACKEND_URL + '/api/auth/login', {access_token});
      let {id, jwt_token} = response.data;
      return {id, jwt_token}
    } catch (err) {
      throw err
    }

  }

  /**
   * Stores locally the credentials
   * @param id githubid of the user
   * @param token token
   * @return {Promise<void>}
   */
  async storeCredentials({id, jwt_token}){
  try{
    await AsyncStorage.multiSet([
      ['@gitlink:id', id],
      ['@gitlink:token', jwt_token],
    ]);
    } catch (err) {throw err}
  }

  /**
   * Checks if user is logged in or not - If user logged in we should find an id key on the storage
   * @return {Promise<Boolean>}
   */
  async isLoggedIn(){
    let id = await AsyncStorage.getItem('@gitlink:id');
    return !!id
  }
}



export const authService = new Authentication();
