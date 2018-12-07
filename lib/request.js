import axios from "axios";
import {env} from "../.env";
import { AsyncStorage } from 'react-native';

export default async function requestBuilder (){
  const jwt_token = await AsyncStorage.getItem('@gitlink:token');
  const request = axios.create({
    baseURL: env.BACKEND_URL,
    headers: {'Authorization': "bearer " + jwt_token}
  });
  return request
};

/**

 To make a query :

 ```
 import requestBuilder from 'request';
 let req = requestBuilder();

 async function getData(){
  let response = await req.get('/users/current');
  return response.data
 }
 ```

 **/